import { Module } from '@nestjs/common';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';
import {CoreModule} from "../config/core.module";

@Module({
  imports: [CoreModule],
  controllers: [OffersController],
  providers: [OffersService]
})
export class OffersModule {}
