import {Module} from '@nestjs/common';
import {QuotaController} from './quota.controller';
import {MemoryModule} from "../infrastructure/memory/memory.module";
import {CoreModule} from "../config/core.module";

@Module({
    imports: [MemoryModule, CoreModule],
    controllers: [QuotaController]
})
export class QuotaModule {
}
