import {Discount} from "./Discount";

export default interface DiscountRepository {
    saveOrUpdate(discount: Discount): void;
    findByReference(reference: string): Discount
    findAll(): Discount[]
}
