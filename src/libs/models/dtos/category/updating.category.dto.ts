import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, Allow } from 'class-validator';


export class UpdatingCategoryDto {
    
    @ApiModelProperty({required: true})
    @IsString()
    @Allow()
    name: string;

    @ApiModelProperty({required: true})
    @IsString()
    @Allow()
    image: string;

    @ApiModelPropertyOptional()
    @IsString()
    parentId: string;

    @ApiModelPropertyOptional()
    @IsString()
    description?: string;
    
}