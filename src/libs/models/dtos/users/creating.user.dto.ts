import { SignupDto } from './signup.dto';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Allow, IsString, IsEmail, ValidateNested, Validate } from 'class-validator';
import { Type } from 'class-transformer';
import { Role, LocationDto, CompanyType } from '@models';

export class CreatingUserDto {

    @ApiModelProperty({required: true})
    @Allow()
    @IsString()
    firstName: string;

    @ApiModelProperty({required: true})
    @IsString()
    @Allow()
    lastName: string;

    @ApiModelProperty({required: true})
    @IsString()
    @Allow()
    email: string;

    @ApiModelProperty({required: true})
    @Allow()
    @IsString()
    password: string;

    @ApiModelProperty({required: true})
    @Allow()
    @IsString()
    phoneNumber: string;

    @ApiModelPropertyOptional()
    @Allow()
    @IsString()
    avatar?: string;

    @ApiModelProperty({required: true, enum: ['MANAGER', 'EMPLOYEE', 'DIRECTOR']})
    @Allow()
    @IsString()
    role: Role;

    @ApiModelPropertyOptional()
    @Allow()
    @IsString()
    descriptions?: string;

    @ApiModelPropertyOptional()
    @ValidateNested()
    @Type(() => LocationDto)
    @Allow()
    location: LocationDto;

}

export class CreatingUsersDto {

    @ApiModelProperty({required: true, type: CreatingUserDto, isArray: true})
    @Allow()
    users: CreatingUserDto[];

    @ApiModelProperty({required: true, enum: ['ADMIN_SYSTEM', 'RESTAURANTS', 'SUPPLIERS']})
    @Allow()
    companyTypeTarget: CompanyType;

    @ApiModelProperty({required: true,})
    @Allow()
    companyId: string;
}

