import Offer from "./Offer";
import Quota from "./Quota";

export default interface OfferRepository {
    save(offer: Offer): void
    update(offer: Offer): void
    findAll(): Offer[]
    findByReference(reference: string): Offer
    updateQuota(reference:string, quota: Quota): Offer;
    deleteAll(): void;
}
