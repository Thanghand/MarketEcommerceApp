import { Injectable, Inject, HttpException, HttpStatus, OnApplicationBootstrap } from '@nestjs/common';
import { CreatePreparingDataUseCase } from './create.preparing.data.use.case';
import { CreatingCompanyDto, CompanyEntity, SignupDto, CompanyType, UserResponse, Role } from '@models';
import { UseCase } from '@shared.core';
import { CompanyRepository, ICompanyRepository } from '../../../libs/repositories';
import { NatsClientService } from '@libs/nats/nats-client.service';
import { MessageEventName } from '@shared.all/constants/messages-event-name';

@Injectable()
export class CreateCompanyUseCase extends UseCase<[CreatingCompanyDto, any], void> implements OnApplicationBootstrap {

    async onApplicationBootstrap() {
        try {
            const input = new CreatingCompanyDto();
            input.name = 'TechnoFood'; 
            input.description = 'This is my techno-Food company';
            input.listContacts = [
                {
                    name: 'Federico',
                    email: 'order.technofood@gmail.com',
                    phoneNumber: '0904215929',
                }
            ];
            input.location = {
                address: '123 Phan Xich Long Street',
                lat: 0,
                long: 0,
            };
            input.email = 'order.technofood@gmail.com';
            input.phoneNumber = '0904215929';
            const user = {
                firstName: 'federico',
                lastName: 'admin',
                email: 'order.technofood@gmail.com',
                password: 'P@ssw0rd',
                phoneNumber: '0904215929',
                role: Role.Director,
                descriptions: 'This a my company',
                location: {
                    address: '123 Phan Xich Long - Phu Nhuan District',
                    city: '123 Phan Xich Long Street',
                    lat: 0,
                    long: 0,
                }
            };
            await this.execute([input, user]);
        } catch(ex) {
            console.log('Cannot setup data');
        }
    }

    constructor(@Inject(CompanyRepository) private readonly companyRepository: ICompanyRepository,
                private readonly eventMessageService: NatsClientService,
                private readonly createPreparingDataUseCase: CreatePreparingDataUseCase) {
        super();
    }

    async buildUseCase(input?: [CreatingCompanyDto, any]): Promise<void> {
        
        const dto = input[0];
        const user = input[1];
        const companies = await this.companyRepository.findAllCompany();
        if (companies.length > 0)
            throw new HttpException('Cannot create new company', HttpStatus.INTERNAL_SERVER_ERROR);

        const entity: CompanyEntity = {
            name: dto.name,
            description: dto.description,
            listContacts: dto.listContacts,
            location : dto.location,
            companyType : CompanyType.Admin,
            email: dto.email,
            phoneNumber: dto.phoneNumber,
            users: [],
        };
        const companyEntity = await this.companyRepository.create(entity);
        
        // Create new admin user
        const signUpDto: SignupDto = {...user, companyId: companyEntity._id, companyType: CompanyType.Admin};
        signUpDto.companyType = CompanyType.Admin;
        await this.eventMessageService.sendMessage<UserResponse>(MessageEventName.AUTH_SIGNUP,signUpDto);
        this.createPreparingDataUseCase.buildData();
    }
}
