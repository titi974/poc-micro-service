import DomainEvent from "../DomainEvent";

export default class QuotaEvent extends DomainEvent{
    constructor(public reference: string, public quantite: number) {
        super();
    }
}
