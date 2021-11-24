import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {configuration} from "./configuration";
import DiscountManager from "../application/DiscountManager";
import DiscountRepository from "../domain/DiscountRepository";
import DiscountHandler from "../application/DiscountHandler";
import {MemoryModule} from "../infrastructure/memory/memory.module";
import {DiscountMemoryService} from "../infrastructure/memory/discount-memory.service";
import {OfferGateway} from "../domain/OfferGateway";
import {OfferModule} from "../infrastructure/offerHttp/offer.module";
import {OfferService} from "../infrastructure/offerHttp/offer.service";

@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true,
        load: [configuration]
    }), MemoryModule, OfferModule],
    providers: [{
        provide: 'DISCOUNT_MANAGER',
        useFactory: (repository: DiscountRepository, offerGateway: OfferGateway) => {
            return new DiscountManager(repository, offerGateway)
        },
        inject: [DiscountMemoryService, OfferService]
    }, {
        provide: 'DISCOUNT_HANDLER',
        useFactory: (repository: DiscountRepository) => {
            return new DiscountHandler(repository)
        },
        inject: [DiscountMemoryService]
    }],
    exports: ['DISCOUNT_MANAGER', 'DISCOUNT_HANDLER']
})
export class CoreModule {
}
