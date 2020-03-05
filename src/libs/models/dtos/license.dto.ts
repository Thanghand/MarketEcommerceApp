import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LicenseDto {

    @ApiModelProperty({required: true})
    @IsString()
    image: string;

    @ApiModelProperty({required: true})
    @IsString()
    description: string;
}