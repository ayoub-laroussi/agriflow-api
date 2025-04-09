-- Fichier d'initialisation de la base de données AgriFlow
-- Ce fichier est exécuté lors de la création initiale de la base de données

-- Extension uuid-ossp pour la génération des UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Données de test pour l'application AgriFlow
-- Ce script ajoute des données de test pour démontrer les fonctionnalités de l'application

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

-- Insertion des utilisateurs (si la table existe déjà)
IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'users') THEN
    INSERT INTO users (id, email, password, first_name, last_name, created_at, updated_at)
    VALUES
      (user_id_1, 'jean.dupont@agriflow.fr', '$2b$10$1XpzUYu7OeWDXcGfu4aEwuVwl1xLe9NdOD5JWsdA2sDgW9LMnYIJK', 'Jean', 'Dupont', NOW(), NOW()),
      (user_id_2, 'marie.martin@agriflow.fr', '$2b$10$1XpzUYu7OeWDXcGfu4aEwuVwl1xLe9NdOD5JWsdA2sDgW9LMnYIJK', 'Marie', 'Martin', NOW(), NOW())
    ON CONFLICT (id) DO NOTHING;
END IF;

-- Insertion des terrains (si la table existe déjà)
IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'lands') THEN
    INSERT INTO lands (id_land, name, address, surface_area, soil_type, user_id, created_at, updated_at)
    VALUES
      (land_id_1, 'Domaine des Chênes', '12 Route de la Ferme, 31000 Toulouse', 25000, 'Argilo-limoneux', user_id_1, NOW(), NOW()),
      (land_id_2, 'Ferme du Soleil', '45 Chemin des Vignes, 31450 Montgiscard', 18000, 'Limoneux', user_id_2, NOW(), NOW())
    ON CONFLICT (id_land) DO NOTHING;
END IF;

-- Insertion des espaces de culture (si la table existe déjà)
IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'cultivation_spaces') THEN
    INSERT INTO cultivation_spaces (id, name, description, surface_area, land_id, created_at, updated_at)
    VALUES
      (cultivation_space_id_1, 'Potager Nord', 'Espace de culture principale pour légumes', 2500, land_id_1, NOW(), NOW()),
      (cultivation_space_id_2, 'Verger Est', 'Verger avec arbres fruitiers', 5000, land_id_1, NOW(), NOW()),
      (cultivation_space_id_3, 'Potager Principal', 'Grand potager pour cultures diverses', 3000, land_id_2, NOW(), NOW())
    ON CONFLICT (id) DO NOTHING;
END IF;

-- Insertion des planches de culture (si la table existe déjà)
IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'cultivation_beds') THEN
    INSERT INTO cultivation_beds (id, name, width, length, cultivation_space_id, created_at, updated_at)
    VALUES
      (cultivation_bed_id_1, 'Planche 1 - Tomates', 1.2, 10, cultivation_space_id_1, NOW(), NOW()),
      (cultivation_bed_id_2, 'Planche 2 - Salades', 1.2, 8, cultivation_space_id_1, NOW(), NOW()),
      (cultivation_bed_id_3, 'Planche 1 - Carottes/Radis', 1.5, 12, cultivation_space_id_3, NOW(), NOW())
    ON CONFLICT (id) DO NOTHING;
END IF;

-- Insertion des cultures (si la table existe déjà)
IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'crops') THEN
    INSERT INTO crops (id, name, variety, family, planting_date, expected_harvest_date, actual_harvest_date, status, notes, cultivation_bed_id, created_at, updated_at)
    VALUES
      (crop_id_1, 'Tomates', 'Coeur de Boeuf', 'Solanacées', '2024-03-20', '2024-08-15', NULL, 'en_croissance', 'Développement normal, formation des premières fleurs', cultivation_bed_id_1, NOW(), NOW()),
      (crop_id_2, 'Salades', 'Batavia', 'Astéracées', '2024-03-05', '2024-05-20', NULL, 'en_croissance', 'Croissance rapide, surveillance limaces nécessaire', cultivation_bed_id_2, NOW(), NOW()),
      (crop_id_3, 'Carottes', 'Nantaise', 'Apiacées', '2024-03-10', '2024-06-25', NULL, 'en_croissance', 'Levée homogène, éclaircissage effectué le 05/04', cultivation_bed_id_3, NOW(), NOW()),
      (crop_id_4, 'Radis', 'De 18 jours', 'Brassicacées', '2024-03-10', '2024-04-15', '2024-04-12', 'récolté', 'Récolte légèrement précoce, bon rendement', cultivation_bed_id_3, NOW(), NOW())
    ON CONFLICT (id) DO NOTHING;
