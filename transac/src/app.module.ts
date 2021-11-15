import {Module} from '@nestjs/common';
import {TransacModule} from './api/transac.module';
import {CoreModule} from "./config/core.module";
import { RabbitMqModule } from './infrastructure/rabbit-mq/rabbit-mq.module';

@Module({
    imports: [TransacModule, CoreModule, RabbitMqModule],
})
export class AppModule {
}
