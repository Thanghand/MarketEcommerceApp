import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, Allow, IsEmail, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CompanyType, Role, LocationDto } from '@models';

export class SignupDto {

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
    @IsEmail()
    @Allow()
    email: string;

    @ApiModelProperty({required: true})
    @IsString()
    @Allow()
    password: string;

    @ApiModelProperty({required: true})
    @IsString()
    @Allow()
    phoneNumber: string;

    @ApiModelProperty({required: true})
    @IsString()
    @Allow()
    companyId: string;

    @ApiModelProperty({required: true, enum: ['ADMIN_SYSTEM', 'RESTAURANT', 'SUPPLIER']})
    @IsString()
    @Allow()
    companyType: CompanyType;

    @ApiModelPropertyOptional()
    @IsString()
    avatar?: string;

    @ApiModelProperty({required: true, enum: ['MANAGER', 'EMPLOYEE', 'DIRECTOR']})
    @IsString()
    @Allow()
    role: Role;

    @ApiModelPropertyOptional()
    @IsString()
    descriptions?: string;

    @ApiModelProperty({required: true})
    @ValidateNested()
    @Type(() => LocationDto)
    @Allow()
    location: LocationDto;
}