END IF;

-- Insertion des observations (si la table existe déjà)
IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'observations') THEN
    -- Observations générales de terrain
    INSERT INTO observations (id, observation_date, description, temperature, humidity, precipitation, wind_speed, wind_direction, pressure, weather_condition, cultivation_space_id, land_id, is_land_observation, created_at, updated_at)
    VALUES
      (uuid_generate_v4(), '2024-03-01 08:30:00', 'Début de saison, sol encore frais mais travaillable. Premières pousses de mauvaises herbes.', 12.5, 78.5, 0, 5.2, 'NO', 1012.5, 'Ensoleillé', NULL, land_id_1, true, NOW(), NOW()),
      (uuid_generate_v4(), '2024-03-10 09:15:00', 'Température en hausse, conditions idéales pour semis précoces', 15.8, 65.2, 0, 3.1, 'E', 1018.2, 'Partiellement nuageux', NULL, land_id_1, true, NOW(), NOW()),
      (uuid_generate_v4(), '2024-03-15 08:45:00', 'Première pluie significative du mois, sol bien humidifié', 14.2, 85.7, 12.5, 8.4, 'SO', 1005.3, 'Pluvieux', NULL, land_id_1, true, NOW(), NOW()),
      (uuid_generate_v4(), '2024-03-20 14:30:00', 'Sol bien ressuyé, idéal pour les plantations', 17.3, 62.8, 0, 4.5, 'S', 1014.7, 'Ensoleillé', NULL, land_id_2, true, NOW(), NOW()),
      
      -- Observations d'espaces de culture
      (uuid_generate_v4(), '2024-03-05 10:00:00', 'Le sol du potager nord est prêt pour les premiers semis. Structure grumeleuse idéale.', 13.2, 72.0, 0, 4.8, 'NE', 1015.0, 'Ensoleillé', cultivation_space_id_1, NULL, false, NOW(), NOW()),
      (uuid_generate_v4(), '2024-03-12 16:45:00', 'Présence de quelques limaces après la pluie. Mise en place de pièges à bière.', 15.4, 76.5, 2.3, 3.2, 'O', 1010.8, 'Nuageux', cultivation_space_id_1, NULL, false, NOW(), NOW()),
      (uuid_generate_v4(), '2024-03-18 09:30:00', 'Première observation de pucerons sur les jeunes pousses. À surveiller.', 16.8, 65.2, 0, 2.1, 'SE', 1016.4, 'Ensoleillé', cultivation_space_id_3, NULL, false, NOW(), NOW()),
      (uuid_generate_v4(), '2024-03-25 11:15:00', 'Les arbres du verger montrent des signes de débourrement', 18.2, 59.8, 0, 3.7, 'E', 1018.9, 'Ensoleillé', cultivation_space_id_2, NULL, false, NOW(), NOW()),
      (uuid_generate_v4(), '2024-04-01 08:30:00', 'Développement rapide des semis de printemps. Tomates en bon état.', 16.5, 68.3, 0, 4.1, 'N', 1017.2, 'Partiellement nuageux', cultivation_space_id_1, NULL, false, NOW(), NOW()),
      (uuid_generate_v4(), '2024-04-05 17:00:00', 'Premières fleurs sur les fraisiers. Surveillance de gel nocturne recommandée.', 15.8, 71.5, 0, 2.8, 'NO', 1014.3, 'Ensoleillé', cultivation_space_id_3, NULL, false, NOW(), NOW()),
      (uuid_generate_v4(), '2024-04-10 10:45:00', 'Radis prêts à être récoltés, croissance exceptionnelle', 17.4, 64.2, 0, 3.2, 'S', 1016.8, 'Ensoleillé', cultivation_space_id_3, NULL, false, NOW(), NOW()),
      (uuid_generate_v4(), '2024-04-15 09:00:00', 'Premières tomates nouées sur les plants précoces', 18.6, 62.1, 0, 2.5, 'SE', 1015.5, 'Ensoleillé', cultivation_space_id_1, NULL, false, NOW(), NOW());
