import { Injectable, Inject } from '@nestjs/common';
import * as Enumerable from 'linq';
import { PdfMakerService } from '../services/pdfmake/pdf.maker.service';
import { CurrencyUtil, DateUtil } from '@shared.all/utils';
import { FileUtil } from '../utils';
import { ClientOrderRepository, IClientOrderRepository } from '@libs/repositories';
import { OrderDetailResponse, OrderEntity } from '@libs/models';


export interface CreatingOrderPdfParam {
    orderId: string;
    res: any;
    filename: string;
}

@Injectable()
export class CreateOrderPdfUseCase {

    constructor(@Inject(ClientOrderRepository) private readonly orderRepository: IClientOrderRepository,
        private readonly pdfMakerService: PdfMakerService) {
    }

    public async execute(param: CreatingOrderPdfParam): Promise<any> {

        const { orderId, res, filename } = param;
        const order = await this.orderRepository.getOrderDetail(orderId, true) as OrderEntity;
        const bodyTables = [];
        order.products.forEach(p => {
            const columns = [];
            columns.push(`${p.name}`);
            columns.push(p.quantity);
            columns.push(p.price);
            columns.push(CurrencyUtil.convertNumberToVND(p.price * p.quantity));
            bodyTables.push(columns);
        });

        const total = Enumerable.from(order.products).sum(p => p.quantity * p.price);
        let caculateShippingFee = 0;
        let caculateTotal = total;
        if (order.deliveryOption != null && total < order.deliveryOption.minFreeShipping) {
            caculateTotal = total + order.deliveryOption.shippingFee;
            caculateShippingFee = order.deliveryOption.shippingFee;
        }
        const payment = order.payment.isPayEndOfMonth ? 'End of month' : 'COD';
        const dd = {
            content: [
                {
                    layout: 'noBorders', // optional
                    table: {
                        headerRows: 1,
                        widths: ['auto', 'auto', '*'],
                        body: [
                            [
                                {
                                    image: FileUtil.getLogoContent(order.supplier._id),
                                    margin: [0, 10, 0, 0]
                                },
                                {
                                    text: order.supplier.name,
                                    style: ['header', 'anotherStyle'],
                                    fontSize: 15,
                                    margin: [0, 15, 0, 0]
                                },
                                { text: 'Order', style: 'header', margin: [0, 0, 30, 10], alignment: 'right' },
                            ]
                        ]
                    }
                },
                { text: `Customer ${order.restaurant.name}`, style: 'customerTile' },
                { text: `Order Number: #${order.orderNumber}`, style: 'normalTitle' },
                { text: `Start Date: ${DateUtil.formartYearMonthDate(order.createdAt.toString())}`, style: 'normalTitle' },
                { text: `Payment: ${payment}`, style: 'normalTitle' },
                {
                    layout: 'lightHorizontalLines', // optional
                    margin: [0, 20, 0, 0],
                    table: {
                        // headers are automatically repeated if the table spans over multiple pages
                        // you can declare how many rows should be treated as headers
                        headerRows: 1,
                        widths: ['*', 100, 100, 100],

                        body: [
                            [
                                { text: 'Product', style: 'headerCell' },
                                { text: 'Quantity', style: 'headerCell' },
                                { text: 'Price', style: 'headerCell' },
                                { text: 'Total', style: 'headerCell' }
                            ],
                            ...bodyTables,
                        ]
                    },
                },
                { text: `Caculate Total: ${CurrencyUtil.convertNumberToVND((total as number))}`, fontSize: 12, bold: true },
                { text: `Shipping Fee: ${CurrencyUtil.convertNumberToVND((caculateShippingFee as number))}`, fontSize: 12, bold: true },
                { text: `Total: ${CurrencyUtil.convertNumberToVND((caculateTotal))}`, style: { fontSize: 15, bold: true }, margin: [0, 10, 0, 30] },
                { text: 'Signature: ' },
                { text: '___________________________', margin: [0, 60, 0, 0] },
                { text: 'Name: ' },
                { text: 'Date: ' },
            ],
            footer: {
                layout: 'noBorders', // optional
                table: {
                    headerRows: 1,
                    widths: ['auto', 'auto'],

                    body: [
                        [
                            {
                                image: FileUtil.getTechnoFoodLogo(),
                                margin: [10, 0, 0, 0]
                            },
                            {
                                text: 'Technofood',
                                margin: [0, 10, 0, 0],
                                italics: true,
                            },
                        ]
                    ]
                }
            },
            styles: {
                header: {
                    fontSize: 30,
                    bold: true
                },
                anotherStyle: {
                    italics: true,
                    alignment: 'right'
                },
                headerCell: {
                    fontSize: 18,
                    fillColor: 'silver',
                    color: 'white',
                    bold: true,
                },
                normalTitle: {
                    fontSize: 12,
                    bold: true,
                    margin: [0, 5, 0, 5]
                },
                customerTile: {
                    fontSize: 20,
                    bold: true,
                    margin: [0, 10, 0, 10],
                    alignment: 'right'
                },
                cellOrderNumber: {
                    fontSize: 15,
                    bold: true
                }
            }
        };

        res.type('pdf');
        res.setHeader('Content-disposition', `attachment; filename=${filename}`);
        this.pdfMakerService.generatePdfFile(res, dd);
    }
}