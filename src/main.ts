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

  // Activation du CORS
  app.enableCors();

  // Activation de la validation globale
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

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
      
      ## Authentification
      
      L'API utilise l'authentification JWT (JSON Web Token) pour sécuriser les endpoints.
      Pour accéder aux endpoints protégés, vous devez d'abord vous authentifier via '/auth/login'
      et utiliser le token reçu dans l'en-tête Authorization (Bearer Token).
      
      ## Format de réponse standard
      
      Toutes les réponses suivent un format standardisé:
      \`\`\`json
      {
        "message": "Description du résultat",
        "data": {...},
        "statusCode": 200
      }
      \`\`\`
      
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
      
      ### Observations et actions agricoles
      Permet d'enregistrer des observations météorologiques et des actions agricoles liées aux cultures.
      
      ### Système de notification
      Gestion des notifications pour les alertes météo, les rappels de tâches et les événements liés aux cultures.
    `)
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Entrez votre token JWT',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      docExpansion: 'none',
    },
  });

  // Démarrage du serveur
  const port = process.env.PORT ?? 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`Application démarrée sur: http://localhost:${port}/api`);
}
bootstrap();