END IF;

-- Insertion des actions agricoles (si la table existe déjà)
IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'agricultural_actions') THEN
    INSERT INTO agricultural_actions (id, type, action_date, commentary, created_at, updated_at, cultivation_space_id, cultivation_bed_id, crop_id)
    VALUES
      -- Actions de préparation et plantation
      (uuid_generate_v4(), 'préparation du sol', '2024-03-02 09:00:00', 'Travail du sol avec grelinette, incorporation de compost mûr (3kg/m²)', NOW(), NOW(), cultivation_space_id_1, NULL, NULL),
      (uuid_generate_v4(), 'préparation du sol', '2024-03-03 10:30:00', 'Préparation fine du lit de semence pour salades', NOW(), NOW(), NULL, cultivation_bed_id_2, NULL),
      (uuid_generate_v4(), 'semis', '2024-03-05 11:00:00', 'Semis de salades Batavia en lignes espacées de 30cm', NOW(), NOW(), NULL, cultivation_bed_id_2, crop_id_2),
      (uuid_generate_v4(), 'semis', '2024-03-10 10:00:00', 'Semis de carottes Nantaises et radis de 18 jours en rangs alternés', NOW(), NOW(), NULL, cultivation_bed_id_3, crop_id_3),
      (uuid_generate_v4(), 'plantation', '2024-03-20 15:30:00', 'Plantation des tomates Coeur de Boeuf, espacement 70cm', NOW(), NOW(), NULL, cultivation_bed_id_1, crop_id_1),
      
      -- Actions d'entretien
      (uuid_generate_v4(), 'arrosage', '2024-03-20 17:00:00', 'Arrosage des plants de tomates après plantation, 3L par plant', NOW(), NOW(), NULL, cultivation_bed_id_1, crop_id_1),
      (uuid_generate_v4(), 'arrosage', '2024-03-25 08:30:00', 'Arrosage des semis de carottes et radis, aspersion fine', NOW(), NOW(), NULL, cultivation_bed_id_3, NULL),
      (uuid_generate_v4(), 'fertilisation', '2024-03-27 14:00:00', 'Apport de purin d'ortie dilué à 10% sur les tomates', NOW(), NOW(), NULL, NULL, crop_id_1),
      (uuid_generate_v4(), 'taille', '2024-04-02 11:30:00', 'Suppression des gourmands sur les tomates', NOW(), NOW(), NULL, NULL, crop_id_1),
      (uuid_generate_v4(), 'traitement', '2024-04-03 17:00:00', 'Pulvérisation préventive de purin de prêle contre mildiou', NOW(), NOW(), cultivation_space_id_1, NULL, NULL),
      (uuid_generate_v4(), 'arrosage', '2024-04-05 07:30:00', 'Arrosage général du potager, 10L/m²', NOW(), NOW(), cultivation_space_id_1, NULL, NULL),
      (uuid_generate_v4(), 'traitement', '2024-04-08 16:00:00', 'Application de savon noir contre pucerons sur jeunes pousses', NOW(), NOW(), cultivation_space_id_3, NULL, NULL),
      (uuid_generate_v4(), 'autre', '2024-04-09 10:00:00', 'Installation des tuteurs pour tomates', NOW(), NOW(), NULL, cultivation_bed_id_1, NULL),
      
      -- Actions de récolte
      (uuid_generate_v4(), 'récolte', '2024-04-12 09:00:00', 'Première récolte de radis, rendement excellent', NOW(), NOW(), NULL, NULL, crop_id_4),
      (uuid_generate_v4(), 'récolte', '2024-04-14 16:30:00', 'Récolte de jeunes pousses de salades pour éclaircissage', NOW(), NOW(), NULL, NULL, crop_id_2);
END IF;

-- Insertion des préférences de notification (si la table existe déjà)
IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'notification_preferences') THEN
    INSERT INTO notification_preferences (id, user_id, email_enabled, push_enabled, sms_enabled, crop_alerts_enabled, weather_alerts_enabled, task_reminders_enabled, created_at, updated_at)
    VALUES
      (uuid_generate_v4(), user_id_1, true, true, false, true, true, true, NOW(), NOW()),
      (uuid_generate_v4(), user_id_2, true, false, true, true, true, true, NOW(), NOW());
