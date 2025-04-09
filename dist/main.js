"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useStaticAssets({
        root: (0, path_1.join)(__dirname, '..', 'node_modules', 'swagger-ui-dist'),
        prefix: '/swagger-ui/',
    });
    const config = new swagger_1.DocumentBuilder()
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
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map