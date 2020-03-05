import { UseCase } from '@shared.core';
import { InvoiceDomain } from '../../models';
import { Inject, HttpException, HttpStatus } from '@nestjs/common';

import { OrderStatus, CreatingInvoiceDto, InvoiceDetailResponse, OrderInvoiceDto, CreatingInvoiceParam, RestaurantEntity } from '@models';
import { MessageConstant } from '@shared.all/constants';

import {
    IInvoiceRepository,
    InvoiceRepository,
} from '../../repositories';

import { OrderDomain } from '../../../orders/models';
import { MapperInvoiceUtil } from '../../utils';
import { IClientRestaurantsRepository, IClientSuppliersRepository, ClientRestaurantsRepository, ClientSuppliersRepository, ClientEmailRepository, IClientEmailRepository } from '@libs/repositories';
import { MyLoggerService } from '@libs/logger/services/my.logger.service';
import { OrderRepository, IOrderRepository } from '../../../orders/repositories';
import { NatsClientService } from '@libs/nats/nats-client.service';
import { MessageEventName } from '@shared.all/constants/messages-event-name';

export class CreateInvoiceUseCase extends UseCase<CreatingInvoiceParam, InvoiceDetailResponse> {

    private readonly tag = 'CreateInvoiceUseCase';

    constructor(@Inject(InvoiceRepository) private readonly invoiceRepository: IInvoiceRepository,
        @Inject(ClientRestaurantsRepository) private readonly restaurantRepository: IClientRestaurantsRepository,
        @Inject(ClientSuppliersRepository) private readonly supplierRepository: IClientSuppliersRepository,
        @Inject(ClientEmailRepository) private readonly clientEmailRepo: IClientEmailRepository,
        private readonly loggerService: MyLoggerService,
        private readonly natsClientService: NatsClientService) {
        super();
    }

    async buildUseCase(input?: CreatingInvoiceParam, isGetEntity?: boolean): Promise<InvoiceDetailResponse> {

        const { companyId, dto } = input;
        if (this.isMissingFields(dto)) {
            this.loggerService.error(MessageConstant.MISSING_FIELDS, this.tag);
            throw new HttpException(MessageConstant.MISSING_FIELDS, HttpStatus.BAD_REQUEST);
        }

        const orders = dto.orders;
        if (this.isOrdersHasNotDelievered(orders)) {
            this.loggerService.error('Orders must be delivered', this.tag);
            throw new HttpException('Orders must be delivered', HttpStatus.BAD_REQUEST);
        }

        const domain = new InvoiceDomain();

        // Just only Supplier can create invoice
        const supplier = await this.supplierRepository.getById(companyId);
        const restaurant = await this.restaurantRepository.getById(dto.restaurantId) as RestaurantEntity;

        if (!supplier || !supplier._id) {
            this.loggerService.error('Supplier is not existed', this.tag);
            throw new HttpException(MessageConstant.MISSING_FIELDS, HttpStatus.BAD_REQUEST);
        }

        if (!restaurant || !restaurant._id) {
            this.loggerService.error('Restaurant is not existed', this.tag);
            throw new HttpException(MessageConstant.MISSING_FIELDS, HttpStatus.BAD_REQUEST);
        }

        domain.generate(dto, restaurant, supplier);
        const result = await this.invoiceRepository.create(domain.getEntity());

        // emit event created new invoice
        this.natsClientService.emitMessage(MessageEventName.INVOICES_CREATED, domain.getEntity());
        return MapperInvoiceUtil.mapEntityToResponse(result);
    }

    private isMissingFields(input: CreatingInvoiceDto): boolean {
        return !input.restaurantId
            || !input.endDate
            || !input.startDate
            || !input.orders;
    }

    private isOrdersHasNotDelievered(orders: OrderInvoiceDto[]): boolean {
        for (const order of orders) {
            if (order.status !== OrderStatus.Delivered)
                return true;
        }
        return false;
    }
}