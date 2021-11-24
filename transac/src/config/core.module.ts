import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {configuration} from "./configuration";
import {MemoryModule} from "../infrastructure/memory/memory.module";
import {MemoryService} from "../infrastructure/memory/memory.service";
import {TransacRepository} from "../domain/TransacRepository";
import {CartManager} from "../application/CartManager";
import {OfferGateway} from "../domain/OfferGateway";
import DiscountGateway from "../domain/DiscountGateway";
import EventBus from "../domain/EventBus";
import {ApiOfferModule} from "../infrastructure/api-offer/api-offer.module";
import {ApiDiscountModule} from "../infrastructure/api-discount/api-discount.module";
import {ApiOfferService} from "../infrastructure/api-offer/api-offer.service";
import {ApiDiscountService} from "../infrastructure/api-discount/api-discount.service";
import {RabbitMqModule} from "../infrastructure/rabbit-mq/rabbit-mq.module";
import {RabbitMqService} from "../infrastructure/rabbit-mq/rabbit-mq.service";

@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true,
        load: [configuration]
    }), MemoryModule, ApiOfferModule, ApiDiscountModule, RabbitMqModule],
    providers: [{
        provide: 'CART_MANAGER',
        useFactory: (repository: TransacRepository, offerGateway: OfferGateway, discountRepository: DiscountGateway, eventBus: EventBus) => {
            return new CartManager(repository, offerGateway, discountRepository, eventBus)
        },
        inject: [MemoryService, ApiOfferService, ApiDiscountService, RabbitMqService]
    }],
    exports: ['CART_MANAGER']
})
export class CoreModule {
}
