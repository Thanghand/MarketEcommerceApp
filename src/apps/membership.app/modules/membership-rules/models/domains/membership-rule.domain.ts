import { BaseDomain, MembershipRuleEntity, UpdatingMembershipRuleDto, MembershipRuleConfigEntity, MembershipType } from '@models';


export class MembershipRuleDomain extends BaseDomain<MembershipRuleEntity> {

    create(): void {

        const types = [MembershipType.Member, MembershipType.Silver, MembershipType.Gold, MembershipType.Diamond];
        // const maxsType = [1000, 4000, 10000, 15000];
        const maxsType = [1000000, 4000000, 10000000, 15000000];

        const entity: MembershipRuleEntity = {
            configs: []
        };

        for (let i = 0; i < 4; i++) {

            const config: MembershipRuleConfigEntity = {
                type: types[i],
                max: maxsType[i],
                min: (i === 0) ? 0 : maxsType[i - 1],
                priority: i + 1,
                note: `You are in ${types[i]}`
            };
            entity.configs.push(config);
        }

        this.entity = entity;
    }

    update(dto: UpdatingMembershipRuleDto): void {

        // Run check validation
        for (let i = 0; i < dto.configs.length; i++) {
            const config = dto.configs[i];
            if (i < dto.configs.length - 1) {
                const nextconfig = dto.configs[i + 1];
                if (config.max > nextconfig.max)
                    throw new Error(`${config.type} cannot has value max greater than ${nextconfig}`);
            }
            this.entity.configs[i] = config as MembershipRuleConfigEntity;
        }
    }
}