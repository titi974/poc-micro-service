import { Module } from '@nestjs/common';
import { RabbitMqController } from './rabbit-mq.controller';
import {MemoryModule} from "../memory/memory.module";

@Module({
  imports:[MemoryModule],
  controllers: [RabbitMqController]
})
export class RabbitMqModule {}
