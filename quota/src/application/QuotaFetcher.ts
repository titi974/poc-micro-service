import Quota from "../domain/Quota";
import QuotaRepository from "../domain/QuotaRepository";

export class QuotaFetcher {

    constructor(private readonly quotas: QuotaRepository) {
    }

    getAllQuota(): Quota[] {
        return this.quotas.getAllQuota()
    }

    deleteAll(): void {
        return this.quotas.deleteAll()
    }
}
