import { BaseDomain, OrderEntity, OrderProductSummaryEntity, OrderTransactionEntity, OrderStatus, TokenUserPayload, RestaurantEntity, PaymentType, UpdatingOrdersDto, OrderCartSupplierDto, CreatingOrdersDto, SupplierEntity } from '@models';
import * as Enumerable from 'linq';
import { HttpException, HttpStatus } from '@nestjs/common';
import { MessageConstant } from '@shared.all/constants';
import { OrderUtil } from '@shared.all/utils';

export class OrderDomain extends BaseDomain<OrderEntity> {

    createOrder(userToken: TokenUserPayload,
        restaurant: RestaurantEntity,
        cartSupplier: OrderCartSupplierDto,
        dto: CreatingOrdersDto): void {
        const products = cartSupplier.products.map(p => p) as OrderProductSummaryEntity[];

        const newTransaction: OrderTransactionEntity = {
            status: OrderStatus.WaitingForApprove,
            createdAt: new Date(),
            updatedAt: new Date(),
            note: '',
            systemNote: 'New order',
            updatedBy: {
                userId: userToken._id,
                userName: userToken.userName,
                email: userToken.email,
                companyId: userToken.companyId,
                companyName: restaurant.name,
            }
        };

        const payment = cartSupplier.isPayEndOfMonth ? { isPayEndOfMonth: true, paymentType: PaymentType.None }
            : { isPayEndOfMonth: false, paymentType: PaymentType.COD };

        const orderEntity: OrderEntity = {
            orderNumber: `O${OrderUtil.generateOrderNumber()}`,
            supplier: {
                _id: cartSupplier._id.toString(),
                name: cartSupplier.name,
            },
            restaurant: {
                _id: restaurant._id.toString(),
                name: restaurant.name,
                email: restaurant.email
            },
            payment: payment,
            shippingAddress: dto.shippingAddress,
            products: products,
            deliveryOption: cartSupplier.deliveryOption,
            transactions: [newTransaction],
            currentStatus: OrderStatus.WaitingForApprove,
            hasInvoice: false,
        };
        this.entity = orderEntity;
    }

    updateToPreparingStatus(userToken: TokenUserPayload, dto: UpdatingOrdersDto): void {
        let systemNote: string = '';
        if (dto.products) {
            systemNote = this.getNotesFromProducts(this.entity.products, dto.products);
            this.entity.products = dto.products;
        }
        systemNote += `Change ${this.entity.currentStatus} to ${dto.status}`;
        const newTransaction: OrderTransactionEntity = {
            status: dto.status,
            createdAt: new Date(),
            updatedAt: new Date(),
            note: dto.note ? dto.note : '',
            systemNote: systemNote,
            updatedBy: {
                userId: userToken._id,
                userName: userToken.userName,
                email: userToken.email,
                companyId: userToken.companyId,
                companyName: this.entity.supplier.name,
            }
        };

        this.entity.currentStatus = newTransaction.status;
        this.entity.transactions.push(newTransaction);
    }

    updateToWaitingForApprove(userToken: TokenUserPayload, dto: UpdatingOrdersDto): void {
        let systemNote = '';
        if (dto.products) {
            systemNote = this.getNotesFromProducts(this.entity.products, dto.products);
            this.entity.products = dto.products;
        }
        const newTransaction: OrderTransactionEntity = {
            status: dto.status,
            createdAt: new Date(),
            updatedAt: new Date(),
            note: dto.note ? dto.note : '',
            systemNote: systemNote,
            updatedBy: {
                userId: userToken._id,
                userName: userToken.userName,
                email: userToken.email,
                companyId: userToken.companyId,
                companyName: this.entity.supplier.name,
            }
        };
        this.entity.transactions.push(newTransaction);
    }

    updateToInprogress(userToken: TokenUserPayload, note: string): void {

        const systemNote = `Change ${this.entity.currentStatus} to ${OrderStatus.Inprogress}`;
        const newTransaction: OrderTransactionEntity = {
            status: OrderStatus.Inprogress,
            createdAt: new Date(),
            updatedAt: new Date(),
            note: note,
            systemNote: systemNote,
            updatedBy: {
                userId: userToken._id,
                userName: userToken.userName,
                email: userToken.email,
                companyId: userToken.companyId,
                companyName: this.entity.supplier.name,
            }
        };
        this.entity.currentStatus = newTransaction.status;
        this.entity.transactions.push(newTransaction);
    }

