import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, Allow, ValidateNested, IsNumberString } from 'class-validator';
import { Type } from 'class-transformer';
import { LocationDto, ContactsDto, LicenseDto } from '..';

export class CreatingCompanyDto {

    @ApiModelProperty({required: true})
    @IsString()
    @Allow()
    name: string;

    @ApiModelProperty({required: true})
    @IsString()
    @Allow()
    description: string;

    @ApiModelProperty({required: true})
    @IsString()
    @Allow()
    email: string;

    @ApiModelProperty({required: true})
    @IsNumberString()
    @Allow()
    phoneNumber: string;
    
    @ApiModelProperty({required: true})
    @ValidateNested()
    @Type(() => LocationDto)
    @Allow()
    location: LocationDto;
    
    @ApiModelPropertyOptional({type: ContactsDto})
    listContacts?: ContactsDto[];

    @ApiModelPropertyOptional()
    media?: string[];

    @ApiModelPropertyOptional()
    licenses?: LicenseDto[];

    @ApiModelPropertyOptional()
    @IsString()
    logo?: string;
}
