import { Module } from '@nestjs/common';
import { DiscountController } from './discount.controller';
import {MemoryModule} from "../infrastructure/memory/memory.module";
import { DiscountService } from './discount.service';
import {OfferModule} from "../infrastructure/offerHttp/offer.module";

@Module({
  imports: [MemoryModule, OfferModule],
  controllers: [DiscountController],
  providers: [DiscountService]
})
export class DiscountModule {}
