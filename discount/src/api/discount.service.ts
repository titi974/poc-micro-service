import {Injectable} from '@nestjs/common';
import {Discount} from "../domain/Discount";
import {DiscountCreateRequest} from "./message/discountCreateRequest";
import {DiscountMemoryService} from "../infrastructure/memory/discount-memory.service";
import DiscountManager from "../application/DiscountManager";
import {OfferService} from "../infrastructure/offerHttp/offer.service";

@Injectable()
export class DiscountService {
    private readonly discountManager: DiscountManager

    constructor(private memory: DiscountMemoryService, private offerService: OfferService) {
        this.discountManager = new DiscountManager(memory, offerService)
    }

    getAll(): Discount[] {
        return this.memory.findAll();
    }

    getByOfferReference(reference: string): Discount {
        return this.memory.findByOfferReference(reference);
    }

    create(discountCreateRequest: DiscountCreateRequest) {
        this.discountManager.create(new Discount(discountCreateRequest.reference, discountCreateRequest.unit, discountCreateRequest.discount))
    }
}
