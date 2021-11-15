import {Module} from '@nestjs/common';
import { DiscountMemoryService } from './discount-memory.service';

@Module({
    providers: [DiscountMemoryService],
    exports: [DiscountMemoryService]
})
export class MemoryModule {
}
