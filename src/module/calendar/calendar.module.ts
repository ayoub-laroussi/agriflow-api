/**
 * Module de calendrier agricole
 * 
 * Ce module gère l'affichage et l'organisation temporelle des observations et actions agricoles.
 * Il permet de visualiser dans un format calendrier les différentes activités et observations
 * enregistrées dans le système.
 * 
 * @module CalendarModule
 */
import { Module } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CalendarController } from './calendar.controller';
import { ObservationModule } from '../observation/observation.module';
import { AgriculturalActionModule } from '../../agricultural-action/agricultural-action.module';

/**
 * Module de calendrier agricole
 * 
 * Ce module intègre les fonctionnalités nécessaires pour gérer un calendrier
 * des activités et observations agricoles, permettant une visualisation temporelle
 * des données enregistrées dans le système.
 */
@Module({
  imports: [
    ObservationModule,
    AgriculturalActionModule
  ],
  controllers: [CalendarController],
  providers: [CalendarService],
  exports: [CalendarService]
})
export class CalendarModule {} 