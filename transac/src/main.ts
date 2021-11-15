import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService)
  console.log('config ', config)
  const port = config.get('PORT') || 3004
  await app.listen(port,() => {
    console.log('port ', port)
  });
}
bootstrap();
