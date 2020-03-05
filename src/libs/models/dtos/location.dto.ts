import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, Allow, IsNumber } from 'class-validator';


export class LocationDto {

    @ApiModelProperty({required: true})
    @IsString()
    @Allow()
    address: string;

    @ApiModelPropertyOptional()
    @IsNumber()
    lat?: number = 0;

    @ApiModelPropertyOptional()
    @IsNumber()
    long?: number = 0;
    
}