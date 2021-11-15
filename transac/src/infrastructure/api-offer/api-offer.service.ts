import {HttpService, Inject, Injectable} from '@nestjs/common';
import {OfferGateway} from "../../domain/OfferGateway";
import {Offer} from "../../domain/Offer";
import Quota from "../../domain/Quota";

@Injectable()
export class ApiOfferService implements OfferGateway {
    constructor(@Inject('API_OFFER') private readonly urlOffer: string, private readonly httpService: HttpService) {
    }

    async getOffer(reference: string): Promise<Offer> {
        const {data} = await this.httpService.get(`${this.urlOffer}/offers/${reference}`).toPromise();
        return new Offer(data[0].reference, data[0].price, data[0].unit, new Quota(data[0].quota.reference))
    }
}
