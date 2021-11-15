import Quota from "./Quota";

export default class Offer {
    constructor(public reference: string, public price: number,
                public unit: string, public discount?: string,
                public quota?: Quota) {
    }

    addQuota(quota: Quota) {
        this.quota = quota
    }

    updateQuota(quantite: number) {
        this.quota.update(quantite)
    }
}
