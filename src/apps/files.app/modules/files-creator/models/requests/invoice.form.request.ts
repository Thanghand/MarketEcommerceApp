import { ApiModelProperty } from "@nestjs/swagger";
import { IsString, Allow, IsDate, ValidateNested, IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class OrderFormRequest {

    @ApiModelProperty({required: true})
    @IsString()
    @Allow()
    orderNumber: string;

    @ApiModelProperty({required: true})
    @IsString()
    @Allow()
    status: string;

    @ApiModelProperty({required: true})
    @IsString()
    @Allow()
    total: number;
}

export class InvoiceFormRequest {

    @ApiModelProperty({required: true})
    @IsString()
    @Allow()
    invoiceNumber: string;

    @ApiModelProperty({required: true, type: OrderFormRequest, isArray: true})
    @Allow()
    orders: OrderFormRequest[];

    @ApiModelProperty({required: true})
    @IsString()
    @Allow()
    startDate: string;

    @ApiModelProperty({required: true})
    @IsString()
    @Allow()
    endDate: string;

    @ApiModelProperty({required: true})
    @IsNumber()
    @Allow()
    total: number;

    @ApiModelProperty({required: true})
    @IsString()
    @Allow()
    supplierName: string;

    @ApiModelProperty({required: true})
    @IsString()
    @Allow()
    supplierId: string;

    @ApiModelProperty({required: true})
    @IsString()
    @Allow()
    restaurantName: string;

    @ApiModelProperty({required: true})
    @IsString()
    @Allow()
    note: string;
}