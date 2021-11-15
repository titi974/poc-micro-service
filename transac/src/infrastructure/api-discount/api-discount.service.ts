import {HttpService, Inject, Injectable} from '@nestjs/common';
import DiscountGateway from "../../domain/DiscountGateway";
import Discount from "../../domain/Discount";

@Injectable()
export class ApiDiscountService implements DiscountGateway {
    constructor(@Inject('API_DISCOUNT') private readonly url: string,
                private readonly httpService: HttpService) {
    }

    async getDiscountByOfferReference(reference: string): Promise<Discount | null> {
        try {
            const {data} = await this.httpService.get(`${this.url}/discounts/offers/${reference}`).toPromise();
            return new Discount(data.reference, data.unit, data.discount)
        } catch (e) {
            console.log(e)
            return null
        }
    }
}
