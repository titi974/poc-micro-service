import Quota from "../domain/Quota";
import OfferRepository from "../domain/OfferRepository";
import EventBus from "../domain/EventBus";
import QuotaUpdatesEvent from "../domain/event/QuotaUpdatesEvent";
import DomainEvent from "../domain/event/DomainEvent";
import OfferUpdateEvent from "../domain/event/OfferUpdateEvent";

export class QuotasManager {
    constructor(private readonly memory: OfferRepository, private readonly eventBus: EventBus) {
    }

    public async update(offerReference: string, quota: Quota): Promise<void> {
        const offerUpdate = this.memory.updateQuota(offerReference, quota);
        const eventsDomain: DomainEvent[] = []
        if (offerUpdate.quota) {
            eventsDomain.push(new QuotaUpdatesEvent(offerUpdate.quota.reference, offerUpdate.quota.quantite))
        }
        eventsDomain.push(new OfferUpdateEvent(offerUpdate.reference, offerUpdate.price, offerUpdate.unit, offerUpdate.discount, offerUpdate.quota))
        await this.eventBus.publish(eventsDomain)
    }
}
