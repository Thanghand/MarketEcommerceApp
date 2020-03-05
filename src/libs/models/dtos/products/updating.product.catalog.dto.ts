import { ApiModelProperty } from '@nestjs/swagger';
import { IsArray, Allow } from 'class-validator';


export class UpdatingProductCatalogDto {

    @ApiModelProperty()
    @IsArray()
    @Allow()
    categoriesID: string[];  
      
}