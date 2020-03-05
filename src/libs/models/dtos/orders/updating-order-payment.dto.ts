import { ApiModelProperty } from '@nestjs/swagger';
import { Allow, IsBoolean } from 'class-validator';

export class UpdatingOrderPaymentDto {

    @ApiModelProperty({required: true})
    @IsBoolean()
    @Allow()
    isPayEndOfMonth: boolean;
}