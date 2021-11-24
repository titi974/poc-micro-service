import {Controller, Delete, Get, Inject} from '@nestjs/common';
import Quota from "../domain/Quota";
import {QuotaFetcher} from "../application/QuotaFetcher";

@Controller('quotas')
export class QuotaController {

    constructor(@Inject('QUOTA_FETCHER') private readonly fetcher: QuotaFetcher) {
    }
    @Get()
    getAll(): Quota[] {
        return this.fetcher.getAllQuota()
    }
    @Delete()
    delete() {
        return this.fetcher.deleteAll()
    }
}
