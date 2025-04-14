/**
 * Exemples de réponses Swagger pour l'API
 * 
 * Ce fichier contient des exemples de réponses API standardisées pour la documentation Swagger.
 * Ces exemples peuvent être utilisés dans les décorateurs @ApiResponse pour fournir des
 * exemples concrets de réponses API.
 */
import { ApiProperty, getSchemaPath } from '@nestjs/swagger';

/**
 * Interface de réponse API standardisée
 */
export interface ApiResponseFormat<T> {
  message: string;
  data?: T;
  statusCode: number;
}

/**
 * Classe d'exemple de réponse API
 */
export class ApiResponseDto<T> implements ApiResponseFormat<T> {
  @ApiProperty({ example: 'Opération réussie' })
  message: string;

  @ApiProperty({ example: {} })
  data?: T;

  @ApiProperty({ example: 200 })
  statusCode: number;
}

/**
 * Exemples de réponses pour les utilisateurs
 */
export const userExamples = {
  getOne: {
    message: 'Utilisateur récupéré avec succès',
    data: {
      id: '3a7f234d-a9c5-4b1a-b8d6-28c5299d5643',
      email: 'jean.dupont@agriflow.fr',
      firstName: 'Jean',
      lastName: 'Dupont',
      createdAt: '2024-04-15T10:30:45.123Z',
      updatedAt: '2024-04-15T10:30:45.123Z'
    },
    statusCode: 200
  },
  getAll: {
    message: 'Liste des utilisateurs récupérée avec succès',
    data: [
      {
        id: '3a7f234d-a9c5-4b1a-b8d6-28c5299d5643',
        email: 'jean.dupont@agriflow.fr',
        firstName: 'Jean',
        lastName: 'Dupont',
        createdAt: '2024-04-15T10:30:45.123Z',
        updatedAt: '2024-04-15T10:30:45.123Z'
      },
      {
        id: '5c2f6548-2735-4fd3-a5cd-485a6d2db7c4',
        email: 'marie.martin@agriflow.fr',
        firstName: 'Marie',
        lastName: 'Martin',
        createdAt: '2024-04-10T14:20:32.456Z',
        updatedAt: '2024-04-10T14:20:32.456Z'
      }
    ],
    statusCode: 200
  },
  create: {
    message: 'Utilisateur créé avec succès',
    data: {
      id: '3a7f234d-a9c5-4b1a-b8d6-28c5299d5643',
      email: 'jean.dupont@agriflow.fr',
      firstName: 'Jean',
      lastName: 'Dupont',
      createdAt: '2024-04-15T10:30:45.123Z',
      updatedAt: '2024-04-15T10:30:45.123Z'
    },
    statusCode: 201
  },
  update: {
    message: 'Utilisateur mis à jour avec succès',
    data: {
      id: '3a7f234d-a9c5-4b1a-b8d6-28c5299d5643',
      email: 'jean.dupont@agriflow.fr',
      firstName: 'Jean',
      lastName: 'Dupont-Modifié',
      createdAt: '2024-04-15T10:30:45.123Z',
      updatedAt: '2024-04-15T11:45:12.789Z'
    },
    statusCode: 200
  },
  delete: {
    message: 'Utilisateur supprimé avec succès',
    statusCode: 200
  },
  notFound: {
    message: 'Utilisateur non trouvé',
    statusCode: 404
  }
};

/**
 * Exemples de réponses pour les terrains
 */
export const landExamples = {
  getOne: {
    message: 'Terrain récupéré avec succès',
    data: {
      idLand: 'b3e8c5f1-9a7d-4e5b-8c2a-1d4f6e9a7b5c',
      name: 'Domaine des Chênes',
      address: '12 Route de la Ferme, 31000 Toulouse',
      surfaceArea: 25000,
      soilType: 'Argilo-limoneux',
      userId: '3a7f234d-a9c5-4b1a-b8d6-28c5299d5643',
      createdAt: '2024-04-15T10:30:45.123Z',
      updatedAt: '2024-04-15T10:30:45.123Z'
    },
    statusCode: 200
  },
  getAll: {
    message: 'Liste des terrains récupérée avec succès',
    data: [
      {
        idLand: 'b3e8c5f1-9a7d-4e5b-8c2a-1d4f6e9a7b5c',
        name: 'Domaine des Chênes',
        address: '12 Route de la Ferme, 31000 Toulouse',
        surfaceArea: 25000,
        soilType: 'Argilo-limoneux',
        userId: '3a7f234d-a9c5-4b1a-b8d6-28c5299d5643',
        createdAt: '2024-04-15T10:30:45.123Z',
        updatedAt: '2024-04-15T10:30:45.123Z'
      },
      {
        idLand: 'd5f9c8e1-2b3a-4d5e-9f8a-7b6c5d4e3f2a',
        name: 'Ferme du Soleil',
        address: '45 Chemin des Vignes, 31450 Montgiscard',
        surfaceArea: 18000,
        soilType: 'Limoneux',
        userId: '5c2f6548-2735-4fd3-a5cd-485a6d2db7c4',
        createdAt: '2024-04-10T14:20:32.456Z',
        updatedAt: '2024-04-10T14:20:32.456Z'
      }
    ],
    statusCode: 200
  }
};

