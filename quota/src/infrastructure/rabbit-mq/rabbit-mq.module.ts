import {Module} from '@nestjs/common';
import {RabbitMqController} from './rabbit-mq.controller';
import {MemoryModule} from "../memory/memory.module";
import {CoreModule} from "../../config/core.module";

@Module({
    imports: [MemoryModule, CoreModule],
    controllers: [RabbitMqController]
})
export class RabbitMqModule {
}
