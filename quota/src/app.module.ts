import {Module} from '@nestjs/common';
import {MemoryModule} from './infrastructure/memory/memory.module';
import {RabbitMqModule} from './infrastructure/rabbit-mq/rabbit-mq.module';
import {CoreModule} from "./config/core.module";
import {QuotaModule} from "./api/quota.module";

@Module({
    imports: [MemoryModule, RabbitMqModule, CoreModule, QuotaModule],
})
export class AppModule {
}
