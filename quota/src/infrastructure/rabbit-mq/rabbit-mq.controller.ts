import {Controller, Inject} from '@nestjs/common';
import {Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";
import QuotaHandler from "../../application/QuotaHandler";
import Quota from "../../domain/Quota";

@Controller('rabbit-mq')
export class RabbitMqController {

    constructor(@Inject('QUOTA_HANDLER') private readonly handler: QuotaHandler) {
    }

    @MessagePattern('create_quota')
    getCreateQuotaNotifications(@Payload() data: any, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const orginalMessage = context.getMessage();
        this.handler.create(data)
        channel.ack(orginalMessage);
    }

    @MessagePattern('update_quota')
    getUpdateQuotaNotifications(@Payload() data: any, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const orginalMessage = context.getMessage();
        this.handler.create(data)
        channel.ack(orginalMessage);
    }

    @MessagePattern('decrease_quota')
    getDecreaseQuota(@Payload() data: any, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const orginalMessage = context.getMessage();
        this.handler.decrease(new Quota(data.reference, '', data.quantite))
        channel.ack(orginalMessage);
    }
}
