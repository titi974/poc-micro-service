import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {configuration} from "./configuration";

@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true,
        load: [configuration]
    })],
    providers: []
})
export class CoreModule {
}
