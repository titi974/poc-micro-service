import {LineItem} from "./LineItem";

export class Cart {
    constructor(public readonly id, public readonly lineItems: LineItem[]) {
    }
}
