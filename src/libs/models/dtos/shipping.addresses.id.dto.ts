import { ApiModelProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';


export class ShippingAddressesIdDto {

    @ApiModelProperty()
    @Allow()
    userId: string;

    @ApiModelProperty({required: true, type: String, isArray: true})
    @Allow()
    shippingAddressesId: string[];
}