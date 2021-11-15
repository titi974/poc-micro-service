import {Module} from '@nestjs/common';
import {ClientProxyFactory, Transport} from "@nestjs/microservices";
import {ConfigService} from "@nestjs/config";
import {RabbitMqService} from './rabbit-mq.service';

@Module({
    providers: [
        {
            provide: 'TRANSAC_QUOTA',
            useFactory: (configService: ConfigService) => {
                const rabbitConfig = configService.get('RABBIT');
                return ClientProxyFactory.create({
                    transport: Transport.RMQ,
                    options: {
                        urls: [`amqp://${rabbitConfig.user}:${rabbitConfig.password}@${rabbitConfig.url}/${rabbitConfig.host}`],
                        queue: 'transac',
                        queueOptions: {
                            durable: false
                        },
                    },
                });
            },
            inject: [ConfigService],
        },
        RabbitMqService
    ],
    exports: [RabbitMqService]
})
export class RabbitMqModule {
}
