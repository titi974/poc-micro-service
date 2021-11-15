import {QuotaRequest} from "./QuotaRequest";

export default interface OfferRequest {
    reference: string
    price: number
    unit: string
    discount?: string
    quota?: QuotaRequest
}
