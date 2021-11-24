import Offer from "../domain/Offer";
import DiscountRepository from "../domain/DiscountRepository";

export default class DiscountHandler {
    constructor(private readonly discountRepository: DiscountRepository) {
    }

    updateOffer(offer: Offer) {
        console.log('Update offer', offer)
        const discount = this.discountRepository.findByReference(offer.discount);
        if (discount) {
            const offers = discount.offers.length > 0 ? this.addOrUpdate(discount.offers, offer) : [offer]
            discount.addOffer(offers)
            this.discountRepository.saveOrUpdate(discount)
        }
    }

    createOffer(offer: Offer) {
        console.log('Create offer', offer)
        const discount = this.discountRepository.findByReference(offer.discount);
        if (discount) {
            const offers = discount.offers.length > 0 ? this.addOrUpdate(discount.offers, offer) : [offer]
            discount.addOffer(offers)
            this.discountRepository.saveOrUpdate(discount)
        }
    }

    private addOrUpdate(offers: Offer[], newOffer: Offer): Offer[] {
        const findIndex = offers.findIndex(offerMemory => offerMemory.reference === newOffer.reference);
        return findIndex >= 0 ? offers.splice(findIndex,1, newOffer) : [...offers, newOffer]
    }
}