END IF;

-- Insertion des notifications (si la table existe déjà)
IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'notifications') THEN
    INSERT INTO notifications (id, title, content, type, priority, is_read, user_id, is_recurring, recurrence_pattern, is_sent, sent_date, scheduled_date, created_at, updated_at)
    VALUES
      -- Notifications lues
      (uuid_generate_v4(), 'Risque de gel nocturne', 'Attention: prévision de températures proches de 0°C cette nuit. Protégez vos cultures sensibles.', 'weather_alert', 'high', true, user_id_1, false, NULL, true, '2024-03-10 18:00:00', '2024-03-10 18:00:00', '2024-03-10 12:00:00', '2024-03-10 18:00:00'),
      (uuid_generate_v4(), 'Récolte imminente - Radis', 'Vos radis plantés le 10/03 devraient être prêts à récolter dans les prochains jours.', 'crop_reminder', 'medium', true, user_id_1, false, NULL, true, '2024-04-08 09:00:00', '2024-04-08 09:00:00', '2024-04-08 09:00:00', '2024-04-08 10:15:00'),
      
      -- Notifications non lues
      (uuid_generate_v4(), 'Arrosage recommandé', 'Aucune précipitation prévue pour les 5 prochains jours. Un arrosage est recommandé pour vos cultures.', 'task_reminder', 'medium', false, user_id_1, false, NULL, true, '2024-04-15 08:00:00', '2024-04-15 08:00:00', '2024-04-15 08:00:00', '2024-04-15 08:00:00'),
      (uuid_generate_v4(), 'Alerte ravageurs', 'Des pucerons ont été observés sur votre parcelle le 18/03. Vérifiez l''évolution et traitez si nécessaire.', 'pest_alert', 'high', false, user_id_2, false, NULL, true, '2024-03-19 10:00:00', '2024-03-19 10:00:00', '2024-03-19 10:00:00', '2024-03-19 10:00:00'),
      (uuid_generate_v4(), 'Fertilisation recommandée', 'Vos tomates plantées il y a un mois pourraient bénéficier d''un apport d''engrais organique.', 'crop_reminder', 'medium', false, user_id_1, false, NULL, true, '2024-04-20 09:00:00', '2024-04-20 09:00:00', '2024-04-20 09:00:00', '2024-04-20 09:00:00'),
      
      -- Notifications planifiées (non envoyées)
      (uuid_generate_v4(), 'Prévision de fortes pluies', 'Fortes précipitations prévues (25-30mm). Vérifiez vos systèmes de drainage.', 'weather_alert', 'high', false, user_id_1, false, NULL, false, NULL, '2024-04-25 07:00:00', '2024-04-24 15:00:00', '2024-04-24 15:00:00'),
      (uuid_generate_v4(), 'Récolte des carottes', 'Vos carottes semées le 10/03 devraient être prêtes à récolter prochainement.', 'crop_reminder', 'medium', false, user_id_1, false, NULL, false, NULL, '2024-06-20 09:00:00', '2024-04-15 10:00:00', '2024-04-15 10:00:00'),
      
      -- Notifications récurrentes
      (uuid_generate_v4(), 'Vérification hebdomadaire', 'Pensez à inspecter vos cultures pour détecter précocement maladies et ravageurs.', 'crop_reminder', 'low', false, user_id_1, true, '0 9 * * 1', false, NULL, NULL, '2024-03-01 10:00:00', '2024-03-01 10:00:00'),
      (uuid_generate_v4(), 'Rapport météo hebdomadaire', 'Consultez les prévisions météo de la semaine pour planifier vos activités.', 'weather_alert', 'low', false, user_id_2, true, '0 8 * * 1', false, NULL, NULL, '2024-03-01 10:00:00', '2024-03-01 10:00:00');
END IF;

END $$; 