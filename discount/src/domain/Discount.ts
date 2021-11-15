import Offer from "./Offer";

export class Discount {
    constructor(public reference: string, public unit: string,
                public discount: number, public offers: Offer[] = []) {
    }

    addOffer(offers: Offer[]) {
        this.offers = offers
    }
}
