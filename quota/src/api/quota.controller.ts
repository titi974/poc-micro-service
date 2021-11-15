import {Controller, Delete, Get} from '@nestjs/common';
import Quota from "../domain/Quota";
import {MemoryService} from "../infrastructure/memory/memory.service";

@Controller('quotas')
export class QuotaController {

    constructor(private readonly memory: MemoryService) {
    }
    @Get()
    getAll(): Quota[] {
        return this.memory.getAllQuota()
    }
    @Delete()
    delete() {
        return this.memory.delete()
    }
}
