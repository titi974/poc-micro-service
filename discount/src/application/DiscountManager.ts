import DiscountRepository from "../domain/DiscountRepository";
import {Discount} from "../domain/Discount";
import {OfferGateway} from "../domain/OfferGateway";

export default class DiscountManager {
    constructor(private readonly memory: DiscountRepository, private readonly offersHttp: OfferGateway) {
    }

    async create(discount: Discount): Promise<void> {
        const offers = await this.offersHttp.getOfferByDiscountReference(discount.reference);
        discount.addOffer(offers)
        this.memory.saveOrUpdate(discount)
    }
}
