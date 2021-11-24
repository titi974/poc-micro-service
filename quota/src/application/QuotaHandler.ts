import QuotaRepository from "../domain/QuotaRepository";
import Quota from "../domain/Quota";

export default class QuotaHandler {
    constructor(private readonly memory: QuotaRepository) {
    }

    create(quota: Quota) {
        this.memory.addToUpdate(quota)
    }

    update(quota: Quota) {
        this.memory.addToUpdate(quota)
    }

    decrease(quota: Quota) {
        const quotaFind = this.memory.getAllQuota().find(memory => memory.reference === quota.reference);
        if(quotaFind){
            quotaFind.valeur -= quota.valeur
        }
    }

}
