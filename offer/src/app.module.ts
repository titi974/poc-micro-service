import {Module} from '@nestjs/common';
import {OffersModule} from './api/offers.module';
import {RabbitMqModule} from './infrastructure/rabbit-mq/rabbit-mq.module';
import {MemoryModule} from "./infrastructure/memory/memory.module";
import {CoreModule} from "./config/core.module";


@Module({
    imports: [OffersModule, RabbitMqModule, MemoryModule, CoreModule],
})
export class AppModule {
}
