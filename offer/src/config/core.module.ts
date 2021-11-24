import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {configuration} from "./configuration";
import OfferManager from "../application/OfferManager";
import EventBus from "../domain/EventBus";
import OfferRepository from "../domain/OfferRepository";
import {MemoryModule} from "../infrastructure/memory/memory.module";
import {RabbitMqModule} from "../infrastructure/rabbit-mq/rabbit-mq.module";
import {MemoryService} from "../infrastructure/memory/memory.service";
import {RabbitMqService} from "../infrastructure/rabbit-mq/rabbit-mq.service";
import OfferFetcher from "../application/OfferFetcher";
import {QuotasManager} from "../application/QuotasManager";

@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true,
        load: [configuration]
    }),
        MemoryModule, RabbitMqModule
    ],
    providers: [{
        provide: 'OFFER_MANAGER',
        useFactory: (repository: OfferRepository, bus: EventBus) => {
            console.log(repository)
            return new OfferManager(repository, bus)
        },
        inject: [MemoryService, RabbitMqService]
    }, {
        provide: 'OFFER_FETCHER',
        useFactory: (repository: OfferRepository) => {
            return new OfferFetcher(repository)
        },
        inject: [MemoryService]
    },{
        provide: 'QUOTA_MANAGER',
        useFactory:(repository: OfferRepository, bus: EventBus) => {
            return new QuotasManager(repository, bus)
        },
        inject: [MemoryService, RabbitMqService]
    }],
    exports: ['OFFER_MANAGER', 'OFFER_FETCHER', 'QUOTA_MANAGER']
})
export class CoreModule {
}
