import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {configuration} from "./configuration";
import QuotaRepository from "../domain/QuotaRepository";
import {MemoryModule} from "../infrastructure/memory/memory.module";
import {MemoryService} from "../../../offer/src/infrastructure/memory/memory.service";
import QuotaHandler from "../application/QuotaHandler";
import {QuotaFetcher} from "../application/QuotaFetcher";

@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true,
        load: [configuration]
    }), MemoryModule],
    providers: [{
        provide: 'QUOTA_HANDLER',
        useFactory: (repository: QuotaRepository) => {
            return new QuotaHandler(repository)
        },
        inject: [MemoryService]
    }, {
        provide: 'QUOTA_FETCHER',
        useFactory: (repository: QuotaRepository) => {
            return new QuotaFetcher(repository)
        },
        inject: [MemoryService]
    }],
    exports: ['QUOTA_HANDLER', 'QUOTA_FETCHER']
})
export class CoreModule {
}
