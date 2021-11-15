import {Inject, Injectable} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import DomainEvent from "../../domain/event/DomainEvent";
import OfferCreatedEvent from "../../domain/event/OfferCreatedEvent";
import EventBus from "../../domain/EventBus";
import QuotaUpdatesEvent from "../../domain/event/QuotaUpdatesEvent";
import OfferUpdateEvent from "../../domain/event/OfferUpdateEvent";
import QuotaCreatedEvent from "../../domain/event/QuotaCreatedEvent";

@Injectable()
export class RabbitMqService implements EventBus {
    constructor(@Inject('OFFER_DISCOUNT') private readonly offerDiscount: ClientProxy,
                @Inject('OFFER_QUOTA') private readonly offerQuota: ClientProxy) {
    }

    public async publish(offerEvent: DomainEvent[]): Promise<void> {
        for (const event of offerEvent) {
            if (event instanceof QuotaUpdatesEvent)
                await this.offerQuota.emit('update_quota', event)
            if (event instanceof QuotaCreatedEvent)
                await this.offerQuota.emit('create_quota', event)
            if (event instanceof OfferUpdateEvent)
                await this.offerDiscount.emit('update_offer', event)
            if (event instanceof OfferCreatedEvent)
                await this.offerDiscount.emit('create_offer', event)
        }
    }
}
