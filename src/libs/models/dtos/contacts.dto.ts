import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class ContactsDto {

    @ApiModelProperty({required: true})
    name: string;

    @ApiModelProperty({required: true})
    email: string;

    @ApiModelProperty({required: true})
    phoneNumber: string;

    @ApiModelPropertyOptional()
    descriptions?: string;
  
}