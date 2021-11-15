import DomainEvent from "./DomainEvent";


export default interface EventBus {
    publish(event: DomainEvent): Promise<void>
}
