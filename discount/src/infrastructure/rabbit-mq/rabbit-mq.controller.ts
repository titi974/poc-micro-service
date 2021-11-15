import {Controller} from '@nestjs/common';
import {Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";
import SynchroManager from "../../application/SynchroManager";
import {DiscountMemoryService} from "../memory/discount-memory.service";
import Offer from "../../domain/Offer";

@Controller('rabbit-mq')
export class RabbitMqController {

    private readonly syncOffer: SynchroManager

    constructor(private memory: DiscountMemoryService) {
        this.syncOffer = new SynchroManager(memory);
    }

    @MessagePattern('create_offer')
    public createOffer(@Payload() data: any, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const orginalMessage = context.getMessage();
        console.log('discount recu', data)
        try {
            this.syncOffer.createOffer(new Offer(data.reference, data.price, data.unit, data.discount))
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
            this.syncOffer.updateOffer(new Offer(data.reference, data.price, data.unit, data.discount))
            channel.ack(orginalMessage)
        }catch (e){
            console.log(e)
        }
    }
}
