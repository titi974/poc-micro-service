import {Injectable} from '@nestjs/common';
import {CreateCartRequest} from "./messages/CreateCartRequest";
import {CartManager} from "../application/CartManager";
import {MemoryService} from "../infrastructure/memory/memory.service";
import {ApiOfferService} from "../infrastructure/api-offer/api-offer.service";
import {ApiDiscountService} from "../infrastructure/api-discount/api-discount.service";
import {RabbitMqService} from "../infrastructure/rabbit-mq/rabbit-mq.service";

@Injectable()
export class TransacService {
    private readonly cartManager: CartManager

    constructor(private readonly memory: MemoryService, private readonly offerApi: ApiOfferService,
                private readonly discountApi: ApiDiscountService, private readonly rabbitMqService: RabbitMqService) {
        this.cartManager = new CartManager(memory, offerApi, discountApi, rabbitMqService)
    }

    async createCart(cart: CreateCartRequest) {
        await this.cartManager.create(cart);
    }
}
