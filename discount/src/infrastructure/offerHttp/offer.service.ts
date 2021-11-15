import {HttpService, Inject, Injectable} from '@nestjs/common';
import {OfferGateway} from "../../domain/OfferGateway";
import Offer from "../../domain/Offer";

@Injectable()
export class OfferService implements OfferGateway {
    constructor(@Inject('URL_OFFER') public uriOffer: String,
                private readonly httpService: HttpService) {
    }

    async getOfferByDiscountReference(reference: string): Promise<Offer[]> {
        const {data} = await this.httpService.get(`${this.uriOffer}/offers/discounts/${reference}`).toPromise();
        return data.map(message => new Offer(message.reference, message.price, message.unit, message.discount))
    }
}
