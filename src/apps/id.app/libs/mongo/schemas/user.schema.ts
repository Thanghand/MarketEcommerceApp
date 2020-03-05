import { Role, UserEntity, LocationEntity, RecordUserChanged } from '@models';
import { Column, Entity, Index } from 'typeorm';
import { BaseSchema } from '@libs/mongo/base.schema';

@Entity('users')
export class UserSchema extends BaseSchema implements UserEntity {
    @Column()
    @Index('email', {background: true})
    email: string;

    @Column() firstName: string;
    @Column() lastName: string;
    @Column() password: string;
    @Column() phoneNumber: string;

    @Column() 
    @Index('companyId', {background: true})
    companyId: string;
    
    @Column() companyType: string;
    @Column() location: LocationEntity;
    @Column() avatar?: string = '';
    @Column() role: Role;
    @Column() descriptions?: string = '';
    @Column() shippingAddress?: string[];
    @Column() transactions: RecordUserChanged[] = [];
}