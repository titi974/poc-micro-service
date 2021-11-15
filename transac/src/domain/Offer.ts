import Quota from "./Quota";

export class Offer {
    constructor(public reference: string, public price: number,
                public unit: string, public quota: Quota) {
    }
}
