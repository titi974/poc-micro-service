import Offer from "../domain/Offer";
import OfferCreatedEvent from "../domain/event/OfferCreatedEvent";
import OfferRepository from "../domain/OfferRepository";
import QuotaCreatedEvent from "../domain/event/QuotaCreatedEvent";
import EventBus from "../domain/EventBus";
import DomainEvent from "../domain/event/DomainEvent";
import QuotaUpdatesEvent from "../domain/event/QuotaUpdatesEvent";
import OfferUpdateEvent from "../domain/event/OfferUpdateEvent";

export default class OfferManager {
    constructor(private readonly memory: OfferRepository, private readonly eventBus: EventBus) {
    }

    public async create(offer: Offer): Promise<void> {
        this.memory.save(offer)
        const eventsDomain: DomainEvent[] = []
        eventsDomain.push(new OfferCreatedEvent(offer.reference, offer.price, offer.unit, offer.discount, offer.quota))
        if (offer.quota) {
            eventsDomain.push(new QuotaCreatedEvent(offer.quota.reference, offer.quota.quantite));
        }
        await this.eventBus.publish(eventsDomain)
    }

    public async update(offer: Offer): Promise<void> {
        this.memory.update(offer)
        const eventsDomain: DomainEvent[] = []
        if (offer.quota) {
            eventsDomain.push(new QuotaUpdatesEvent(offer.quota.reference, offer.quota.quantite));
        }
        eventsDomain.push(new OfferUpdateEvent(offer.reference, offer.price, offer.unit, offer.discount, offer.quota))
        await this.eventBus.publish(eventsDomain)
    }

    deleteAll() {
        this.memory.deleteAll()
    }
}
