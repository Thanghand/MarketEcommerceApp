import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { LocationDto, LicenseDto, ContactsDto } from '..';
import { IsString, Allow, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';


export class UpdatingCompanyDto {
    
    @ApiModelProperty({required: true})
    @IsString()
    @Allow()
    name: string;

    @ApiModelProperty({required: true})
    @IsString()
    @Allow()
    description: string;

    @ApiModelProperty({required: true, type: LocationDto})
    @ValidateNested()
    @Type(() => LocationDto)
    @Allow()
    location: LocationDto;
    
    @ApiModelProperty()
    @IsString()
    logo?: string;

    @ApiModelProperty({required: true})
    @IsString()
    @Allow()
    email: string;

    @ApiModelProperty({required: true})
    @IsString()
    @Allow()
    phoneNumber: string;

    @ApiModelPropertyOptional()
    @IsArray()
    media?: string[];

    @ApiModelPropertyOptional({type: LicenseDto, isArray: true})
    @IsArray()
    licenses: LicenseDto[];

    @ApiModelPropertyOptional({type: ContactsDto, isArray: true})
    @IsArray()
    listContacts: ContactsDto[];
}