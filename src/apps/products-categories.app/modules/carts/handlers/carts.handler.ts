import { Controller } from '@nestjs/common';
import { ClearShoppingCartUseCase } from '../use.cases';
import { MessageEventName } from '@shared.all/constants/messages-event-name';
import { CreatedOrdersParam } from '@libs/models';
import { EventPattern } from '@nestjs/microservices';

@Controller('carts-handlers')
export class CartsHandler {

    constructor(private readonly clearShoppingCartUseCase: ClearShoppingCartUseCase) {
    }

    @EventPattern(MessageEventName.ORDERS_CREATED)
    subcribseOrders(param: CreatedOrdersParam) {
        console.log('Clear shopping cart');
        this.clearShoppingCartUseCase.execute(param.userToken._id);
    }
}