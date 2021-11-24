import Quota from "./Quota";

export default interface QuotaRepository {
    addToUpdate(quota: Quota): void

    getAllQuota(): Quota[]

    deleteAll(): void
}
