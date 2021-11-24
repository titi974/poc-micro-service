import {Controller, Inject} from '@nestjs/common';
import {Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";
import DiscountHandler from "../../application/DiscountHandler";
import Offer from "../../domain/Offer";

@Controller('rabbit-mq')
export class RabbitMqController {

    constructor(@Inject('DISCOUNT_HANDLER') private discountHandler: DiscountHandler) {
    }

    @MessagePattern('create_offer')
    public createOffer(@Payload() data: any, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const orginalMessage = context.getMessage();
        console.log('discount recu', data)
        try {
            this.discountHandler.createOffer(new Offer(data.reference, data.price, data.unit, data.discount))
            channel.ack(orginalMessage)
        }catch (e){
            console.log(e)
        }
    }

    @MessagePattern('update_offer')
    public updateOffer(@Payload() data: any, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const orginalMessage = context.getMessage();
        console.log('discount recu', data)
        try {
            this.discountHandler.updateOffer(new Offer(data.reference, data.price, data.unit, data.discount))
            channel.ack(orginalMessage)
        }catch (e){
            console.log(e)
        }
    }
}
