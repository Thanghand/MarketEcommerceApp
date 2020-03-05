import { UserBasicInformationEntity } from '..';


export interface UpdatingUsersInCompanyParam {
    _id: string;
    users: UserBasicInformationEntity[];
}