# Routes de l'API AgriFlow

Ce document présente toutes les routes disponibles dans l'API AgriFlow.

## Table des matières

- [Authentification](#authentification)
- [Utilisateurs](#utilisateurs)
- [Rôles](#rôles)
- [Terrains](#terrains)
- [Espaces de Culture](#espaces-de-culture)
- [Planches de Culture](#planches-de-culture)
- [Couvertures de Sol](#couvertures-de-sol)
- [Cultures](#cultures)
- [Statuts de Culture](#statuts-de-culture)
- [Actions Agricoles](#actions-agricoles)
- [Observations](#observations)
- [Notifications](#notifications)
- [Zones](#zones)
- [Application](#application)

## Authentification

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/auth/login` | Authentification utilisateur |
| POST | `/auth/register` | Création d'un nouvel utilisateur |
| POST | `/auth/refresh-token` | Rafraîchir le token d'authentification |
| GET | `/auth/profile` | Récupérer le profil de l'utilisateur connecté |

## Utilisateurs

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/users` | Créer un nouvel utilisateur |
| GET | `/users` | Récupérer tous les utilisateurs |
| GET | `/users/:id` | Récupérer un utilisateur par son ID |
| PATCH | `/users/:id` | Mettre à jour un utilisateur |
| DELETE | `/users/:id` | Supprimer un utilisateur |
| GET | `/users/email/:email` | Récupérer un utilisateur par son email |
| GET | `/users/username/:username` | Récupérer un utilisateur par son nom d'utilisateur |

## Rôles

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/role` | Créer un nouveau rôle |
| GET | `/role` | Récupérer tous les rôles |
| GET | `/role/:id` | Récupérer un rôle par son ID |
| PATCH | `/role/:id` | Mettre à jour un rôle |
| DELETE | `/role/:id` | Supprimer un rôle |

## Terrains

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/lands` | Créer un nouveau terrain |
| GET | `/lands` | Récupérer tous les terrains |
| GET | `/lands/:id` | Récupérer un terrain par son ID |
| PATCH | `/lands/:id` | Mettre à jour un terrain |
| DELETE | `/lands/:id` | Supprimer un terrain |

## Espaces de Culture

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/cultivation-spaces` | Créer un nouvel espace de culture |
| GET | `/cultivation-spaces` | Récupérer tous les espaces de culture |
| GET | `/cultivation-spaces/:id` | Récupérer un espace de culture par son ID |
| PATCH | `/cultivation-spaces/:id` | Mettre à jour un espace de culture |
| DELETE | `/cultivation-spaces/:id` | Supprimer un espace de culture |

## Planches de Culture

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/cultivation-beds` | Créer une nouvelle planche de culture |
| GET | `/cultivation-beds` | Récupérer toutes les planches de culture |
| GET | `/cultivation-beds/:id` | Récupérer une planche de culture par son ID |
| PATCH | `/cultivation-beds/:id` | Mettre à jour une planche de culture |
| DELETE | `/cultivation-beds/:id` | Supprimer une planche de culture |

## Couvertures de Sol

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/soil-covers` | Créer une nouvelle couverture de sol |
| GET | `/soil-covers` | Récupérer toutes les couvertures de sol |
| GET | `/soil-covers/:id` | Récupérer une couverture de sol par son ID |
| PATCH | `/soil-covers/:id` | Mettre à jour une couverture de sol |
| DELETE | `/soil-covers/:id` | Supprimer une couverture de sol |

## Cultures

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/crops` | Créer une nouvelle culture |
| GET | `/crops` | Récupérer toutes les cultures |
| GET | `/crops/:id` | Récupérer une culture par son ID |
| PATCH | `/crops/:id` | Mettre à jour une culture |
| DELETE | `/crops/:id` | Supprimer une culture |

## Statuts de Culture

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/crop-statuses` | Créer un nouveau statut de culture |
| GET | `/crop-statuses` | Récupérer tous les statuts de culture |
| GET | `/crop-statuses/:id` | Récupérer un statut de culture par son ID |
| PATCH | `/crop-statuses/:id` | Mettre à jour un statut de culture |
| DELETE | `/crop-statuses/:id` | Supprimer un statut de culture |

## Actions Agricoles

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/agricultural-actions` | Créer une nouvelle action agricole |
| GET | `/agricultural-actions` | Récupérer toutes les actions agricoles |
| GET | `/agricultural-actions/:id` | Récupérer une action agricole par son ID |
| PATCH | `/agricultural-actions/:id` | Mettre à jour une action agricole |
| DELETE | `/agricultural-actions/:id` | Supprimer une action agricole |

## Observations

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/observations` | Créer une nouvelle observation |
| GET | `/observations` | Récupérer toutes les observations |
| GET | `/observations/by-date-range` | Récupérer les observations par plage de dates |
| GET | `/observations/by-cultivation-space/:id` | Récupérer les observations par espace de culture |
| GET | `/observations/by-land/:id` | Récupérer les observations par terrain |
| GET | `/observations/:id` | Récupérer une observation par son ID |
| PATCH | `/observations/:id` | Mettre à jour une observation |
| DELETE | `/observations/:id` | Supprimer une observation |

## Notifications

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/notification` | Créer une nouvelle notification |
| GET | `/notification` | Récupérer toutes les notifications |
| GET | `/notification/:id` | Récupérer une notification par son ID |
| PATCH | `/notification/:id` | Mettre à jour une notification |
| DELETE | `/notification/:id` | Supprimer une notification |
| POST | `/notification-preferences` | Créer une nouvelle préférence de notification |
| GET | `/notification-preferences` | Récupérer toutes les préférences de notification |
| GET | `/notification-preferences/:id` | Récupérer une préférence de notification par son ID |
| PATCH | `/notification-preferences/:id` | Mettre à jour une préférence de notification |
| DELETE | `/notification-preferences/:id` | Supprimer une préférence de notification |

## Zones

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/area` | Créer une nouvelle zone |
| GET | `/area` | Récupérer toutes les zones |
| GET | `/area/:id` | Récupérer une zone par son ID |
| PATCH | `/area/:id` | Mettre à jour une zone |
| DELETE | `/area/:id` | Supprimer une zone |

## Application

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/test-auth` | Page de test d'authentification |
| GET | `/auth-callback-page` | Page de callback d'authentification | 