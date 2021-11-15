import DomainEvent from "./DomainEvent";

export default class QuotaCreatedEvent extends DomainEvent {
    constructor(public reference: string, public valeur: number) {
        super();
    }
}
