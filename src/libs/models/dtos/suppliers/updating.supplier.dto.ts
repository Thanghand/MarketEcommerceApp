import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { WorkingDayHourDto } from './working.day.hour.dto';
import { DeliveryDto } from '.';
import { UpdatingCompanyDto } from '..';

export class UpdatingSupplierDto extends UpdatingCompanyDto {
    
    @ApiModelPropertyOptional({type: DeliveryDto})
    @ValidateNested()
    @Type(() => DeliveryDto)
    deliveryOption?: DeliveryDto;

    @ApiModelPropertyOptional({type: WorkingDayHourDto})
    @ValidateNested()
    @Type(() => WorkingDayHourDto)
    workingDayHour?: WorkingDayHourDto;
}