    updateToDelivered(userToken: TokenUserPayload, note: string): void {
        const systemNote = `Change ${this.entity.currentStatus} to ${OrderStatus.Delivered}`;
        const newTransaction: OrderTransactionEntity = {
            status: OrderStatus.Delivered,
            createdAt: new Date(),
            updatedAt: new Date(),
            note: note ? note : '',
            systemNote: systemNote,
            updatedBy: {
                userId: userToken._id,
                userName: userToken.userName,
                email: userToken.email,
                companyId: userToken.companyId,
                companyName: this.entity.supplier.name,
            }
        };
        this.entity.currentStatus = newTransaction.status;
        this.entity.transactions.push(newTransaction);
    }

    updateToPaidBySystem(): void {
        const systemNote = `Change ${this.entity.currentStatus} to ${OrderStatus.Paid}`;
        const newTransaction: OrderTransactionEntity = {
            status: OrderStatus.Paid,
            createdAt: new Date(),
            updatedAt: new Date(),
            note: '',
            systemNote: systemNote
        };
        this.entity.currentStatus = newTransaction.status;
        this.entity.transactions.push(newTransaction);
    }

    updateToPaid(userToken: TokenUserPayload, note: string): void {

        const systemNote = `Change ${this.entity.currentStatus} to ${OrderStatus.Paid}`;

        const newTransaction: OrderTransactionEntity = {
            status: OrderStatus.Paid,
            createdAt: new Date(),
            updatedAt: new Date(),
            note: note ? note : '',
            systemNote: systemNote,
            updatedBy: {
                userId: userToken._id,
                userName: userToken.userName,
                email: userToken.email,
                companyId: userToken.companyId,
                companyName: this.entity.supplier.name,
            }
        };
        this.entity.currentStatus = newTransaction.status;
        this.entity.transactions.push(newTransaction);
    }

    updateToCancel(userToken: TokenUserPayload, dto: UpdatingOrdersDto): void {
        let companyName = '';
        if (userToken.companyId === this.entity.restaurant._id)
            companyName = this.entity.restaurant.name;
        else {
            if (userToken.companyId === this.entity.supplier._id)
                companyName = this.entity.supplier.name;
        }

        if (companyName === '') {
            console.error('Error : wrong company name');
            throw new HttpException(MessageConstant.SOMETHING_WRONG, HttpStatus.BAD_REQUEST);
        }

        const newTransaction: OrderTransactionEntity = {
            status: OrderStatus.Cancel,
            createdAt: new Date(),
            updatedAt: new Date(),
            note: dto.note ? dto.note : '',
            systemNote: 'Cancel order',
            updatedBy: {
                userId: userToken._id,
                userName: userToken.userName,
                email: userToken.email,
                companyId: userToken.companyId,
                companyName: companyName
            }
        };
        this.entity.currentStatus = OrderStatus.Cancel;
        this.entity.transactions.push(newTransaction);
        this.entity.isDeleted = true;
    }

    getNotesFromProducts(sourceProducts: OrderProductSummaryEntity[], fromProducts: OrderProductSummaryEntity[]): string {
        let notes: string = '';
        sourceProducts.forEach(p => {
            const product = Enumerable.from(fromProducts).firstOrDefault(i => i._id === p._id);
            if (!product)
                notes += `Remove ${p.quantity} x ${p.name}`;
            else
                if (p.quantity !== product.quantity)
                    notes += `Update ${p.quantity} x ${p.name} => ${product.quantity} \n`;
        });
        return notes;
    }

    enableIsAddToInvoice(): void {
        this.entity.hasInvoice = true;
    }

    disableIsAddToInvoice(): void {
        this.entity.hasInvoice = false;
    }

    updatePayment(userToken: TokenUserPayload, isPayEndOfMonth: boolean) {

        if (this.entity.currentStatus !== OrderStatus.WaitingForApprove) {
            throw new Error('Status is not correct to update');
        }

        if (isPayEndOfMonth) {
            this.entity.payment.isPayEndOfMonth = true;
            this.entity.payment.paymentType = PaymentType.None;
        } else {
            this.entity.payment.isPayEndOfMonth = false;
            this.entity.payment.paymentType = PaymentType.COD;
        }

        const paymentNote = isPayEndOfMonth ? 'EndOfMonth' : 'COD';
        const newTransaction: OrderTransactionEntity = {
            status: OrderStatus.Inprogress,
            createdAt: new Date(),
            updatedAt: new Date(),
            note: '',
            systemNote: paymentNote,
            updatedBy: {
                userId: userToken._id,
                userName: userToken.userName,
                email: userToken.email,
                companyId: userToken.companyId,
                companyName: this.entity.supplier.name,
            }
        };
        this.entity.transactions.push(newTransaction);
    }

}