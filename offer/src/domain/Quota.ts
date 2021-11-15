export default class Quota {
    constructor(public reference: string, public quantite: number) {
    }

    update(quantite: number) {
        this.quantite = quantite
    }
}
