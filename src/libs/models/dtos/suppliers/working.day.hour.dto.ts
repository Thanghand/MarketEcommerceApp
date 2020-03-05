import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber, Allow } from 'class-validator';

export class WorkingDayHourDto {

    @ApiModelProperty()
    @IsNumber()
    @Allow()
    startTime: number;

    @ApiModelProperty()
    @IsNumber()
    @Allow()
    endTime: number;
}