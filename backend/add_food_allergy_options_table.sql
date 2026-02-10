-- Add food_allergy_options table (for existing DBs created before this feature).
-- psql -U postgres -d children_meals_db -f add_food_allergy_options_table.sql

CREATE TABLE IF NOT EXISTS food_allergy_options (
  id SERIAL PRIMARY KEY,
  label VARCHAR(255) NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS ix_food_allergy_options_id ON food_allergy_options (id);

-- Seed defaults if table is empty
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM food_allergy_options LIMIT 1) THEN
    INSERT INTO food_allergy_options (label, sort_order) VALUES
      ('Milk / Dairy', 1), ('Eggs', 2), ('Peanuts', 3), ('Tree nuts', 4),
      ('Soy', 5), ('Wheat', 6), ('Fish', 7), ('Shellfish', 8), ('Sesame', 9);
  END IF;
END $$;
