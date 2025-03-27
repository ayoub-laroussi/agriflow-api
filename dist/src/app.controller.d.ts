import { FastifyReply } from 'fastify';
export declare class AppController {
    private readonly logger;
    serveAuthTestPage(res: FastifyReply): void;
    serveAuthCallbackPage(res: FastifyReply): void;
}
