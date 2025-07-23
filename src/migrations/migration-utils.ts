/**
 * Utilitaires pour les migrations TypeORM
 * 
 * Ce fichier contient des fonctions utilitaires pour faciliter
 * la création et l'exécution des migrations TypeORM.
 */
import { QueryRunner } from 'typeorm';

/**
 * Configure les extensions PostgreSQL de base nécessaires
 * 
 * @param queryRunner - Instance de QueryRunner TypeORM
 */
export async function setupBaseExtensions(queryRunner: QueryRunner): Promise<void> {
  // Extension pour générer des UUID
  await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
  
  // Extension pour les fonctions cryptographiques
  await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`);
}

/**
 * Journalise un message de migration
 * 
 * @param message - Message à journaliser
 */
export function logMigration(message: string): void {
  console.log(`[MIGRATION] ${message}`);
} 