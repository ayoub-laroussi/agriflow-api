/**
 * Service de calendrier agricole
 * 
 * Ce service gère la logique métier pour le calendrier agricole.
 * Il agrège les données des observations et des actions agricoles
 * pour les présenter dans un format adapté à un affichage calendaire.
 * 
 * @module CalendarService
 */
import { Injectable } from '@nestjs/common';
import { ObservationService } from '../observation/observation.service';
import { AgriculturalActionService } from '../../agricultural-action/agricultural-action.service';
import { Observation } from '../observation/entities/observation.entity';
import { AgriculturalAction } from '../../agricultural-action/entities/agricultural-action.entity';

/**
 * Type d'entrée calendaire (Observation ou Action agricole)
 */
export enum CalendarEntryType {
  OBSERVATION = 'observation',
  AGRICULTURAL_ACTION = 'agricultural_action'
}

/**
 * Interface pour les entrées du calendrier
 */
export interface CalendarEntry {
  id: string;
  type: CalendarEntryType;
  date: Date;
  title: string;
  description?: string;
  tags?: string[];
  entityType?: string;
  entityId?: string;
  color?: string;
  originalData: Observation | AgriculturalAction;
}

/**
 * Options pour filtrer les entrées du calendrier
 */
export interface CalendarOptions {
  startDate: Date;
  endDate: Date;
  cultivationSpaceId?: string;
  landId?: string;
  cropId?: string;
  includeObservations?: boolean;
  includeAgriculturalActions?: boolean;
  actionTypes?: string[];
}

/**
 * Service de calendrier agricole
 * 
 * Implémente la logique métier pour récupérer et formater les données
 * d'observations et d'actions agricoles pour un affichage calendaire.
 */
@Injectable()
export class CalendarService {
  constructor(
    private observationService: ObservationService,
    private agriculturalActionService: AgriculturalActionService,
  ) {}

