-- Seed default feeding preference options. Run once after creating tables.
-- psql -U postgres -d children_meals_db -f seed_feeding_preference_options.sql
-- Safe to run multiple times: only inserts if table is empty.

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM feeding_preference_options LIMIT 1) THEN
    INSERT INTO feeding_preference_options (label, sort_order) VALUES
      ('Prefers soft foods', 1),
      ('Avoids mixed textures', 2),
      ('Avoids crunchy foods', 3),
      ('Avoids slippery foods', 4),
      ('Sensitive to strong smells', 5),
      ('Currently in feeding therapy', 6);
  END IF;
END $$;

