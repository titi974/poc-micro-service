import {HttpModule, Module} from '@nestjs/common';
import {ApiDiscountService} from './api-discount.service';
import {ConfigService} from "@nestjs/config";

@Module({
    imports: [HttpModule],
    providers: [
        {
            provide: 'API_DISCOUNT',
            useFactory: (configService: ConfigService) => `http://${configService.get('API_DISCOUNT')}`,
            inject: [ConfigService]
        },
        ApiDiscountService],
    exports: [ApiDiscountService]
})
export class ApiDiscountModule {
}
