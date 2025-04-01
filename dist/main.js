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
        .setDescription('API de gestion des exploitations agricoles')
        .setVersion('1.0')
        .addTag('terrain', 'Gestion des terrains')
        .addTag('espace-culture', 'Gestion des espaces de culture')
        .addTag('planche', 'Gestion des planches')
        .addTag('culture', 'Gestion des cultures')
        .addTag('action-agricole', 'Gestion des actions agricoles')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map