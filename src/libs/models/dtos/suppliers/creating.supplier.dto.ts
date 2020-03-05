import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { DeliveryDto, WorkingDayHourDto } from '.';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatingCompanyDto } from '../creating.company.dto';

export class CreatingSupplierDto extends CreatingCompanyDto {
    @ApiModelPropertyOptional({type: DeliveryDto})
    @ValidateNested()
    @Type(() => DeliveryDto)
    deliveryOption?: DeliveryDto;

    @ApiModelPropertyOptional({type: WorkingDayHourDto})
    @ValidateNested()
    @Type(() => WorkingDayHourDto)
    workingDayHour?: WorkingDayHourDto;
}