-- Script de données de test pour AgriFlow
-- Ce script crée 2 instances de chaque entité principale

-- Rôles
INSERT INTO "Role" (id_role, role_name)
VALUES 
  (1, 'Administrateur'),
  (2, 'Agriculteur');

-- Utilisateurs
INSERT INTO users (id_user, email, username, password, role, users_creation_date)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'admin@agriflow.com', 'admin', '$2b$10$1234567890123456789012uQiLTjHhSXXBUlqJ4cL4J8RvZu3jRTW', 1, NOW()),
  ('22222222-2222-2222-2222-222222222222', 'agriculteur@agriflow.com', 'agriculteur', '$2b$10$1234567890123456789012uQiLTjHhSXXBUlqJ4cL4J8RvZu3jRTW', 2, NOW());

-- Terrains
INSERT INTO land (id_land, land_name, land_area, land_coordinate, id_user, land_creation_date, land_modification_date)
VALUES 
  ('33333333-3333-3333-3333-333333333333', 'Ferme principale', 10000, NULL, '22222222-2222-2222-2222-222222222222', NOW(), NOW()),
  ('44444444-4444-4444-4444-444444444444', 'Terrain secondaire', 5000, NULL, '22222222-2222-2222-2222-222222222222', NOW(), NOW());

-- Espaces de culture
INSERT INTO cultivation_spaces (id, cultivation_space_name, cultivation_spaces_commentary, cultivation_spaces_area, cultivation_space_type, cultivation_spaces_length, cultivation_spaces_width, cultivation_spaces_soil_type, cultivation_spaces_ph, cultivation_spaces_soil_fertility, cultivation_spaces_soil_drainage, land_id)
VALUES 
  ('55555555-5555-5555-5555-555555555555', 'Potager principal', 'Espace dédié aux légumes', 200, 'potager', 20, 10, 'argileux', 7, 'bonne', 'bon', '33333333-3333-3333-3333-333333333333'),
  ('66666666-6666-6666-6666-666666666666', 'Verger', 'Espace dédié aux arbres fruitiers', 500, 'verger', 25, 20, 'limoneux', 6, 'moyenne', 'moyen', '33333333-3333-3333-3333-333333333333');

-- Planches de culture
INSERT INTO cultivation_beds (id, name, description, length, width, area, soil_type, ph_level, fertility_level, drainage_level, cultivation_space_id, created_at, updated_at)
VALUES 
  ('77777777-7777-7777-7777-777777777777', 'Planche de tomates', 'Planche dédiée aux tomates', 5.0, 1.2, 6.0, 'Argileux', 6.5, 'Bonne', 'Moyen', '55555555-5555-5555-5555-555555555555', NOW(), NOW()),
  ('88888888-8888-8888-8888-888888888888', 'Planche de salades', 'Planche dédiée aux salades', 4.0, 1.0, 4.0, 'Limoneux', 7.0, 'Moyenne', 'Bon', '55555555-5555-5555-5555-555555555555', NOW(), NOW());

-- Cultures
INSERT INTO crops (id_crop, crop_name, crop_variety, crop_family, crop_growth_time)
VALUES 
  ('99999999-9999-9999-9999-999999999999', 'Tomate', 'Roma', 'Solanacées', 90),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Salade', 'Batavia', 'Astéracées', 45);

-- Statuts de culture
INSERT INTO crop_statuses (id, name, description, color, display_order, is_predefined, created_at, updated_at)
VALUES 
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'En croissance', 'La culture est en phase de croissance', '#4CAF50', 1, TRUE, NOW(), NOW()),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Prêt à récolter', 'La culture est prête à être récoltée', '#FFC107', 2, TRUE, NOW(), NOW());

