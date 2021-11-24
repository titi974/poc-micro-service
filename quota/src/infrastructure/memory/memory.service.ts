import {Injectable} from '@nestjs/common';
import QuotaRepository from "../../domain/QuotaRepository";
import Quota from "../../domain/Quota";

@Injectable()
export class MemoryService implements QuotaRepository {
    private memories: Quota[] = []

    addToUpdate(quota: Quota): void {
        const quotaFind = this.memories.find(quotaR => quotaR.reference === quota.reference);
        console.log('quotaFind', this.memories)
        if (quotaFind) {
            quotaFind.valeur = quota.valeur
        } else {
            this.memories.push(quota)
        }
        console.log('t', this.memories)
    }

    getAllQuota(): Quota[] {
        console.log(this.memories)
        return this.memories;
    }

    deleteAll() {
        this.memories.length = 0
    }
}
