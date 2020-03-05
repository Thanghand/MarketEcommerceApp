import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, Allow } from 'class-validator';


export class ShippingAddressDto {


    @ApiModelPropertyOptional()
    @IsString()
    _id: string;
    
    @ApiModelProperty()
    @IsString()
    @Allow()
    name: string;

    @ApiModelProperty()
    @IsString()
    @Allow()
    address: string;

    @ApiModelProperty()
    @IsString()
    @Allow()
    contactPhoneNumber: string;

    @ApiModelProperty()
    @IsString()
    @Allow()
    contactUserName: string;
}