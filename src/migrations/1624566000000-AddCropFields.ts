import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCropFields1624566000000 implements MigrationInterface {
    name = 'AddCropFields1624566000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Vérifier si les colonnes existent déjà avant de les ajouter
        const columns = await queryRunner.query(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'crops' AND table_schema = 'public'
        `);
        
        const columnNames = columns.map(column => column.column_name);
        
        // Ajouter les colonnes manquantes si elles n'existent pas déjà
        if (!columnNames.includes('growth_time')) {
            await queryRunner.query(`ALTER TABLE "crops" ADD "growth_time" integer NULL`);
        }
        
        if (!columnNames.includes('planting_depth')) {
            await queryRunner.query(`ALTER TABLE "crops" ADD "planting_depth" float NULL`);
        }
        
        if (!columnNames.includes('spacing')) {
            await queryRunner.query(`ALTER TABLE "crops" ADD "spacing" float NULL`);
        }
        
        if (!columnNames.includes('row_spacing')) {
            await queryRunner.query(`ALTER TABLE "crops" ADD "row_spacing" float NULL`);
        }
        
        if (!columnNames.includes('optimal_temperature')) {
            await queryRunner.query(`ALTER TABLE "crops" ADD "optimal_temperature" float NULL`);
        }
        
        if (!columnNames.includes('optimal_ph')) {
            await queryRunner.query(`ALTER TABLE "crops" ADD "optimal_ph" float NULL`);
        }
        
        if (!columnNames.includes('water_needs')) {
            await queryRunner.query(`ALTER TABLE "crops" ADD "water_needs" varchar(50) NULL`);
        }
        
        if (!columnNames.includes('sun_exposure')) {
            await queryRunner.query(`ALTER TABLE "crops" ADD "sun_exposure" varchar(50) NULL`);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Supprimer les colonnes ajoutées
        await queryRunner.query(`ALTER TABLE "crops" DROP COLUMN IF EXISTS "sun_exposure"`);
        await queryRunner.query(`ALTER TABLE "crops" DROP COLUMN IF EXISTS "water_needs"`);
        await queryRunner.query(`ALTER TABLE "crops" DROP COLUMN IF EXISTS "optimal_ph"`);
        await queryRunner.query(`ALTER TABLE "crops" DROP COLUMN IF EXISTS "optimal_temperature"`);
        await queryRunner.query(`ALTER TABLE "crops" DROP COLUMN IF EXISTS "row_spacing"`);
        await queryRunner.query(`ALTER TABLE "crops" DROP COLUMN IF EXISTS "spacing"`);
        await queryRunner.query(`ALTER TABLE "crops" DROP COLUMN IF EXISTS "planting_depth"`);
        await queryRunner.query(`ALTER TABLE "crops" DROP COLUMN IF EXISTS "growth_time"`);
    }
}
