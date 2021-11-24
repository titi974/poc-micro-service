import {Injectable} from '@nestjs/common';
import OfferRepository from "../../domain/OfferRepository";
import Offer from "../../domain/Offer";
import Quota from "../../domain/Quota";

@Injectable()
export class MemoryService implements OfferRepository{

    private readonly memories: Offer[] = []

    save(offer: Offer): void {
        this.findByReference(offer.reference) ? this.update(offer) : this.memories.push(offer)
    }

    update(offer: Offer): void {
        const offerUpdate: Offer = this.findByReference(offer.reference);
        offerUpdate.discount = offer.discount
        offerUpdate.price = offer.price
        offerUpdate.unit = offer.unit
        offerUpdate.addQuota(offer.quota)
    }

    findByReference(reference: string): Offer {
        return this.memories.find(offer => offer.reference === reference);
    }

    findAll(): Offer[] {
        return this.memories.map(offer => offer)
    }

    updateQuota(offerReference: string, quota: Quota): Offer {
        const offer: Offer = this.findByReference(offerReference);
        offer.updateQuota(quota.quantite)
        return offer
    }

    deleteAll(): void {
        this.memories.length = 0
    }
}
