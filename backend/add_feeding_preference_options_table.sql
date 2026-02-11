-- Add feeding_preference_options table (for existing DBs created before this feature).
-- psql -U postgres -d children_meals_db -f add_feeding_preference_options_table.sql

CREATE TABLE IF NOT EXISTS feeding_preference_options (
  id SERIAL PRIMARY KEY,
  label VARCHAR(255) NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS ix_feeding_preference_options_id ON feeding_preference_options (id);

-- Seed defaults if table is empty
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

