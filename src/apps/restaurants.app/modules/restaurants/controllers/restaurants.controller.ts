import { MessagePattern } from '@nestjs/microservices';
import { 
    GetRestaurantDetailUseCase, 
    FindRestaurantsUseCase, 
    CreateRestaurantUsecase, 
    UpdateRestaurantUseCase, 
    DeleteRestaurantUseCase, 
    UpdateUsersInRestaurantUseCase
} from '../use.cases';
import { RestaurantDetailInforResponse, RestaurantEntity, CreatingRestaurantDto, UpdatingRestaurantParam, RestaurantSummaryEntity, UpdatingUsersInRestaurantParam, UpdatingUsersInCompanyParam } from '@models';
import { MessageEventName } from '@shared.all/constants/messages-event-name';
import { Controller } from '@nestjs/common';

@Controller()
export class RestaurantsController {

    constructor(private readonly getRestaurantDetailUseCase: GetRestaurantDetailUseCase,
                private readonly findRestaurantsUseCase: FindRestaurantsUseCase,
                private readonly createRestaurantUseCase: CreateRestaurantUsecase,
                private readonly updateRestaurantUseCase: UpdateRestaurantUseCase,
                private readonly deleteRestaurantUseCase: DeleteRestaurantUseCase,
                private readonly updateUsersInRestaurantUseCase: UpdateUsersInRestaurantUseCase) {
    }

    @MessagePattern(MessageEventName.RESTAURANTS_CREATE)
    async createNewRestaurant(creatingRestaurantDto: CreatingRestaurantDto): Promise<RestaurantEntity> {
        console.log('DTO: ,', creatingRestaurantDto);
        const entity = await this.createRestaurantUseCase.execute(creatingRestaurantDto);
        return entity;
    }

    @MessagePattern(MessageEventName.RESTAURANTS_DELETE)
    async deleteRestaurant(id: string): Promise<boolean> {
        const result = await this.deleteRestaurantUseCase.execute(id);
        return result;
    }

    @MessagePattern(MessageEventName.RESTAURANTS_UPDATE)
    async updateRestaurant(input: UpdatingRestaurantParam): Promise<RestaurantEntity> {
        const entity = await this.updateRestaurantUseCase.execute(input);
        return entity;
    }

    @MessagePattern(MessageEventName.RESTAURANTS_LIST)
    async findRestaurants(): Promise<RestaurantSummaryEntity[]> {
        const entities = await this.findRestaurantsUseCase.execute();
        return entities;
    }

    @MessagePattern(MessageEventName.RESTAURANTS_DETAIl_ENTITY)
    async getRestaurantDetail(id: string): Promise<RestaurantEntity> {
      const entity = await this.getRestaurantDetailUseCase.execute(id, true) as RestaurantEntity;
      return entity;
    }

    @MessagePattern(MessageEventName.RESTAURANTS_DETAIl_RESPONSE)
    async getRestaurantDetailResponse(id: string): Promise<RestaurantDetailInforResponse> {
      const response = await this.getRestaurantDetailUseCase.execute(id, false) as RestaurantDetailInforResponse;
      return response;
    }

    @MessagePattern(MessageEventName.RESTAURANTS_UPDATE_USERS)
    async updateUsersInRestaurant(param: UpdatingUsersInCompanyParam): Promise<boolean> {
        const response = await this.updateUsersInRestaurantUseCase.execute(param);
        return response;
    }
}