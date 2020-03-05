import { UseCase } from '@shared.core';
import { OrderEntity, OrderStatus, UpdatingOrderParam, OrderDetailResponse, UpdatingOrdersDto, TokenUserPayload, UpdatingMembershipDto } from '@models';
import { Inject, HttpException, HttpStatus } from '@nestjs/common';
import { MessageConstant } from '@shared.all/constants';
import { MapperOrderUtil } from '../../shared/utils';
import { IOrderRepository, OrderRepository } from '../../repositories';
import { OrderDomain } from '../../models';
import { ClientMembershipRepository, IClientMembershipRepository } from '@libs/repositories';
import * as Enumerable from 'linq';

export class UpdateOrderUseCase extends UseCase<UpdatingOrderParam, OrderDetailResponse | OrderEntity> {

    private readonly tag = 'UpdateOrderUseCase';

    constructor(@Inject(OrderRepository) private readonly ordersRepository: IOrderRepository,
        @Inject(ClientMembershipRepository) private readonly clientMembershipRepo: IClientMembershipRepository) {
        super();
    }

    async buildUseCase(input: UpdatingOrderParam, isGetEntity?: boolean): Promise<OrderDetailResponse | OrderEntity> {

        const { userToken, orderId, dto } = input;

        if (this.isMissingFields(orderId, dto)) {
            console.error(`${this.tag}: missing fields`);
            throw new HttpException(MessageConstant.MISSING_FIELDS, HttpStatus.BAD_REQUEST);
        }

        const orderEntity = await this.ordersRepository.getById(orderId);
        const currentStatus = orderEntity.currentStatus;
        const orderDomain = new OrderDomain(orderEntity);

        switch (dto.status) {
            case OrderStatus.WaitingForApprove: {
                if (currentStatus === OrderStatus.Inprogress
                    || currentStatus === OrderStatus.Delivered
                    || currentStatus === OrderStatus.Paid) {
                    console.error(`${this.tag}: Someone try to cheat status of order`);
                    throw new HttpException(MessageConstant.SOMETHING_WRONG, HttpStatus.BAD_REQUEST);
                }
                orderDomain.updateToWaitingForApprove(userToken, dto);
                break;
            }
            case OrderStatus.Inprogress: {
                // Old status is Inproress not update
                if (currentStatus === OrderStatus.Inprogress)
                    break;

                orderDomain.updateToInprogress(userToken, dto.note);
                // emit event update membership
                this.updateMembership(orderDomain.getEntity());
                break;
            }
            case OrderStatus.Delivered: {
                if (currentStatus === OrderStatus.WaitingForApprove) {
                    console.error(`${this.tag}: Someone try to cheat status of order`);
                    throw new HttpException(MessageConstant.SOMETHING_WRONG, HttpStatus.BAD_REQUEST);
                }
                orderDomain.updateToDelivered(userToken, dto.note);
                break;
            }
            case OrderStatus.Paid: {
                if (currentStatus === OrderStatus.WaitingForApprove) {
                    console.error(`${this.tag}: Someone try to cheat status of order`);
                    throw new HttpException(MessageConstant.SOMETHING_WRONG, HttpStatus.BAD_REQUEST);
                }
                orderDomain.updateToPaid(userToken, dto.note);
                break;
            }
            case OrderStatus.Cancel: {
                orderDomain.updateToCancel(userToken, dto);
                break;
            }
            default: {
                console.error(`${this.tag}: Wrong status`);
                throw new HttpException('Sorry this status is wrong', HttpStatus.BAD_REQUEST);
            }
        }
        const entity = await this.ordersRepository.update(orderId, orderDomain.getEntity());
        if (isGetEntity)
            return entity;

        return MapperOrderUtil.mapEntityToResponse(entity);
    }

    isMissingFields(id: string, input: UpdatingOrdersDto) {
        return !id || !input || !input.status;
    }

    private updateMembership(order: OrderEntity): void {
        const totalPrice = Enumerable.from(order.products).sum(p => p.quantity * p.price);
        const newDate = new Date();
        const user = Enumerable.from(order.transactions).firstOrDefault().updatedBy;
        const dto: UpdatingMembershipDto = {
            point: totalPrice,
            date: newDate.toString(),
            createdBy: {
                _id: user.userId,
                name: user.userName,
                email: user.email,
                restaurantId: order.restaurant._id,
                restaurantName: order.restaurant.name
            },
            order: {
                _id: order._id,
                orderNumber: order.orderNumber,
                totalPrice: totalPrice,
                restaurant: order.restaurant,
                supplier: order.supplier,
                updatedAt: order.updatedAt,
            }
        };
        this.clientMembershipRepo.update(dto);
    }
}