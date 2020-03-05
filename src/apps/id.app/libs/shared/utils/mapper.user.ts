import { UserEntity, UserResponse } from '@models';
import * as _ from 'lodash';
export class MapperUser {
    public static mappingUserEntityToUserResponse(input: UserEntity): UserResponse {
        const response: UserResponse = {
            ... _.omit(input, ['password'])
        };
        return response;
    }
}