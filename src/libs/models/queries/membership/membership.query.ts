import { MembershipType } from '@libs/models/enums';


export interface MembershipQuery {
    date?: string;
    point?: number;
    userName?: string;
    type?: MembershipType;
}