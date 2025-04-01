import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  // Activation de la validation globale
  app.useGlobalPipes(new ValidationPipe());

  // Configuration des assets statiques pour Swagger UI
  app.useStaticAssets({
    root: join(__dirname, '..', 'node_modules', 'swagger-ui-dist'),
    prefix: '/swagger-ui/',
  });

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

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
