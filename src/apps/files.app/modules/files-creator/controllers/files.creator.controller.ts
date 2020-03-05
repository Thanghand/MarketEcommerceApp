import { Controller, Res, Get, Post, Body, Param, Inject} from '@nestjs/common';
import { InvoiceFormRequest, OrderFormRequest } from '../models/requests/invoice.form.request';
import { OrderStatus } from '@models';
import { ApiUseTags } from '@nestjs/swagger';
import { CreatingInvoiceParam, CreateInvoicePdfUseCase } from '../use.cases';
import { CreatingOrderPdfParam, CreateOrderPdfUseCase } from '../use.cases/create.order.pdf.use.case';
import { ClientInvoiceRepository, IClientInvoiceRepository } from '@libs/repositories';

@ApiUseTags('creators')
@Controller('creators')
export class FilesCreatorController {

  constructor(private readonly createInvoicePdfUseCase: CreateInvoicePdfUseCase,
              private readonly createOrderPdfUseCase: CreateOrderPdfUseCase,
            @Inject(ClientInvoiceRepository)private readonly invoiceRepository: IClientInvoiceRepository) {
  }

  @Get('/invoices/:id/:filename')
  public async getInvoicePDF(@Res() res, @Param('id') invoiceId: string,
    @Param('filename') filename: string) {
    const invoice = await this.invoiceRepository.getInvoiceDetail(invoiceId);
    // const invoice = await this.getInvoicesDetailUseCase.execute(invoiceId);
    const request: InvoiceFormRequest = {
      invoiceNumber: invoice.invoiceNumber,
      orders: invoice.orders.map(o => {
        const order: OrderFormRequest = {
          orderNumber: o.orderNumber,
          status: OrderStatus.Paid,
          total: o.total,
        };
        return order;
      }),
      startDate: new Date(invoice.startDate).toString(),
      endDate: new Date(invoice.endDate).toString(),
      total: invoice.total,
      restaurantName: invoice.restaurant.name,
      supplierName: invoice.supplier.name,
      supplierId: invoice.supplier._id,
      note: invoice.note,
    };
    const param: CreatingInvoiceParam = {
      res: res,
      request: request, 
      filename: filename
    }
    this.createInvoicePdfUseCase.execute(param);
  }

  @Post('/invoice')
  public generateInvoicePdf(@Res() res, @Body() request: InvoiceFormRequest): any {
    const param: CreatingInvoiceParam = {
      res: res,
      request: request, 
      filename: 'invoice.pdf'
    };
    this.createInvoicePdfUseCase.execute(param);
  }

  @Get('/order/:id/:filename')
  public generateOrderPdf(@Res() res, @Param('id') orderId: string, @Param('filename') filename: string): any {
    const param: CreatingOrderPdfParam = {
      res: res,
      orderId: orderId,
      filename: filename
    };
    this.createOrderPdfUseCase.execute(param);
  }

  @Get('test')
  public test(): string {
    console.log('du ma may');
    return 'hello';
  }
}