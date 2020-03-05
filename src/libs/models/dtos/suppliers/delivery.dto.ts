import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber, Allow, IsBoolean } from 'class-validator';

export class DeliveryDto {

    @ApiModelProperty()
    @IsNumber()
    @Allow()
    shippingFee: number;
    
    @ApiModelProperty()
    @IsNumber()
    @Allow()
    minFreeShipping: number;

    @ApiModelProperty()
    @IsBoolean()
    @Allow()
    active: boolean;
}