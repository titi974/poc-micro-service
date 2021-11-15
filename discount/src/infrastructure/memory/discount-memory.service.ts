import { Injectable } from '@nestjs/common';
import DiscountRepository from "../../domain/DiscountRepository";
import {Discount} from "../../domain/Discount";

@Injectable()
export class DiscountMemoryService implements DiscountRepository{

    private readonly memories: Discount[] = []

    findAll(): Discount[] {
        return this.memories;
    }

    findByReference(reference: string): Discount {
        return this.memories.find(discount => discount.reference === reference);
    }

    findByOfferReference(reference: string): Discount {
        return this.memories.find(discount => discount.offers.find(offer => offer.reference === reference));
    }

    saveOrUpdate(discount: Discount): void {
        const findIndex = this.memories.findIndex(discountMemory => discountMemory.reference === discount.reference);
        findIndex >= 0 ? this.memories.splice(findIndex,1, discount) : this.memories.push(discount)
    }

    delete() {
        this.memories.length = 0
    }
}
