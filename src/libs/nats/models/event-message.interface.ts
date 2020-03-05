

export interface IEventMessage {
    sendMessage<T>(messageName: string, input: any): Promise<T>;
    emitMessage(messageName: string, input: any): void;
}