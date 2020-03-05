import { ShippingAddressEntity, ShippingAddressDto } from '@models';
import { ObjectId } from 'mongodb';


export class MapperShippingAddress {

    public static mappingShippingDtoToEntity(input: ShippingAddressDto, shippingId?: string): ShippingAddressEntity {
        
        const entity: ShippingAddressEntity = {
            _id: shippingId ? shippingId: new ObjectId().toString(),
            name: input.name,
            address: input.address,
            contactPhoneNumber: input.contactPhoneNumber,
            contactUserName: input.contactUserName
        };
        return entity;
    }
    
}