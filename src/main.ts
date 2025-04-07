/**
 * Point d'entrée principal de l'application AgriFlow API
 * 
 * Ce fichier initialise l'application NestJS, configure Swagger pour la documentation de l'API,
 * et met en place les différents middlewares et intercepteurs globaux.
 * 
 * @module main
 */
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { join } from 'path';

/**
 * Fonction de démarrage de l'application
 * 
 * Initialise l'application NestJS avec Fastify comme adaptateur HTTP,
 * configure les validations globales, la documentation Swagger et démarre le serveur.
 * 
 * @returns {Promise<void>}
 */
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
    .setDescription(`
      API de gestion des exploitations agricoles permettant la gestion des terrains, 
      des espaces de culture, des planches de culture et des cultures.
      
      ## Fonctionnalités principales
      
      ### Gestion des terrains
      Permet de créer, consulter, modifier et supprimer des terrains.
      
      ### Gestion des espaces de culture
      Permet de gérer les différents espaces de culture au sein d'un terrain (rizière, champ, verger, potager).
      
      ### Gestion des planches de culture
      Permet de définir des planches de culture à l'intérieur d'un espace de culture,
      avec leurs caractéristiques (dimensions, type de sol, pH, etc.) et les cultures qui y sont associées.
      
      ### Gestion des cultures
      Permet de suivre les différentes cultures, leurs périodes de plantation, leurs statuts et autres informations.
    `)
    .setVersion('1.0')
    .addTag('lands', 'Gestion des terrains')
    .addTag('cultivation-spaces', 'Gestion des espaces de culture')
    .addTag('cultivation-beds', 'Gestion des planches de culture')
    .addTag('crops', 'Gestion des cultures')
    .addTag('roles', 'Gestion des rôles utilisateurs')
    .addTag('users', 'Gestion des utilisateurs')
    .addTag('soilcover', 'Gestion des couvertures de sol')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
