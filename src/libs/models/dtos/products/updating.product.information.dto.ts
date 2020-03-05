import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, Allow, IsArray, IsNumber, ValidateNested, IsBoolean } from 'class-validator';
import { BrandDto, PackingDto } from './';
import { Type } from 'class-transformer';


export class UpdatingProductInformationDto {

    @ApiModelProperty()
    @IsString()
    @Allow()
    name: string;

    @ApiModelPropertyOptional()
    @IsArray()
    images: string[];

    @ApiModelPropertyOptional()
    @IsString()
    description?: string;

    @ApiModelProperty()
    @IsNumber()
    @Allow()
    originalPrice: number;

    @ApiModelProperty()
    @IsNumber()
    @Allow()
    discount: number;

    @ApiModelProperty()
    @IsNumber()
    @Allow()
    numberOfPackage: number;

    @ApiModelProperty()
    @ValidateNested()
    @Type(() => PackingDto)
    @Allow()
    packing: PackingDto;

    @ApiModelProperty()
    @IsArray()
    @Allow()
    categoriesId: string[]; 

    @ApiModelProperty()
    @IsBoolean()
    @Allow()
    active: boolean;
}