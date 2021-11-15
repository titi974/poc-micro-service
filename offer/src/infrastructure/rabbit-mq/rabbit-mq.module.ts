import {Module} from '@nestjs/common';
import {RabbitMqService} from './rabbit-mq.service';
import {ClientProxyFactory, Transport} from "@nestjs/microservices";
import {ConfigService} from "@nestjs/config";

@Module({
    providers: [{
        provide: 'OFFER_DISCOUNT',
        useFactory: (configService: ConfigService) => {
            const rabbitConfig = configService.get('RABBIT');
            console.log(rabbitConfig.url)
            return ClientProxyFactory.create({
                transport: Transport.RMQ,
                options: {
                    urls: [`amqp://${rabbitConfig.user}:${rabbitConfig.password}@${rabbitConfig.url}/${rabbitConfig.host}`],
                    queue: 'discount',
                    queueOptions: {
                        durable: false
                    },
                },
            });
        },
        inject: [ConfigService],
    },
        {
            provide: 'OFFER_QUOTA',
            useFactory: (configService: ConfigService) => {
                const rabbitConfig = configService.get('RABBIT');
                return ClientProxyFactory.create({
                    transport: Transport.RMQ,
                    options: {
                        urls: [`amqp://${rabbitConfig.user}:${rabbitConfig.password}@${rabbitConfig.url}/${rabbitConfig.host}`],
                        queue: 'quota',
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
