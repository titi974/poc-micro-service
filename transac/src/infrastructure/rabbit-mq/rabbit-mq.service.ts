import {Inject, Injectable} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import DomainEvent from "../../domain/DomainEvent";
import EventBus from "../../domain/EventBus";

@Injectable()
export class RabbitMqService implements EventBus{
    constructor(@Inject('TRANSAC_QUOTA') private readonly transacQuota: ClientProxy) {
    }

    public async publish(event: DomainEvent): Promise<void> {
        await this.transacQuota.emit('decrease_quota', event).toPromise()
    }
}
