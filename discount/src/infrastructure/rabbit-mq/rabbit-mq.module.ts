import { Module } from '@nestjs/common';
import { RabbitMqController } from './rabbit-mq.controller';
import {CoreModule} from "../../config/core.module";

@Module({
  imports:[CoreModule],
  controllers: [RabbitMqController]
})
export class RabbitMqModule {}
