import { Injectable, Inject, OnApplicationBootstrap } from '@nestjs/common';
import { ClientRestaurantsRepository, IClientRestaurantsRepository, IClientUserRepository, ClientUserRepository, ClientSuppliersRepository, IClientSuppliersRepository } from '@libs/repositories';
import { UserBasicInformationEntity } from '@libs/models';


@Injectable()
export class UpdatingUsersInCompanyMigration implements OnApplicationBootstrap {

    constructor(@Inject(ClientRestaurantsRepository) private readonly restaurantRepository: IClientRestaurantsRepository,
        @Inject(ClientSuppliersRepository) private readonly supplierRepository: IClientSuppliersRepository,
        @Inject(ClientUserRepository) private readonly userRepo: IClientUserRepository) {
    }

    onApplicationBootstrap() {
        this.run();
    }

    async run() {

        // restaurants
        const restaurants = await this.restaurantRepository.findRestaurants();
        restaurants.forEach(async r => {
            const users = await this.userRepo.getUsersInCompany(r._id);
            const usersInfor = users.map(u => {
                const usersInRestaurant: UserBasicInformationEntity = {
                    _id: u._id,
                    email: u.email
                };
                return usersInRestaurant;
            });
            this.restaurantRepository.updateUsers({ _id: r._id, users: usersInfor });
        });

        // Suppliers
        const suppliers = await this.supplierRepository.findSuppliers();
        suppliers.forEach(async s => {
            const users = await this.userRepo.getUsersInCompany(s._id);
            const usersInfor = users.map(u => {
                const usersInRestaurant: UserBasicInformationEntity = {
                    _id: u._id,
                    email: u.email
                };
                return usersInRestaurant;
            });
            this.supplierRepository.updateUsers({ _id: s._id, users: usersInfor });
        });

    }
}