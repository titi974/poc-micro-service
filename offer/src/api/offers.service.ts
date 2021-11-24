import {Inject, Injectable} from '@nestjs/common';
import Offer from "../domain/Offer";
import OfferRequest from "./message/OfferRequest";
import OfferManager from "../application/OfferManager";
import OfferQuotasRequest from "./message/OfferQuotasRequest";
import Quota from "../domain/Quota";
import {QuotasManager} from "../application/QuotasManager";
import OfferFetcher from "../application/OfferFetcher";

@Injectable()
export class OffersService {

    constructor(
        @Inject('OFFER_MANAGER') private readonly offerManager: OfferManager,
        @Inject('OFFER_FETCHER') private readonly fetcher: OfferFetcher,
        @Inject('QUOTA_MANAGER') private readonly quotaManager: QuotasManager,
        ) {
    }

    public async createOffer(offerRequest: OfferRequest): Promise<void> {
        let quota
        if (offerRequest.quota) {
            quota = new Quota(offerRequest.quota.reference, offerRequest.quota.valeur);
        }
        const offer = new Offer(offerRequest.reference, offerRequest.price, offerRequest.unit, offerRequest.discount, quota);
        await this.offerManager.create(offer);
    }

    public async updateOffer(offerRequest: OfferRequest): Promise<void> {
        let quota
        if (offerRequest.quota) {
            quota = new Quota(offerRequest.quota.reference, offerRequest.quota.valeur);
        }
        const offer = new Offer(offerRequest.reference, offerRequest.price, offerRequest.unit, offerRequest.discount, quota);
        await this.offerManager.update(offer);
    }

    public async updateQuotasOffer(offerQuotasRequest: OfferQuotasRequest): Promise<void> {
        await this.quotaManager.update(offerQuotasRequest.offerReference, new Quota(offerQuotasRequest.quotaReference, offerQuotasRequest.quantite));
    }

    async getOfferByReference(reference: string): Promise<Offer[]> {
        const offers = await this.fetcher.getAll();
        return offers.filter(offer => offer.reference === reference);
    }

    async getOfferByDiscountReference(reference: string): Promise<Offer[]> {
        const offers = await this.fetcher.getAll();
        return offers.filter(offer => offer.discount === reference);
    }

    async getOffers(): Promise<Offer[]> {
        return this.fetcher.getAll();
    }

    async delete(): Promise<void> {
        return this.offerManager.deleteAll();
    }
}
