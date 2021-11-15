import DomainEvent from "./event/DomainEvent";

export default interface EventBus {
    publish(event: DomainEvent[]): Promise<void>
}
