import {Inject, Injectable} from '@nestjs/common';
import {CreateCartRequest} from "./messages/CreateCartRequest";
import {CartManager} from "../application/CartManager";

@Injectable()
export class TransacService {

    constructor(@Inject('CART_MANAGER') private readonly cartManager: CartManager) {
    }

    async createCart(cart: CreateCartRequest) {
        await this.cartManager.create(cart);
    }
}
