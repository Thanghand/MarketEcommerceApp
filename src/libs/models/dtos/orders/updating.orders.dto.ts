import { OrderStatus, OrderProductSummaryDto } from '@models';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, Allow, ValidateNested, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer/decorators';

export class UpdatingOrdersDto {

    @ApiModelProperty({required: true, enum: ['WaitingForApprove', 'Preparing', 'Inprogress', 'Deliveried', 'Paid']})
    @IsString()
    @Allow()
    status: OrderStatus;

    @ApiModelProperty({required: true, type: OrderProductSummaryDto, isArray: true})
    @Allow()
    products?: OrderProductSummaryDto[];

    @ApiModelPropertyOptional()
    @IsString()
    note?: string;
}