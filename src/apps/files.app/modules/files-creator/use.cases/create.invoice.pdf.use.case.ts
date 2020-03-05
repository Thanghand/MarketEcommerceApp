import { InvoiceFormRequest } from '../models/requests/invoice.form.request';
import { PdfMakerService } from '../services/pdfmake/pdf.maker.service';
import { Injectable } from '@nestjs/common';
import { CurrencyUtil, DateUtil } from '@shared.all/utils';
import { FileUtil } from '../utils/file.util';

export interface CreatingInvoiceParam {
    request: InvoiceFormRequest;
    res: any;
    filename: string;
}

@Injectable()
export class CreateInvoicePdfUseCase {

    constructor(private readonly pdfMakerService: PdfMakerService) {
    }

    execute(input?: CreatingInvoiceParam): void {

        const { request, res, filename } = input;
        const bodyTables = [];

        request.orders.forEach(o => {
            const columns = [];
            columns.push(`#${o.orderNumber}`);
            columns.push(o.status);
            columns.push(CurrencyUtil.convertNumberToVND(o.total));
            bodyTables.push(columns);
        });

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
                                    image: FileUtil.getLogoContent(request.supplierId),
                                    margin: [0, 10, 0, 0]
                                },
                                {
                                    text: request.supplierName,
                                    style: ['header', 'anotherStyle'],
                                    fontSize: 15,
                                    margin: [0, 15, 0, 0]
                                },
                                { text: 'Invoice', style: 'header', margin: [0, 0, 30, 10], alignment: 'right' },
                            ]
                        ]
                    }
                },
                { text: `Customer ${request.restaurantName}`, style: 'customerTile' },
                { text: `Invoice Number: #${request.invoiceNumber}`, style: 'normalTitle' },
                { text: `Start Date: ${DateUtil.formartYearMonthDate(request.startDate)}`, style: 'normalTitle' },
                { text: `End Date: ${DateUtil.formartYearMonthDate(request.endDate)}`, style: 'normalTitle' },
                {
                    layout: 'lightHorizontalLines', // optional
                    margin: [0, 20, 0, 0],
                    table: {
                        // headers are automatically repeated if the table spans over multiple pages
                        // you can declare how many rows should be treated as headers
                        headerRows: 1,
                        widths: ['*', 100, 100],
                        body: [
                            [
                                { text: 'Order number', style: 'headerCell' },
                                { text: 'Status', style: 'headerCell' },
                                { text: 'Total', style: 'headerCell' }
                            ],
                            ...bodyTables,
                        ]
                    },
                },
                { text: `Total: ${CurrencyUtil.convertNumberToVND((request.total))}`, style: { fontSize: 15, bold: true}, margin: [0, 10, 0, 10] },
                { text: `Note: ${request.note}`, style: { fontSize: 10, italic: true }, margin: [0, 10, 0, 30] },
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

