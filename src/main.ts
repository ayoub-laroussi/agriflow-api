import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activation de la validation globale
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('AgriFlow API')
    .setDescription('API de gestion des exploitations agricoles')
    .setVersion('1.0')
    .addTag('terrain', 'Gestion des terrains')
    .addTag('espace-culture', 'Gestion des espaces de culture')
    .addTag('planche', 'Gestion des planches')
    .addTag('culture', 'Gestion des cultures')
    .addTag('action-agricole', 'Gestion des actions agricoles')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