  /**
   * Récupère les entrées du calendrier pour une période donnée
   * 
   * @param {CalendarOptions} options - Options de filtrage
   * @returns {Promise<CalendarEntry[]>} Entrées du calendrier
   */
  async getCalendarEntries(options: CalendarOptions): Promise<CalendarEntry[]> {
    const entries: CalendarEntry[] = [];
    
    // Récupérer les observations si demandé
    if (options.includeObservations !== false) {
      const observations = await this.observationService.findByDateRange(
        options.startDate,
        options.endDate
      );
      
      // Filtrer par espace de culture ou terrain si spécifié
      const filteredObservations = observations.filter(obs => {
        if (options.cultivationSpaceId && obs.cultivationSpaceId !== options.cultivationSpaceId) {
          return false;
        }
        if (options.landId && obs.landId !== options.landId) {
          return false;
        }
        return true;
      });

      // Convertir les observations en entrées de calendrier
      const observationEntries = filteredObservations.map(obs => this.mapObservationToCalendarEntry(obs));
      entries.push(...observationEntries);
    }
    
    // Récupérer les actions agricoles si demandé
    if (options.includeAgriculturalActions !== false) {
      const actions = await this.agriculturalActionService.findByDateRange(
        options.startDate,
        options.endDate
      );
      
      // Filtrer par type d'action, espace de culture ou culture si spécifié
      const filteredActions = actions.filter(action => {
        if (options.actionTypes && options.actionTypes.length > 0 && 
            !options.actionTypes.includes(action.type)) {
          return false;
        }
        if (options.cultivationSpaceId && 
            (!action.cultivationSpace || action.cultivationSpace.id !== options.cultivationSpaceId)) {
          return false;
        }
        if (options.cropId && 
            (!action.crop || action.crop.id !== options.cropId)) {
          return false;
        }
        return true;
      });

      // Convertir les actions en entrées de calendrier
      const actionEntries = filteredActions.map(action => this.mapActionToCalendarEntry(action));
      entries.push(...actionEntries);
    }
    
    // Trier les entrées par date
    return entries.sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  /**
   * Convertit une observation en entrée de calendrier
   * 
   * @param {Observation} observation - L'observation à convertir
   * @returns {CalendarEntry} L'entrée de calendrier correspondante
   */
  private mapObservationToCalendarEntry(observation: Observation): CalendarEntry {
    // Déterminer le titre en fonction des données disponibles
    let title = 'Observation';
    
    if (observation.weatherCondition) {
      title = `Observation: ${observation.weatherCondition}`;
    } else if (observation.temperature) {
      title = `Observation: ${observation.temperature}°C`;
    }
    
    // Déterminer les tags en fonction des données disponibles
    const tags = [];
    if (observation.temperature) tags.push(`${observation.temperature}°C`);
    if (observation.humidity) tags.push(`Humidité: ${observation.humidity}%`);
    if (observation.precipitation) tags.push(`Précip: ${observation.precipitation}mm`);
    if (observation.weatherCondition) tags.push(observation.weatherCondition);
    
    // Déterminer le type d'entité associée
    let entityType = null;
    let entityId = null;
    
    if (observation.isLandObservation && observation.landId) {
      entityType = 'land';
      entityId = observation.landId;
    } else if (observation.cultivationSpaceId) {
      entityType = 'cultivation_space';
      entityId = observation.cultivationSpaceId;
    }
    
    return {
      id: observation.id,
      type: CalendarEntryType.OBSERVATION,
      date: observation.observationDate,
      title,
      description: observation.description,
      tags,
      entityType,
      entityId,
      color: '#3498db', // Bleu pour les observations
      originalData: observation
    };
  }

  /**
   * Convertit une action agricole en entrée de calendrier
   * 
   * @param {AgriculturalAction} action - L'action à convertir
   * @returns {CalendarEntry} L'entrée de calendrier correspondante
   */
  private mapActionToCalendarEntry(action: AgriculturalAction): CalendarEntry {
    // Déterminer le titre en fonction du type d'action
    const title = `Action: ${action.type}`;
    
    // Déterminer les tags en fonction des données disponibles
    const tags = [action.type];
    
    // Déterminer la couleur en fonction du type d'action
    let color = '#2ecc71'; // Vert par défaut
    
    switch (action.type) {
      case 'plantation':
      case 'semis':
        color = '#2ecc71'; // Vert
        break;
      case 'arrosage':
        color = '#3498db'; // Bleu
        break;
      case 'fertilisation':
        color = '#f39c12'; // Orange
        break;
      case 'traitement':
        color = '#e74c3c'; // Rouge
        break;
      case 'récolte':
        color = '#9b59b6'; // Violet
        break;
      default:
        color = '#7f8c8d'; // Gris
    }
    
    // Déterminer les entités associées
    let entityType = null;
    let entityId = null;
    
    if (action.crop) {
      entityType = 'crop';
      entityId = action.crop.id;
    } else if (action.cultivationBed) {
      entityType = 'cultivation_bed';
      entityId = action.cultivationBed.id;
    } else if (action.cultivationSpace) {
      entityType = 'cultivation_space';
      entityId = action.cultivationSpace.id;
    }
    
    return {
      id: action.id,
      type: CalendarEntryType.AGRICULTURAL_ACTION,
      date: action.actionDate,
      title,
      description: action.commentary,
      tags,
      entityType,
      entityId,
      color,
      originalData: action
    };
  }

  /**
   * Récupère les statistiques pour une période donnée
   */
  async getCalendarStats(options: CalendarOptions): Promise<any> {
    const entries = await this.getCalendarEntries(options);
    
    // Nombre total d'entrées
    const totalEntries = entries.length;
    
    // Nombre d'observations
    const observationsCount = entries.filter(
      entry => entry.type === CalendarEntryType.OBSERVATION
    ).length;
    
    // Nombre d'actions agricoles
    const actionsCount = entries.filter(
      entry => entry.type === CalendarEntryType.AGRICULTURAL_ACTION
    ).length;
    
    // Répartition par type d'action
    const actionsByType = entries
      .filter(entry => entry.type === CalendarEntryType.AGRICULTURAL_ACTION)
      .reduce((acc, entry) => {
        const action = entry.originalData as AgriculturalAction;
        acc[action.type] = (acc[action.type] || 0) + 1;
        return acc;
      }, {});
    
    return {
      totalEntries,
      observationsCount,
      actionsCount,
      actionsByType
    };
  }
} 