/**
 * Exemples de réponses pour les observations
 */
export const observationExamples = {
  getOne: {
    message: 'Observation récupérée avec succès',
    data: {
      id: 'e2d1c0b9-a8f7-4e5d-b3c2-a1f0e9d8c7b6',
      observationDate: '2024-03-15T08:45:00.000Z',
      description: 'Première pluie significative du mois, sol bien humidifié',
      temperature: 14.2,
      humidity: 85.7,
      precipitation: 12.5,
      windSpeed: 8.4,
      windDirection: 'SO',
      pressure: 1005.3,
      weatherCondition: 'Pluvieux',
      isLandObservation: true,
      landId: 'b3e8c5f1-9a7d-4e5b-8c2a-1d4f6e9a7b5c',
      createdAt: '2024-03-15T09:00:12.345Z',
      updatedAt: '2024-03-15T09:00:12.345Z'
    },
    statusCode: 200
  },
  create: {
    message: 'Observation créée avec succès',
    data: {
      id: 'e2d1c0b9-a8f7-4e5d-b3c2-a1f0e9d8c7b6',
      observationDate: '2024-03-15T08:45:00.000Z',
      description: 'Première pluie significative du mois, sol bien humidifié',
      temperature: 14.2,
      humidity: 85.7,
      precipitation: 12.5,
      windSpeed: 8.4,
      windDirection: 'SO',
      pressure: 1005.3,
      weatherCondition: 'Pluvieux',
      isLandObservation: true,
      landId: 'b3e8c5f1-9a7d-4e5b-8c2a-1d4f6e9a7b5c',
      createdAt: '2024-03-15T09:00:12.345Z',
      updatedAt: '2024-03-15T09:00:12.345Z'
    },
    statusCode: 201
  }
};

/**
 * Exemples de réponses pour l'authentification
 */
export const authExamples = {
  login: {
    message: 'Connexion réussie',
    data: {
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzYTdmMjM0ZC1hOWM1LTRiMWEtYjhkNi0yOGM1Mjk5ZDU2NDMiLCJlbWFpbCI6ImplYW4uZHVwb250QGFncmlmbG93LmZyIiwiaWF0IjoxNjE3MTgxODg5LCJleHAiOjE2MTcxODU0ODl9.7DTeYq-CIm7W1Q9Q9Y5XHRxJlxMl5N1X7V5vLlX2y6A',
      refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzYTdmMjM0ZC1hOWM1LTRiMWEtYjhkNi0yOGM1Mjk5ZDU2NDMiLCJlbWFpbCI6ImplYW4uZHVwb250QGFncmlmbG93LmZyIiwiaWF0IjoxNjE3MTgxODg5LCJleHAiOjE2MTcxODU0ODl9.7DTeYq-CIm7W1Q9Q9Y5XHRxJlxMl5N1X7V5vLlX2y6A',
      user: {
        id: '3a7f234d-a9c5-4b1a-b8d6-28c5299d5643',
        email: 'jean.dupont@agriflow.fr',
        firstName: 'Jean',
        lastName: 'Dupont'
      }
    },
    statusCode: 200
  },
  register: {
    message: 'Inscription réussie',
    data: {
      id: '3a7f234d-a9c5-4b1a-b8d6-28c5299d5643',
      email: 'jean.dupont@agriflow.fr',
      firstName: 'Jean',
      lastName: 'Dupont',
      createdAt: '2024-04-15T10:30:45.123Z',
      updatedAt: '2024-04-15T10:30:45.123Z'
    },
    statusCode: 201
  },
  refreshToken: {
    message: 'Token rafraîchi avec succès',
    data: {
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzYTdmMjM0ZC1hOWM1LTRiMWEtYjhkNi0yOGM1Mjk5ZDU2NDMiLCJlbWFpbCI6ImplYW4uZHVwb250QGFncmlmbG93LmZyIiwiaWF0IjoxNjE3MTgxODg5LCJleHAiOjE2MTcxODU0ODl9.7DTeYq-CIm7W1Q9Q9Y5XHRxJlxMl5N1X7V5vLlX2y6A'
    },
    statusCode: 200
  },
  unauthorized: {
    message: 'Identifiants incorrects',
    statusCode: 401
  }
};

/**
 * Exemples de réponses d'erreur
 */
export const errorExamples = {
  badRequest: {
    message: 'Données invalides',
    statusCode: 400
  },
  unauthorized: {
    message: 'Non autorisé',
    statusCode: 401
  },
  forbidden: {
    message: 'Accès interdit',
    statusCode: 403
  },
  notFound: {
    message: 'Ressource non trouvée',
    statusCode: 404
  },
  internalError: {
    message: 'Erreur interne du serveur',
    statusCode: 500
  }
}; 