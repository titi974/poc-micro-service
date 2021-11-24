import {Module} from '@nestjs/common';
import {TransacController} from "./transac.controller";
import {TransacService} from "./transac.service";
import {CoreModule} from "../config/core.module";

@Module({
    imports: [CoreModule],
    controllers: [TransacController],
    providers: [TransacService]
})
export class TransacModule {
}
