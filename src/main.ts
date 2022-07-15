import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true, //Ignora los valores que no estan en el dto
    forbidNonWhitelisted: true, //Saca error si le mando valores de mas,
    transformOptions: {
      enableImplicitConversion: true
    }
  }));

  await app.listen(AppModule.port);
}
bootstrap();
