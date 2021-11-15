import {Offer} from "./Offer";

export interface OfferGateway {
    getOffer(reference: string): Promise<Offer>
}
