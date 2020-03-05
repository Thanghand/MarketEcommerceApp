import { ObjectId } from 'mongodb';

export class ObjectUtil {
    
    public static convertToMongoObjectId(id: string | any) {
        return new ObjectId(id.toString());
    }
}