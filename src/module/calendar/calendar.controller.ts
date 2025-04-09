/**
 * Contrôleur de calendrier agricole
 * 
 * Ce contrôleur expose les endpoints REST pour accéder aux fonctionnalités
 * du calendrier agricole, notamment la récupération des événements pour une
 * période donnée et les statistiques associées.
 * 
 * @module CalendarController
 */
import { Controller, Get, Query, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { CalendarService, CalendarEntry } from './calendar.service';
import { CalendarQueryDto } from './dto/calendar-query.dto';

/**
 * Interface pour la réponse API standardisée
 */
interface ApiResponseFormat<T> {
  message: string;
  data?: T;
  statusCode: number;
}

/**
 * Contrôleur de calendrier agricole
 * 
 * Expose les routes REST pour accéder aux fonctionnalités du calendrier
 */
@ApiTags('calendar')
@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  /**
   * Récupère les entrées du calendrier pour une période donnée
   */
  @Get()
  @ApiOperation({ summary: 'Récupérer les entrées du calendrier' })
  @ApiResponse({
    status: 200,
    description: 'Entrées du calendrier récupérées avec succès'
  })
  async getCalendarEntries(
    @Query() queryDto: CalendarQueryDto
  ): Promise<ApiResponseFormat<CalendarEntry[]>> {
    const entries = await this.calendarService.getCalendarEntries(queryDto);
    
    return {
      message: 'Entrées du calendrier récupérées avec succès',
      data: entries,
      statusCode: HttpStatus.OK
    };
  }

  /**
   * Récupère les statistiques du calendrier pour une période donnée
   */
  @Get('stats')
  @ApiOperation({ summary: 'Récupérer les statistiques du calendrier' })
  @ApiResponse({
    status: 200,
    description: 'Statistiques du calendrier récupérées avec succès'
  })
  async getCalendarStats(
    @Query() queryDto: CalendarQueryDto
  ): Promise<ApiResponseFormat<any>> {
    const stats = await this.calendarService.getCalendarStats(queryDto);
    
    return {
      message: 'Statistiques du calendrier récupérées avec succès',
      data: stats,
      statusCode: HttpStatus.OK
    };
  }
} 