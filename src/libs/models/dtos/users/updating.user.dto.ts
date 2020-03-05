import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, Allow, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { LocationDto, Role } from '@models';

export class UpdatingUserDto {
    
    @ApiModelProperty({required: true})
    @IsString()
    @Allow()
    firstName: string;

    @ApiModelProperty({required: true})
    @IsString()
    @Allow()
    lastName: string;

    @ApiModelProperty({required: true})
    @IsString()
    @Allow()
    phoneNumber: string;

    @ApiModelProperty({required: true})
    @ValidateNested()
    @Type(() => LocationDto)
    @Allow()
    location: LocationDto;

    @ApiModelProperty({required: true, enum: ['MANAGER', 'EMPLOYEE', 'DIRECTOR']})
    @IsString()
    @Allow()
    role: Role;

    @ApiModelPropertyOptional()
    @IsString()
    avatar?: string = '';

    @ApiModelPropertyOptional()
    @IsString()
    descriptions?: string = '';

    updatedAt: Date = new Date();

    @ApiModelPropertyOptional()
    @IsString()
    password?: string = '';
}