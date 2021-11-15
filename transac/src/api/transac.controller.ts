import {Body, Controller, Post} from '@nestjs/common';
import {CreateCartRequest} from "./messages/CreateCartRequest";
import {TransacService} from "./transac.service";

@Controller('transac')
export class TransacController {

    constructor(private readonly transacService: TransacService) {
    }

    @Post()
    async createCart(@Body() cartRequest: CreateCartRequest): Promise<void> {
        await this.transacService.createCart(cartRequest)
    }
}
