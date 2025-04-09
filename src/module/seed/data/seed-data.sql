-- Données de test pour l'application AgriFlow
-- Ce script ajoute des données de test pour démontrer les fonctionnalités de l'application

-- Extension uuid-ossp pour la génération des UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Constantes pour les IDs (pour maintenir la cohérence des relations)
DO $$
DECLARE
    -- IDs des utilisateurs
    user_id_1 UUID := '3a7f234d-a9c5-4b1a-b8d6-28c5299d5643';
    user_id_2 UUID := '5c2f6548-2735-4fd3-a5cd-485a6d2db7c4';

    -- IDs des terrains
    land_id_1 UUID := 'b3e8c5f1-9a7d-4e5b-8c2a-1d4f6e9a7b5c';
    land_id_2 UUID := 'd5f9c8e1-2b3a-4d5e-9f8a-7b6c5d4e3f2a';

    -- IDs des espaces de culture
    cultivation_space_id_1 UUID := 'f1e2d3c4-b5a6-4c3d-e2f1-a5b6c7d8e9f0';
    cultivation_space_id_2 UUID := 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6';
    cultivation_space_id_3 UUID := 'c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7r8';
    
    -- IDs des planches de culture
    cultivation_bed_id_1 UUID := '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p';
    cultivation_bed_id_2 UUID := '2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q';
    cultivation_bed_id_3 UUID := '3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r';
    
    -- IDs des cultures
    crop_id_1 UUID := 'a7b6c5d4-e3f2-g1h0-i9j8-k7l6m5n4o3p2';
    crop_id_2 UUID := 'b8c7d6e5-f4g3-h2i1-j0k9-l8m7n6o5p4q3';
    crop_id_3 UUID := 'c9d8e7f6-g5h4-i3j2-k1l0-m9n8o7p6q5r4';
    crop_id_4 UUID := 'd0e9f8g7-h6i5-j4k3-l2m1-n0o9p8q7r6s5';
BEGIN

-- Suppression des données existantes (si nécessaire)
TRUNCATE TABLE users CASCADE;
TRUNCATE TABLE lands CASCADE;
TRUNCATE TABLE cultivation_spaces CASCADE;
TRUNCATE TABLE cultivation_beds CASCADE;
TRUNCATE TABLE crops CASCADE;
TRUNCATE TABLE observations CASCADE;
TRUNCATE TABLE agricultural_actions CASCADE;
TRUNCATE TABLE notification_preferences CASCADE;
TRUNCATE TABLE notifications CASCADE;

-- Insertion des utilisateurs
INSERT INTO users (id, email, password, first_name, last_name, created_at, updated_at)
VALUES
  (user_id_1, 'jean.dupont@agriflow.fr', '$2b$10$1XpzUYu7OeWDXcGfu4aEwuVwl1xLe9NdOD5JWsdA2sDgW9LMnYIJK', 'Jean', 'Dupont', NOW(), NOW()),
  (user_id_2, 'marie.martin@agriflow.fr', '$2b$10$1XpzUYu7OeWDXcGfu4aEwuVwl1xLe9NdOD5JWsdA2sDgW9LMnYIJK', 'Marie', 'Martin', NOW(), NOW());

-- Insertion des terrains
INSERT INTO lands (id_land, name, address, surface_area, soil_type, user_id, created_at, updated_at)
VALUES
  (land_id_1, 'Domaine des Chênes', '12 Route de la Ferme, 31000 Toulouse', 25000, 'Argilo-limoneux', user_id_1, NOW(), NOW()),
  (land_id_2, 'Ferme du Soleil', '45 Chemin des Vignes, 31450 Montgiscard', 18000, 'Limoneux', user_id_2, NOW(), NOW());

-- Insertion des espaces de culture
INSERT INTO cultivation_spaces (id, name, description, surface_area, land_id, created_at, updated_at)
VALUES
  (cultivation_space_id_1, 'Potager Nord', 'Espace de culture principale pour légumes', 2500, land_id_1, NOW(), NOW()),
  (cultivation_space_id_2, 'Verger Est', 'Verger avec arbres fruitiers', 5000, land_id_1, NOW(), NOW()),
  (cultivation_space_id_3, 'Potager Principal', 'Grand potager pour cultures diverses', 3000, land_id_2, NOW(), NOW());

-- Insertion des planches de culture
INSERT INTO cultivation_beds (id, name, width, length, cultivation_space_id, created_at, updated_at)
VALUES
  (cultivation_bed_id_1, 'Planche 1 - Tomates', 1.2, 10, cultivation_space_id_1, NOW(), NOW()),
  (cultivation_bed_id_2, 'Planche 2 - Salades', 1.2, 8, cultivation_space_id_1, NOW(), NOW()),
  (cultivation_bed_id_3, 'Planche 1 - Carottes/Radis', 1.5, 12, cultivation_space_id_3, NOW(), NOW());

-- Insertion des cultures
INSERT INTO crops (id, name, variety, family, planting_date, expected_harvest_date, actual_harvest_date, status, notes, cultivation_bed_id, created_at, updated_at)
VALUES
  (crop_id_1, 'Tomates', 'Coeur de Boeuf', 'Solanacées', '2024-03-20', '2024-08-15', NULL, 'en_croissance', 'Développement normal, formation des premières fleurs', cultivation_bed_id_1, NOW(), NOW()),
  (crop_id_2, 'Salades', 'Batavia', 'Astéracées', '2024-03-05', '2024-05-20', NULL, 'en_croissance', 'Croissance rapide, surveillance limaces nécessaire', cultivation_bed_id_2, NOW(), NOW()),
  (crop_id_3, 'Carottes', 'Nantaise', 'Apiacées', '2024-03-10', '2024-06-25', NULL, 'en_croissance', 'Levée homogène, éclaircissage effectué le 05/04', cultivation_bed_id_3, NOW(), NOW()),
  (crop_id_4, 'Radis', 'De 18 jours', 'Brassicacées', '2024-03-10', '2024-04-15', '2024-04-12', 'récolté', 'Récolte légèrement précoce, bon rendement', cultivation_bed_id_3, NOW(), NOW());

END $$; 