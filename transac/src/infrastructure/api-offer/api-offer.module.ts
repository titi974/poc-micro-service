import {HttpModule, Module} from '@nestjs/common';
import {ApiOfferService} from './api-offer.service';
import {ConfigService} from "@nestjs/config";

@Module({
    imports: [HttpModule],
    providers: [
        {
            provide: 'API_OFFER',
            useFactory: (configService: ConfigService) => `http://${configService.get('API_OFFER')}`,
            inject: [ConfigService]
        },
        ApiOfferService
    ],
    exports: [ApiOfferService]
})
export class ApiOfferModule {
}
