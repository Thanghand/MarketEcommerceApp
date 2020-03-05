import { Role, LocationDto } from '@models';

export interface UserResponse {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    companyId: string;
    companyType: string;
    avatar?: string;
    role: Role;
    descriptions?: string;
    active?: boolean;
    location?: LocationDto;
}
