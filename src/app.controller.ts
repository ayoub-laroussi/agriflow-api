import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HelloResponse } from './interfaces/api-response.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): HelloResponse {
    const data = this.appService.getHello();
    return {
      message: 'Message de bienvenue récupéré avec succès',
      data,
      statusCode: 200
    };
  }
}
