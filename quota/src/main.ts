import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Transport} from "@nestjs/microservices";
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get(ConfigService)
    const rabbitConfig = config.get('RABBIT')
    console.log('amqp ', `amqp://${rabbitConfig.user}:${rabbitConfig.password}@${rabbitConfig.url}/${rabbitConfig.host}`)
    app.connectMicroservice({
        transport: Transport.RMQ,
        options: {
            urls: [`amqp://${rabbitConfig.user}:${rabbitConfig.password}@${rabbitConfig.url}/${rabbitConfig.host}`],
            queue: 'quota',
            noAck: false,
            prefetchCount: 1,
            queueOptions: {
                durable: false
            },
        },
    });
    app.connectMicroservice({
        transport: Transport.RMQ,
        options: {
            urls: [`amqp://${rabbitConfig.user}:${rabbitConfig.password}@${rabbitConfig.url}/${rabbitConfig.host}`],
            queue: 'transac',
            noAck: false,
            prefetchCount: 1,
            queueOptions: {
                durable: false
            },
        },
    });
    console.log('config ', config)
    await app.startAllMicroservicesAsync();
    const port = config.get('PORT') || 3003
    await app.listen(port,() => {
        console.log('port ', port)
    });
}

bootstrap();
