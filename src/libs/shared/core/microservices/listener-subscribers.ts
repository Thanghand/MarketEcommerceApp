import { Client } from '@nestjs/microservices/external/nats-client.interface';
import { MessageHandler } from '@nestjs/microservices';

export class ListenerSubsriber {

    private subscribeMaps = new Map<string, Function[]>();
    private static readonly instance: ListenerSubsriber = new ListenerSubsriber();

    public static getInstance() {
        return this.instance;
    }

    private isRunSubcribeAll: boolean = false;

    public addSubcriber(subject: string, handler: MessageHandler) {
        if (this.subscribeMaps.has(subject)) {
            const handlers = this.subscribeMaps.get(subject) as MessageHandler[];
            handlers.push(handler);
            this.subscribeMaps.set(subject, handlers);
        } else {
            const handlers = [];
            handlers.push(handler);
            this.subscribeMaps.set(subject, handlers);
        }
    }

    public subcribeAllNatsClient(natsClient: Client): void {
        if (!natsClient)
            return;

        try {
            if (!this.isRunSubcribeAll) {
                this.subscribeMaps.forEach((handlers, key) => {
                    handlers.forEach(h => {
                        natsClient.subscribe(key, async (param: any)=> h(param ? param.data : undefined));
                    });
                });
                this.isRunSubcribeAll = true;
            }
        } catch (ex) {
            console.error(ex);
            this.isRunSubcribeAll = false;
        }
    }
}