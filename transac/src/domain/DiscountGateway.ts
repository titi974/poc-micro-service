import Discount from "./Discount";

export default interface DiscountGateway {
    getDiscountByOfferReference(reference: string): Promise<Discount>
}
