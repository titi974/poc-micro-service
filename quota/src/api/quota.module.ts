import {Module} from '@nestjs/common';
import {QuotaController} from './quota.controller';
import {MemoryModule} from "../infrastructure/memory/memory.module";

@Module({
    imports: [MemoryModule],
    controllers: [QuotaController]
})
export class QuotaModule {
}
