import {Module} from '@nestjs/common';
import {TransacController} from "./transac.controller";
import {TransacService} from "./transac.service";
import {MemoryModule} from "../infrastructure/memory/memory.module";
import {ApiOfferModule} from "../infrastructure/api-offer/api-offer.module";
import {ApiDiscountModule} from "../infrastructure/api-discount/api-discount.module";
import {RabbitMqModule} from "../infrastructure/rabbit-mq/rabbit-mq.module";

@Module({
    imports: [MemoryModule, ApiOfferModule, ApiDiscountModule, RabbitMqModule],
    controllers: [TransacController],
    providers: [TransacService]
})
export class TransacModule {
}
