import { ShippingAddressDto, OrderProductSummaryDto, DeliveryDto } from '@models';
import { ApiModelProperty } from '@nestjs/swagger';
import { ValidateNested, IsString, Allow, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer/decorators';

export class OrderCartSupplierDto {

    @ApiModelProperty()
    @IsString()
    @Allow()
    _id: string;

    @ApiModelProperty()
    @IsString()
    @Allow()
    name: string;

    @ApiModelProperty({type: DeliveryDto})
    @ValidateNested()
    @Type(() => DeliveryDto)
    deliveryOption: DeliveryDto;

    @ApiModelProperty({required: true, type: OrderProductSummaryDto, isArray: true})
    @Allow()
    products: OrderProductSummaryDto[];

    @ApiModelProperty()
    @IsBoolean()
    @Allow()
    isPayEndOfMonth: boolean;

}

export class CreatingOrdersDto {

    @ApiModelProperty({type: ShippingAddressDto})
    @ValidateNested()
    @Type(() => ShippingAddressDto)
    shippingAddress: ShippingAddressDto;

    @ApiModelProperty({required: true, type: OrderCartSupplierDto, isArray: true})
    @Allow()
    cartSuppliers: OrderCartSupplierDto[];


    
}