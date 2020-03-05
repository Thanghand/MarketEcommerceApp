import { ApiModelProperty } from '@nestjs/swagger';
import { Allow, IsString, IsEmail } from 'class-validator';


export class SignInDto {

    @ApiModelProperty({required: true})
    @IsString()
    @Allow()
    email: string;

    @ApiModelProperty({required: true})
    @IsString()
    @Allow()
    password: string;

}