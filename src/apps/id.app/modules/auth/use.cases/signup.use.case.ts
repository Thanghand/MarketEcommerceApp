import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CompanyType, CompanyEntity, SignupDto, UserResponse, UpdatingUserParam, UpdatingUsersInRestaurantParam, UpdatingUsersInCompanyParam, RestaurantEntity } from '@models';
import { MessageConstant } from '@shared.all/constants';
import { UseCase } from '@shared.core';
import { MapperUser } from '../../../libs/shared/utils';
import { MyLoggerService } from '@libs/logger/services/my.logger.service';
import { ClientSuppliersRepository, IClientSuppliersRepository, ClientRestaurantsRepository, IClientRestaurantsRepository, ClientCompanyRepository, IClientCompanyRepository } from '@libs/repositories';
import { UserRepository } from '../../users/repositories';
import { AuthDomain } from '../models';

@Injectable()
export class SignUpUseCase extends UseCase<SignupDto, UserResponse> {
    private readonly tag = 'SignUpUseCase';
    constructor(@Inject(UserRepository) private readonly useRepository: UserRepository,
        @Inject(ClientCompanyRepository) private readonly companyRepository: IClientCompanyRepository,
        @Inject(ClientRestaurantsRepository) private readonly restaurantRepository: IClientRestaurantsRepository,
        @Inject(ClientSuppliersRepository) private readonly supplierRepository: IClientSuppliersRepository,
        private readonly loggerService: MyLoggerService) {
        super();
    }

    async buildUseCase(input?: SignupDto): Promise<UserResponse> {
        if (this.isNotValidMainFields(input)) {
            this.loggerService.error(MessageConstant.MISSING_FIELDS, this.tag);
            throw new HttpException(MessageConstant.MISSING_FIELDS, HttpStatus.BAD_REQUEST);
        }

        const existedUser = await this.useRepository.findByEmail(input.email);
        if (existedUser)
            throw new HttpException(`Email: ${existedUser.email} has already existed`, HttpStatus.FORBIDDEN);

        if (!this.isValidCompany(input)) {
            this.loggerService.error(MessageConstant.WRONG_RESOURCES, this.tag);
            throw new HttpException(MessageConstant.WRONG_RESOURCES, HttpStatus.UNAUTHORIZED);
        }

        const authDomain = new AuthDomain();
        authDomain.createUserBySignUpDto(input);
        const result = await this.useRepository.create(authDomain.getEntity());

        // Update users in company
        const param: UpdatingUsersInCompanyParam = {
            _id: result.companyId,
            users: [
                {
                    _id: result._id,
                    email: result.email
                }
            ]
        };
        switch (result.companyType) {
            case CompanyType.Restaurants:
                this.restaurantRepository.updateUsers(param);
                break;
            case CompanyType.Suppliers:
                this.supplierRepository.updateUsers(param);
                break;
        }

        return MapperUser.mappingUserEntityToUserResponse(result);
    }

    private isNotValidMainFields(input: SignupDto): boolean {
        return !input.email || !input.password || !input.firstName || !input.lastName || !input.location;
    }

    private async isValidCompany(input: SignupDto) {
        let companyEntity: CompanyEntity;
        switch (input.companyType) {
            case CompanyType.Admin: {
                companyEntity = await this.companyRepository.getById(input.companyId);
                break;
            }
            case CompanyType.Restaurants: {
                companyEntity = await this.restaurantRepository.getById(input.companyId, true) as RestaurantEntity;
                break;
            }
            case CompanyType.Suppliers: {
                companyEntity = await this.supplierRepository.getById(input.companyId);
                break;
            }
        }
        return companyEntity !== undefined || companyEntity !== null;
    }
}
