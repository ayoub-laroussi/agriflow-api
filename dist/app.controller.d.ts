import { AppService } from './app.service';
import { HelloResponse } from './interfaces/api-response.interface';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): HelloResponse;
}
