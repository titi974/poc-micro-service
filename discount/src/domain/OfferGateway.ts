import Offer from "./Offer";

export interface OfferGateway {
    getOfferByDiscountReference(reference:string): Promise<Offer[]>
}
