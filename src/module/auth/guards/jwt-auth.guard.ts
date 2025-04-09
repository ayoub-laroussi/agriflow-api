/**
 * Garde d'authentification JWT
 * 
 * Ce garde permet de protéger les routes qui nécessitent une authentification.
 * Il vérifie la présence et la validité d'un token JWT dans les en-têtes de la requête.
 * 
 * @module JwtAuthGuard
 */
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Garde d'authentification JWT
 * 
 * Étend le garde d'authentification de Passport pour utiliser la stratégie JWT.
 * Permet de protéger les routes qui nécessitent une authentification.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {} 