import DomainEvent from "../DomainEvent";

export class LineItemEvent extends DomainEvent {
    constructor(public offerReference: string, public readonly quantite: string) {
        super();
    }
}
