import DomainEvent from "./DomainEvent";
import Quota from "../Quota";

export default class OfferUpdateEvent extends DomainEvent {
    constructor(public reference: string, public price: number,
                public unit: string, public discount: string, public quota: Quota) {
        super();
    }
}
