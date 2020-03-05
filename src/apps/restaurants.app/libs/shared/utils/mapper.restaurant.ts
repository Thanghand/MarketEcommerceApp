import { RestaurantEntity, RestaurantDetailInforResponse } from '@models';
import { ImageUtil } from '@shared.all/utils';

export class MapperRestaurants {

    public static mappingEntityToResponseDetail(input: RestaurantEntity): RestaurantDetailInforResponse {
        const result: RestaurantDetailInforResponse = {
            _id: input._id,
            name: input.name,
            description: input.description,
            email: input.email,
            phoneNumber: input.phoneNumber,
            location: input.location,
            companyType: input.companyType,
            media: input.media,
            logo: ImageUtil.mergeSourceCDNToId(input.logo),
            listContacts: input.listContacts,
            licenses: input.licenses,
        };
        return result;
    }
}