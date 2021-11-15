import {Cart} from "./Cart";

export interface TransacRepository {
    save(cart: Cart): void
    findByReference(id: string): Cart
    findAll(): Cart[]
}
