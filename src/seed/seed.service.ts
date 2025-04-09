/**
 * Service de seeding de la base de données
 * 
 * Ce service s'occupe de l'initialisation de la base de données avec des données
 * de test pour démontrer les fonctionnalités de l'application.
 * 
 * @module SeedService
 */
import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Service de seeding de la base de données
 */
@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  /**
   * Initialise la base de données avec des données de test
   * 
   * @returns {Promise<void>}
   */
  async seed(): Promise<void> {
    try {
      this.logger.log('Démarrage du processus de seeding...');
      
      // Chemins des fichiers SQL
      const seedDataPath = path.join(__dirname, 'data/seed-data.sql');
      const observationsActionsPath = path.join(__dirname, 'data/observations-actions.sql');
      const notificationsPath = path.join(__dirname, 'data/notifications.sql');
      
      // Lecture et exécution des fichiers SQL
      this.logger.log('Importation des données de base...');
      await this.executeSqlFile(seedDataPath);
      
      this.logger.log('Importation des observations et actions agricoles...');
      await this.executeSqlFile(observationsActionsPath);
      
      this.logger.log('Importation des notifications...');
      await this.executeSqlFile(notificationsPath);
      
      this.logger.log('Seeding terminé avec succès!');
    } catch (error) {
      this.logger.error(`Erreur lors du seeding: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Exécute un fichier SQL
   * 
   * @param {string} filePath - Chemin du fichier SQL à exécuter
   * @returns {Promise<void>}
   */
  private async executeSqlFile(filePath: string): Promise<void> {
    try {
      const sql = fs.readFileSync(filePath, 'utf8');
      await this.dataSource.query(sql);
    } catch (error) {
      this.logger.error(`Erreur lors de l'exécution du fichier SQL ${filePath}: ${error.message}`);
      throw error;
    }
  }
} 