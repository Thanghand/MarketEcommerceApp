import { IsString, Allow, ValidateNested, IsDate, IsNumber } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class OrderInvoiceDto {

    @ApiModelProperty({required: true})
    @IsString()
    @Allow()
    _id: string;

    @ApiModelProperty({required: true})
    @IsString()
    @Allow()
    orderNumber: string;
  
    @ApiModelProperty({required: true, enum: ['WaitingForApprove', 'Inprogress', 'Delivered', 'Paid']})
    @IsString()
    @Allow()
    status: string;

    @ApiModelProperty({required: true})
    @IsNumber()
    @Allow()
    total: number;
}

export class CreatingInvoiceDto {

    @ApiModelProperty({required: true})
    @IsString()
    @Allow()
    restaurantId: string;

    @ApiModelProperty({required: true, type: OrderInvoiceDto, isArray: true})
    @Allow()
    orders: OrderInvoiceDto[];

    @ApiModelProperty({required: true})
    @IsString()
    @Allow()
    startDate: string;

    @ApiModelProperty({required: true})
    @IsString()
    @Allow()
    endDate: string;

    @ApiModelProperty({required: true})
    @IsString()
    @Allow()
    note: string;

}