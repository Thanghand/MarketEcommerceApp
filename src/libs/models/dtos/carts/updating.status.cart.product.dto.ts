import { ApiModelProperty } from '@nestjs/swagger';
import { IsBoolean, Allow, IsString } from 'class-validator';

export class UpdatingStatusCartProductDto {

    @ApiModelProperty()
    @IsBoolean()
    @Allow()
    active: boolean;

    @ApiModelProperty()
    @IsString()
    @Allow()
    supplierId: string;
}