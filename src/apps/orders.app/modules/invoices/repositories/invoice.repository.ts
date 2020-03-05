import { MongoBaseRepository } from '@shared.core';
import { InvoiceEntity, InvoiceQuery } from '@models';
import { IInvoiceRepository } from './invoice.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Configuration } from '@shared.all/config/apps.configuration';
import { AppServiceNameConfig } from '@shared.all/config';
import { InvoiceSchema } from '../../../libs/mongo/schemas';

export class InvoiceRepository extends MongoBaseRepository<InvoiceEntity, InvoiceSchema> implements IInvoiceRepository {

    constructor(@InjectRepository(InvoiceSchema, Configuration.getConfig().getService(AppServiceNameConfig.Orders).mongodb.getConnection())
   
    private readonly invoiceDao: MongoRepository<InvoiceSchema>) {
        super(invoiceDao, InvoiceSchema);
    }

    async getInvoices(query: InvoiceQuery): Promise<InvoiceEntity[]> {

        const where = {};
        const {
            restaurantId,
            supplierId,
            startDate,
            endDate
        } = query;

        if (restaurantId)
            where['restaurant._id'] = restaurantId;

        if (supplierId)
            where['supplier._id'] = supplierId;

        if (startDate && endDate)
            where['updatedAt'] = {
                '$gte': new Date(startDate),
                '$lt': new Date(endDate)
            };

        const result = await this.invoiceDao.find({
            where: where,
            select: [
                '_id',
                'updatedAt',
                'createdAt',
                'restaurant',
                'supplier',
                'status',
                'invoiceNumber',
                'total',
                'startDate',
                'endDate'
            ],
            order: {
                updatedAt: -1
            }
        });
        return result;
    }
}