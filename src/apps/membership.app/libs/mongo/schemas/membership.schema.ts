import { BaseSchema } from '@libs/mongo';
import { MembershipEntity, MembershipType, UserInfoMembershipEntity, MembershipOrderEntity, IEntity } from '@libs/models';
import { Column, Entity } from 'typeorm';


@Entity('memberships')
export class MembershipSchema extends BaseSchema implements MembershipEntity {

    @Column() point: number;    
    @Column() lastDayOfMonth: Date;
    @Column() user: UserInfoMembershipEntity;
    @Column() type: MembershipType;
    @Column() orders: MembershipOrderEntity[]; 
    @Column() note: string;
    @Column() rule: IEntity;
}