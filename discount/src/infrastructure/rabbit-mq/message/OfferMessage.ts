export default class OfferMessage {
    constructor(public reference: string,
                public price: number,
                public unit: string,
                public discount: string) {
    }
}
