import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber, Allow, IsString } from 'class-validator';
import { All } from '@nestjs/common';

export class RatingDto {

    @ApiModelProperty()
    @IsString()
    @Allow()
    comment: string;

    @ApiModelProperty()
    @IsNumber()
    @Allow()
    point: number;

    @ApiModelProperty()
    @IsString()
    @Allow()
    supplierId: string;

    @ApiModelProperty()
    @IsString()
    @Allow()
    orderId: string;

    @ApiModelProperty()
    @IsString()
    @Allow()
    orderNumber: string;
}