import {Offer} from "./Offer";
import Discount from "./Discount";

export class LineItem {
    constructor(public readonly offer: Offer,public readonly discount: Discount, public readonly quantite: number) {
    }
}
