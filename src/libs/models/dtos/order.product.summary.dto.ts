import { ApiModelProperty } from '@nestjs/swagger';
import { Allow, IsString, IsNumber } from 'class-validator';
import { OrderProductSummaryEntity } from '../entities/order.entity';


export class OrderProductSummaryDto implements OrderProductSummaryEntity{

    @ApiModelProperty()
    @IsString()
    @Allow()
    _id: string;

    @ApiModelProperty()
    @IsString()
    @Allow()
    name: string;

    @ApiModelProperty()
    @IsNumber()
    @Allow()
    price: number;

    @ApiModelProperty()
    @IsString()
    @Allow()
    image: string;

    @ApiModelProperty()
    @IsNumber()
    @Allow()
    quantity: number;
}