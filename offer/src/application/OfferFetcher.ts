import OfferRepository from "../domain/OfferRepository";
import Offer from "../domain/Offer";

export default class OfferFetcher {
    constructor(private readonly memory: OfferRepository) {
    }

    async getAll(): Promise<Offer[]> {
        return Promise.resolve(this.memory.findAll())
    }
}
