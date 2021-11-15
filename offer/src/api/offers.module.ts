import { Module } from '@nestjs/common';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';
import {RabbitMqModule} from "../infrastructure/rabbit-mq/rabbit-mq.module";
import {MemoryModule} from "../infrastructure/memory/memory.module";

@Module({
  imports: [RabbitMqModule, MemoryModule],
  controllers: [OffersController],
  providers: [OffersService]
})
export class OffersModule {}