-- Actions agricoles
INSERT INTO agricultural_actions (id, type, action_date, commentary, cultivation_space_id, cultivation_bed_id, crop_id, created_at, updated_at)
VALUES 
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'plantation', NOW() - INTERVAL '10 days', 'Plantation des tomates', '55555555-5555-5555-5555-555555555555', '77777777-7777-7777-7777-777777777777', '99999999-9999-9999-9999-999999999999', NOW(), NOW()),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'arrosage', NOW() - INTERVAL '2 days', 'Arrosage des salades', '55555555-5555-5555-5555-555555555555', '88888888-8888-8888-8888-888888888888', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NOW(), NOW());

-- Observations
INSERT INTO observations (id, observation_date, temperature, humidity, precipitation, wind_speed, wind_direction, pressure, weather_condition, cultivation_space_id, land_id, created_at, updated_at)
VALUES 
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', NOW() - INTERVAL '5 days', 25.5, 65, 0, 5.2, 'NO', 1013.25, 'Ensoleillé', '55555555-5555-5555-5555-555555555555', NULL, NOW(), NOW()),
  ('gggggggg-gggg-gggg-gggg-gggggggggggg', NOW() - INTERVAL '2 days', 22.0, 75, 2.5, 10.0, 'SE', 1010.50, 'Partiellement nuageux', NULL, '33333333-3333-3333-3333-333333333333', NOW(), NOW());

-- Zones
INSERT INTO areas (id_area, area_name, area_description, latitude, longitude, created_at, updated_at)
VALUES 
  ('hhhhhhhh-hhhh-hhhh-hhhh-hhhhhhhhhhhh', 'Zone Nord', 'Zone nord de la ferme', 48.8566, 2.3522, NOW(), NOW()),
  ('iiiiiiii-iiii-iiii-iiii-iiiiiiiiiiii', 'Zone Sud', 'Zone sud de la ferme', 48.8500, 2.3400, NOW(), NOW());

-- Couvertures de sol
INSERT INTO soil_cover (id_soil_cover, type_soil_cover)
VALUES 
  ('jjjjjjjj-jjjj-jjjj-jjjj-jjjjjjjjjjjj', 'Paillis'),
  ('kkkkkkkk-kkkk-kkkk-kkkk-kkkkkkkkkkkk', 'Bâche');

-- Notifications
INSERT INTO notifications (id, type, title, content, priority, scheduled_date, is_read, is_sent, sent_date, related_entity_id, related_entity_type, is_recurring, recurrence_pattern, user_id, created_at, updated_at)
VALUES 
  ('llllllll-llll-llll-llll-llllllllllll', 'rappel_action', 'Rappel d''arrosage', 'N''oubliez pas d''arroser vos tomates aujourd''hui', 'moyenne', NOW() + INTERVAL '1 day', FALSE, FALSE, NULL, '77777777-7777-7777-7777-777777777777', 'cultivation_bed', FALSE, NULL, '22222222-2222-2222-2222-222222222222', NOW(), NOW()),
  ('mmmmmmmm-mmmm-mmmm-mmmm-mmmmmmmmmmmm', 'statut_culture', 'Tomates prêtes à récolter', 'Vos tomates semblent prêtes à être récoltées', 'haute', NOW(), FALSE, TRUE, NOW(), '99999999-9999-9999-9999-999999999999', 'crop', FALSE, NULL, '22222222-2222-2222-2222-222222222222', NOW(), NOW());

-- Préférences de notification
INSERT INTO notification_preferences (id, user_id, email_enabled, push_enabled, sms_enabled, crop_alerts_enabled, weather_alerts_enabled, task_reminders_enabled, enabled_types, enabled_channels, email, phone, daily_digest_time, weekly_digest_days, created_at, updated_at)
VALUES 
  (1, 1, TRUE, TRUE, FALSE, TRUE, TRUE, TRUE, 'rappel_action,statut_culture,système', 'email,application', 'admin@agriflow.com', NULL, '08:00', '1,3,5', NOW(), NOW()),
  (2, 2, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'rappel_action,statut_culture,système,alerte_météo', 'email,application,push,sms', 'agriculteur@agriflow.com', '+33612345678', '07:00', '1,2,3,4,5', NOW(), NOW());
