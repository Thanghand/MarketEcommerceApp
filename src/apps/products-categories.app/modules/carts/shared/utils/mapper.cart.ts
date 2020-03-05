import { ShoppingCartEntity, CartProductEntity, CartSuppliers, CartProductResponse, ShoppingCartDetailResponse } from '@models';
import * as _ from 'lodash';
import * as Enumerable from 'linq';
import { ImageUtil } from '@shared.all/utils';

export class MapperCart {
    public static mappingEntityToCartDetailResponse(input: ShoppingCartEntity): ShoppingCartDetailResponse {

        const groupCartSuppliers: CartSuppliers[] = input.products.length === 0 ? [] : this.mappingProductsToGroupSuppiers(input.products);
        const response: ShoppingCartDetailResponse = {
            _id: input._id,
            userId: input.userId,
            groupCartSuppliers: groupCartSuppliers,
        };
        return response;
    }

    private static mappingProductsToGroupSuppiers(input: CartProductEntity[]): CartSuppliers[] {
        const collection = Enumerable.from(input)
            .groupBy(c => c.supplierId)
            .select(x => x)
            .toArray()
            .map(i => {
                const key = i.key();
                const source = i.getSource();
                const result: CartSuppliers = {
                    supplierId: key,
                    products: source.map(p => {
                        const result: CartProductResponse = {
                            _id: p._id,
                            name: p.name,
                            image: p.images && p.images.length > 0 
                                    ? ImageUtil.mergeSourceCDNToId(p.images.shift()) : '',
                            quantity: p.quantity,
                            supplierId: p.supplierId,
                            supplierName: p.supplierName,
                            price: p.price,
                            active: p.active,
                            isSoldOut: this.isSoldOut(p.isProductDeleted, p.isProductActive),
                        };
                        return result;
                    }),
                    deliveryOption: i.first().deliveryOption,
                    supplierName: i.first().supplierName,
                    supplierLogo: i.first().supplierLogo,
                    active: i.first().active,
                    workingDayHour: i.first().workingDayHour
                };
                return result;
            });
        return collection as CartSuppliers[];
    }

    private static isSoldOut(isDeleted: boolean, active:boolean): boolean {
        if (isDeleted) 
            return true;

        return !active;
    }
}