import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import OfferRequest from "./message/OfferRequest";
import {OffersService} from "./offers.service";
import OfferQuotasRequest from "./message/OfferQuotasRequest";
import Offer from "../domain/Offer";

@Controller('offers')
export class OffersController {

    constructor(private readonly offerService: OffersService) {
    }

    @Get('/:reference')
    async getOffer(@Param('reference') reference: string): Promise<Offer[]> {
        console.log('Get Offer ',reference)
        return this.offerService.getOfferByReference(reference)
    }

    @Get('/discounts/:reference')
    async getOfferByDiscount(@Param('reference') reference: string): Promise<Offer[]> {
        return this.offerService.getOfferByDiscountReference(reference)
    }

    @Get()
    async getOffers(): Promise<Offer[]> {
        return this.offerService.getOffers()
    }

    @Post()
    async createOffer(@Body() offerRequest: OfferRequest): Promise<void> {
        await this.offerService.createOffer(offerRequest)
    }

    @Put("/quotas")
    async changeQuotasOffer(@Body() offerQuotasRequest: OfferQuotasRequest): Promise<void> {
        await this.offerService.updateQuotasOffer(offerQuotasRequest)
    }

    @Put()
    async updateOffer(@Body() offerRequest: OfferRequest): Promise<void> {
        await this.offerService.updateOffer(offerRequest)
    }

    @Delete()
    async reset(): Promise<void> {
        await this.offerService.delete()
    }
}
