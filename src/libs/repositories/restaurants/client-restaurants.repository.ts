import { IClientRestaurantsRepository } from './client-restaurants-repository.interface';
import { RestaurantEntity, RestaurantDetailInforResponse, CreatingRestaurantDto, UpdatingRestaurantParam, RestaurantSummaryEntity, UpdatingUsersInRestaurantParam, UpdatingUsersInCompanyParam } from '@models';
import { NatsClientService } from '@libs/nats/nats-client.service';
import { MessageEventName } from '@shared.all/constants/messages-event-name';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientRestaurantsRepository implements IClientRestaurantsRepository {
 

    constructor(private readonly eventMessage: NatsClientService) {
    }

    async getById(id: string, isGetEntity?): Promise<RestaurantDetailInforResponse | RestaurantEntity> {

        if (isGetEntity) {
            const result = await this.eventMessage.sendMessage<RestaurantEntity>(MessageEventName.RESTAURANTS_DETAIl_ENTITY, id);
            return result;
        }

        const result = await this.eventMessage.sendMessage<RestaurantDetailInforResponse>(MessageEventName.RESTAURANTS_DETAIl_RESPONSE, id);
        return result;

    }

    async createRestaurant(dto: CreatingRestaurantDto): Promise<RestaurantEntity> {
        const result = await this.eventMessage.sendMessage<RestaurantEntity>(MessageEventName.RESTAURANTS_CREATE, dto);
        return result;
    }


    async findRestaurants(): Promise<RestaurantSummaryEntity[]> {
        const result = await this.eventMessage.sendMessage<RestaurantSummaryEntity[]>(MessageEventName.RESTAURANTS_LIST, {});
        return result;
    }

    async updateRestaurant(param: UpdatingRestaurantParam): Promise<RestaurantEntity> {
        const result = await this.eventMessage.sendMessage<RestaurantEntity>(MessageEventName.RESTAURANTS_UPDATE, param);
        return result;
    }

    async deleteRestaurant(id: string): Promise<boolean> {
        const result = await this.eventMessage.sendMessage<boolean>(MessageEventName.RESTAURANTS_UPDATE, id);
        return result;
    }

    updateUsers(params: UpdatingUsersInCompanyParam): Promise<boolean> {
        const result =  this.eventMessage.sendMessage<boolean>(MessageEventName.RESTAURANTS_UPDATE_USERS, params);
        return result;
    }

}