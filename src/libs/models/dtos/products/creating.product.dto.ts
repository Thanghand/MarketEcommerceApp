import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, Allow, IsArray, IsNumber, ValidateNested, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { Unit } from '@models';

export class BrandDto {

    @ApiModelProperty()
    @IsString()
    @Allow()
    _id: string;

    @ApiModelProperty()
    @IsString()
    @Allow()
    name: string;
}

export class PackingDto {

    @ApiModelProperty()
    @IsNumber()
    @Allow()
    quantity: number;

    @ApiModelProperty()
    @IsString()
    @Allow()
    unit: Unit;
}

export class CreatingProductDto {

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
    @IsArray()
    @Allow()
    categoriesId: string[];

    @ApiModelProperty()
    @IsNumber()
    @Allow()
    numberOfPackage: number;

    @ApiModelProperty()
    @IsBoolean()
    @Allow()
    active: boolean;

    @ApiModelProperty()
    @ValidateNested()
    @Type(() => PackingDto)
    @Allow()
    packing: PackingDto;
}