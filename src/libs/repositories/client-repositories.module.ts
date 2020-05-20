import { Module } from '@nestjs/common';
import { NatsClientService } from '@libs/nats/nats-client.service';
import { 
    ClientCategoryRepository, 
    ClientRestaurantsRepository, 
    ClientSuppliersRepository, 
    ClientProductsRepository, 
    ClientUserRepository,
    ClientAuthRepository,
    ClientOrderRepository,
    ClientInvoiceRepository, 
    ClientShoppingCartRepository,
    ClientMembershipRepository,
    ClientRatingRepository} from '.';
import { ClientMembershipRuleRepository } from './membership/client-membership-rule.repository';
import { ClientEmailRepository } from './email/client-email.repository';

const providers = [
    NatsClientService,
    ClientCategoryRepository,
    ClientRestaurantsRepository,
    ClientSuppliersRepository,
    ClientProductsRepository,
    ClientUserRepository,
    ClientAuthRepository,
    ClientOrderRepository,
    ClientInvoiceRepository,
    ClientShoppingCartRepository,
    ClientMembershipRepository,
    ClientMembershipRuleRepository,
    ClientEmailRepository,
    ClientRatingRepository
];

@Module({
    providers: [
        ...providers,
    ],
    exports: [
        ...providers
    ]
})
export class ClientRepositoriesModule {

}