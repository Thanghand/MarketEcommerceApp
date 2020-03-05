import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, Allow, IsNumber, IsBoolean } from 'class-validator';



export class UpdatingShoppingCartDto {

    @ApiModelProperty()
    @IsString()
    @Allow()
    supplierId: string;

    @ApiModelPropertyOptional()
    @IsString()
    productId: string;

    @ApiModelProperty()
    @IsNumber()
    @Allow()
    quantity: number;

    @ApiModelProperty()
    @IsBoolean()
    @Allow()
    active: boolean;
}