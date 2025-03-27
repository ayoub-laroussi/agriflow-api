"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AppController_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const fs = require("fs");
const fastify_1 = require("fastify");
let AppController = AppController_1 = class AppController {
    logger = new common_1.Logger(AppController_1.name);
    serveAuthTestPage(res) {
        const paths = [
            (0, path_1.join)(__dirname, '..', 'public', 'auth-test.html'),
            (0, path_1.join)(__dirname, '..', '..', 'public', 'auth-test.html'),
            (0, path_1.join)(process.cwd(), 'public', 'auth-test.html')
        ];
        this.logger.log(`Tentative de trouver le fichier auth-test.html...`);
        for (const filePath of paths) {
            this.logger.log(`Vérification du chemin: ${filePath}`);
            if (fs.existsSync(filePath)) {
                this.logger.log(`Fichier trouvé à: ${filePath}`);
                const fileContent = fs.readFileSync(filePath, 'utf8');
                res.type('text/html').send(fileContent);
                return;
            }
        }
        this.logger.error(`Fichier auth-test.html non trouvé dans les chemins testés`);
        res.status(404).send({
            message: 'Fichier non trouvé',
            paths: paths
        });
    }
    serveAuthCallbackPage(res) {
        const paths = [
            (0, path_1.join)(__dirname, '..', 'public', 'auth-callback.html'),
            (0, path_1.join)(__dirname, '..', '..', 'public', 'auth-callback.html'),
            (0, path_1.join)(process.cwd(), 'public', 'auth-callback.html')
        ];
        this.logger.log(`Tentative de trouver le fichier auth-callback.html...`);
        for (const filePath of paths) {
            this.logger.log(`Vérification du chemin: ${filePath}`);
            if (fs.existsSync(filePath)) {
                this.logger.log(`Fichier trouvé à: ${filePath}`);
                const fileContent = fs.readFileSync(filePath, 'utf8');
                res.type('text/html').send(fileContent);
                return;
            }
        }
        this.logger.error(`Fichier auth-callback.html non trouvé dans les chemins testés`);
        res.status(404).send({
            message: 'Fichier non trouvé',
            paths: paths
        });
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)('test-auth'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof fastify_1.FastifyReply !== "undefined" && fastify_1.FastifyReply) === "function" ? _a : Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "serveAuthTestPage", null);
__decorate([
    (0, common_1.Get)('auth-callback-page'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof fastify_1.FastifyReply !== "undefined" && fastify_1.FastifyReply) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "serveAuthCallbackPage", null);
exports.AppController = AppController = AppController_1 = __decorate([
    (0, common_1.Controller)()
], AppController);
//# sourceMappingURL=app.controller.js.map