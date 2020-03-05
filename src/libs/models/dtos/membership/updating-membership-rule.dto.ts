import { MembershipRuleConfigEntity, MembershipType } from '@models';
import { ApiModelProperty } from '@nestjs/swagger';
import { Allow, IsString, IsNumber } from 'class-validator';


export class MembershipRuleConfigDto {
    
    @ApiModelProperty({required: true, enum: ['MANAGER', 'EMPLOYEE', 'DIRECTOR']})
    @Allow()
    @IsString()
    type: string;

    @ApiModelProperty({required: true})
    @Allow()
    @IsNumber()
    max: number;

    @ApiModelProperty({required: true})
    @Allow()
    @IsNumber()
    min: number;

    @ApiModelProperty({required: true})
    @Allow()
    @IsNumber()
    priority: number;

    @ApiModelProperty({required: true})
    @Allow()
    @IsString()
    note: string;
}

export class UpdatingMembershipRuleDto {

    @ApiModelProperty({required: true, type: MembershipRuleConfigDto, isArray: true})
    @Allow()
    configs: MembershipRuleConfigDto[];
}