
import { Inject, HttpException, HttpStatus } from '@nestjs/common';
import { UserEntity, CompanyType, CompanyEntity, CreatingUsersDto, CreatingUserDto, UserResponse, CreatingUserParam, UserBasicInformationEntity, UpdatingUsersInCompanyParam, RestaurantEntity } from '@models';
import { MessageConstant } from '@shared.all/constants';
import { UseCase } from '@shared.core';
import { MapperUser } from '../../../libs/shared/utils';
import { MyLoggerService } from '@libs/logger/services/my.logger.service';
import { ClientCompanyRepository, IClientCompanyRepository, ClientRestaurantsRepository, IClientRestaurantsRepository, ClientSuppliersRepository, IClientSuppliersRepository } from '@libs/repositories';
import { UserRepository } from '../../users/repositories';
import { AuthDomain } from '../models';


export class CreateUsersUseCase extends UseCase<CreatingUserParam, UserResponse[]> {
    private readonly tag = 'CreateUsersUseCase';

    constructor(@Inject(UserRepository) private readonly useRepository: UserRepository,
                @Inject(ClientCompanyRepository) private readonly companyRepo: IClientCompanyRepository,
                @Inject(ClientRestaurantsRepository) private readonly restaurantRepo: IClientRestaurantsRepository,
                @Inject(ClientSuppliersRepository) private readonly supplierRepo: IClientSuppliersRepository,  
                private readonly loggerService: MyLoggerService) {
        super();
    }

    async buildUseCase(input?: CreatingUserParam): Promise<UserResponse[]> {
        const {companyType, dto} = input;
        console.log('Input: ', input);

        if (!companyType || !dto || this.isNotValidMainFields(dto)) {
            this.loggerService.error(MessageConstant.MISSING_FIELDS, this.tag);
            throw new HttpException(MessageConstant.MISSING_FIELDS, HttpStatus.BAD_REQUEST);
        }

        const users = dto.users;
        users.forEach(u => {
            if (this.isUserMissingFields(u)) {
                this.loggerService.error(MessageConstant.MISSING_FIELDS, this.tag);
                throw new HttpException(MessageConstant.MISSING_FIELDS, HttpStatus.BAD_REQUEST);
            }
        });   
        
        // const isEnvAdmin = CompanyType.Admin === Configuration.getConfig().companyType;
        // const isValidEnv = companyType !== Configuration.getConfig().companyType;
        // if (!isEnvAdmin && isValidEnv) {
        //     this.loggerService.error(MessageConstant.WRONG_RESOURCES, this.tag);
        //     throw new HttpException(MessageConstant.WRONG_RESOURCES, HttpStatus.INTERNAL_SERVER_ERROR);
        // }

        const company = await this.getValidCompany(dto.companyId, dto.companyTypeTarget);
        if (company === null) {
            this.loggerService.error(MessageConstant.WRONG_RESOURCES, this.tag);
            throw new HttpException(MessageConstant.WRONG_RESOURCES, HttpStatus.INTERNAL_SERVER_ERROR);
        }

      
        let usersEntites: UserEntity[] = dto.users.map(i => {
            const authDomain = new AuthDomain();
            authDomain.createUser(i, company._id, company.companyType);
            return authDomain.getEntity();
        });
        
        usersEntites = await this.useRepository.saveAll(usersEntites);
        
        const results = usersEntites.map((item) => {
            return MapperUser.mappingUserEntityToUserResponse(item);
        });

        const param: UpdatingUsersInCompanyParam = {
            _id: company._id,
            users: results.map(u => {
                const usersBasic: UserBasicInformationEntity = {
                    _id: u._id,
                    email: u.email
                };
                return usersBasic;
            })
        };
        switch (companyType) {
            case CompanyType.Restaurants:
                this.restaurantRepo.updateUsers(param);
                break;
            case CompanyType.Suppliers:
                this.supplierRepo.updateUsers(param);
                break;
        }

        return results;
    }
    
    async getValidCompany(id: string, companyType: CompanyType): Promise<CompanyEntity> {
        let company: CompanyEntity; 
        switch(companyType) {
            case CompanyType.Suppliers: {
                company = await this.supplierRepo.getById(id);
                break;
            }
            case CompanyType.Restaurants: {
                company = await this.restaurantRepo.getById(id, true) as RestaurantEntity;
                break;
            }
            default: {
                company = await this.companyRepo.getById(id);
                break;
            }
        }
        if (!company || company === null) return null;
        return company;
    }

    private isNotValidMainFields(input: CreatingUsersDto): boolean {
        return !input || !input.companyId || !input.companyTypeTarget;
    }

    private isUserMissingFields(input: CreatingUserDto): boolean {
        return !input 
                || !input.email 
                || !input.password 
                || !input.location 
                || !input.phoneNumber
                || !input.firstName
                || !input.lastName;
    }
}