import DomainEvent from "./DomainEvent";

export default class QuotaUpdatesEvent extends DomainEvent {
    constructor(public reference: string, public valeur: number) {
        super();
    }
}
