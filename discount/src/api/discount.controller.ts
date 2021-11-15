import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {DiscountService} from "./discount.service";
import {Discount} from "../domain/Discount";
import {DiscountCreateRequest} from "./message/discountCreateRequest";
import {DiscountMemoryService} from "../infrastructure/memory/discount-memory.service";

@Controller('discounts')
export class DiscountController {
    constructor(private readonly discountService: DiscountService, private readonly memory: DiscountMemoryService) {
    }

    @Get()
    public getDiscount(): Discount[] {
        return this.discountService.getAll().map(discount => {
            return new Discount(discount.reference, discount.unit, 0, discount.offers)
        })
    }

    @Post()
    public createDiscount(@Body() discountCreateRequest: DiscountCreateRequest): void {
        this.discountService.create(discountCreateRequest)
    }

    @Get('/offers/:reference')
    public getDiscountByOfferReference(@Param('reference') reference: string): Discount {
        return this.discountService.getByOfferReference(reference)
    }

    @Delete()
    public delete(){
        this.memory.delete()
    }
}
