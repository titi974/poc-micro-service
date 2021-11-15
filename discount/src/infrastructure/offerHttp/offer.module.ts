import {HttpModule, Module} from '@nestjs/common';
import {OfferService} from './offer.service';
import {ConfigService} from "@nestjs/config";

@Module({
    imports: [HttpModule],
    providers: [OfferService,
        {
            provide: 'URL_OFFER',
            useFactory: (configService: ConfigService) => `http://${configService.get('API_OFFER')}`,
            inject: [ConfigService],
        }],
    exports: [OfferService]
})
export class OfferModule {
}
