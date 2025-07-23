import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import * as path from 'path';

config();

// Configuration pour les migrations
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'agriflow-api-db',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'agriflow',
  entities: [path.join(__dirname, '**/*.entity{.ts,.js}')],
  // Désactivation complète des migrations et synchronisation
  migrations: ['src/migrations/**/*.ts'],
  synchronize: false, // Désactivé pour éviter les problèmes de contraintes
  logging: true,
};

// Création de la source de données pour les migrations CLI
const dataSource = new DataSource(dataSourceOptions);
export default dataSource; 