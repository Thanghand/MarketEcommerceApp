import { ListenerSubsriber } from '@shared.core';

export function SubscribeMessagePattern(subject: string) {
    return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
        ListenerSubsriber.getInstance().addSubcriber(subject, descriptor.value);
    };
}