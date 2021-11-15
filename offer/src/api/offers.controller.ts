import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import OfferRequest from "./message/OfferRequest";
import {OffersService} from "./offers.service";
import OfferQuotasRequest from "./message/OfferQuotasRequest";
import Offer from "../domain/Offer";
import {MemoryService} from "../infrastructure/memory/memory.service"


@Controller('offers')
export class OffersController {
    constructor(private readonly offerService: OffersService, private readonly memory: MemoryService) {
    }

    @Get('/:reference')
    getOffer(@Param('reference') reference: string): Offer[] {
        console.log('Get Offer ',reference)
        return this.offerService.getOfferByReference(reference)
    }

    @Get('/discounts/:reference')
    getOfferByDiscount(@Param('reference') reference: string): Offer[] {
        return this.offerService.getOfferByDiscountReference(reference)
    }

    @Get()
    getOffers(): Offer[] {
        return this.memory.findAll()
    }

    @Post()
    async createOffer(@Body() offerRequest: OfferRequest) {
        await this.offerService.createOffer(offerRequest)
    }

    @Put("/quotas")
    changeQuotasOffer(@Body() offerQuotasRequest: OfferQuotasRequest) {
        this.offerService.updateQuotasOffer(offerQuotasRequest)
    }

    @Put()
    updateOffer(@Body() offerRequest: OfferRequest) {
        this.offerService.updateOffer(offerRequest)
    }

    @Delete()
    reset() {
        this.memory.delete()
    }
}
