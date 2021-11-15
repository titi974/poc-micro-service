import {Module} from '@nestjs/common';
import {DiscountModule} from './api/discount.module';
import {RabbitMqModule} from './infrastructure/rabbit-mq/rabbit-mq.module';
import {MemoryModule} from './infrastructure/memory/memory.module';
import {CoreModule} from './config/core.module';
import {OfferModule} from "./infrastructure/offerHttp/offer.module";

@Module({
    imports: [DiscountModule, RabbitMqModule, MemoryModule, CoreModule, OfferModule],
})
export class AppModule {
}
