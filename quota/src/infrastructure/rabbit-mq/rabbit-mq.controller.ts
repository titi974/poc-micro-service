import {Controller} from '@nestjs/common';
import {Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";
import SyncManager from "../../application/SyncManager";
import {MemoryService} from "../memory/memory.service";
import Quota from "../../domain/Quota";

@Controller('rabbit-mq')
export class RabbitMqController {

    private readonly syncQuota: SyncManager

    constructor(private readonly memory: MemoryService) {
        this.syncQuota = new SyncManager(memory);
    }

    @MessagePattern('create_quota')
    getCreateQuotaNotifications(@Payload() data: any, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const orginalMessage = context.getMessage();
        channel.ack(orginalMessage);
        this.syncQuota.create(data)
    }

    @MessagePattern('update_quota')
    getUpdateQuotaNotifications(@Payload() data: any, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const orginalMessage = context.getMessage();
        channel.ack(orginalMessage);
        this.syncQuota.create(data)
    }

    @MessagePattern('decrease_quota')
    getDecreaseQuota(@Payload() data: any, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const orginalMessage = context.getMessage();
        this.syncQuota.decrease(new Quota(data.reference, '', data.quantite))
        channel.ack(orginalMessage);
    }
}
