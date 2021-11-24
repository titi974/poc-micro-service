import {Injectable} from '@nestjs/common';
import {RabbitMqService} from "../infrastructure/rabbit-mq/rabbit-mq.service";
import Offer from "../domain/Offer";
import OfferRequest from "./message/OfferRequest";
import OfferManager from "../application/OfferManager";
import OfferQuotasRequest from "./message/OfferQuotasRequest";
import Quota from "../domain/Quota";
import {QuotasManager} from "../application/QuotasManager";
import {MemoryService} from "../infrastructure/memory/memory.service";

@Injectable()
export class OffersService {
    private offerManager: OfferManager
    private quotasManager: QuotasManager

    constructor(private readonly memory: MemoryService, private readonly sendMessage: RabbitMqService) {
        this.offerManager = new OfferManager(memory, sendMessage);
        this.quotasManager = new QuotasManager(memory, sendMessage);
    }

    public async createOffer(offerRequest: OfferRequest): Promise<void> {
        let quota
        if (offerRequest.quota) {
            quota = new Quota(offerRequest.quota.reference, offerRequest.quota.valeur);
        }
        const offer = new Offer(offerRequest.reference, offerRequest.price, offerRequest.unit, offerRequest.discount, quota);
        await this.offerManager.create(offer);
    }

    public async updateOffer(offerRequest: OfferRequest) {
        let quota
        if (offerRequest.quota) {
            quota = new Quota(offerRequest.quota.reference, offerRequest.quota.valeur);
        }
        const offer = new Offer(offerRequest.reference, offerRequest.price, offerRequest.unit, offerRequest.discount, quota);
        await this.offerManager.update(offer);
    }

    public async updateQuotasOffer(offerQuotasRequest: OfferQuotasRequest): Promise<void> {
        await this.quotasManager.update(offerQuotasRequest.offerReference, new Quota(offerQuotasRequest.quotaReference, offerQuotasRequest.quantite));
    }

    getOfferByReference(reference: string): Offer[] {
        console.log(this.memory)
        return this.memory.findAll().filter(offer => offer.reference === reference);
    }

    getOfferByDiscountReference(reference: string): Offer[] {
        console.log(this.memory)
        return this.memory.findAll().filter(offer => offer.discount === reference);
    }
}
