import { IClientRatingRepository } from './client-rating.repository.interface';
import { RatingDto, RatingEntity } from '@libs/models';
import { NatsClientService } from '@libs/nats/nats-client.service';
import { MessageEventName } from '@shared.all/constants/messages-event-name';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientRatingRepository implements IClientRatingRepository {

    constructor(private readonly eventMessage: NatsClientService) {

    }

    async createNewRating(dto: RatingDto): Promise<RatingEntity> {
        const result = await this.eventMessage.sendMessage<RatingEntity>(MessageEventName.RATINGS_CREATE, dto);
        return result;
    }

    async getRating(supplierId: string): Promise<RatingEntity> {
        const result = await this.eventMessage.sendMessage<RatingEntity>(MessageEventName.RATINGS_GET, supplierId);
        return result;
    }

    
}