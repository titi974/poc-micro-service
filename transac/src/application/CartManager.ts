import {CreateCartRequest} from "../api/messages/CreateCartRequest";
import {TransacRepository} from "../domain/TransacRepository";
import {Cart} from "../domain/Cart";
import {OfferGateway} from "../domain/OfferGateway";
import {Offer} from "../domain/Offer";
import {LineItem} from "../domain/LineItem";
import DiscountGateway from "../domain/DiscountGateway";
import Discount from "../domain/Discount";
import EventBus from "../domain/EventBus";
import QuotaEvent from "../domain/event/QuotaEvent";

export class CartManager {
    constructor(private readonly transacRepository: TransacRepository, private readonly offerRepository: OfferGateway,
                private readonly discountRepository: DiscountGateway, private readonly eventBus: EventBus) {
    }

    async create(cartRequest: CreateCartRequest): Promise<void> {
        const offer: Offer | null = await this.offerRepository.getOffer(cartRequest.lineItem.offerReference);
        if (offer) {
            const discount: Discount = await this.discountRepository.getDiscountByOfferReference(cartRequest.lineItem.offerReference);
            const lineItem = new LineItem(offer, discount, cartRequest.lineItem.quantite);
            this.transacRepository.save(new Cart('1', [lineItem]))
            this.eventBus.publish(new QuotaEvent(offer.quota.reference, lineItem.quantite))
        }
    }
}
