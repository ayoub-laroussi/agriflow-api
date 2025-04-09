-- Suite des données de test pour l'application AgriFlow
-- Notifications et préférences de notification

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

-- Insertion des préférences de notification
INSERT INTO notification_preferences (id, user_id, email_enabled, push_enabled, sms_enabled, crop_alerts_enabled, weather_alerts_enabled, task_reminders_enabled, created_at, updated_at)
VALUES
  (uuid_generate_v4(), user_id_1, true, true, false, true, true, true, NOW(), NOW()),
  (uuid_generate_v4(), user_id_2, true, false, true, true, true, true, NOW(), NOW());

-- Insertion des notifications
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

END $$; 