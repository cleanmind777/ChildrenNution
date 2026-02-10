-- Seed default food allergy options. Run once after creating tables.
-- psql -U postgres -d children_meals_db -f seed_food_allergy_options.sql
-- Safe to run multiple times: only inserts if table is empty.

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM food_allergy_options LIMIT 1) THEN
    INSERT INTO food_allergy_options (label, sort_order) VALUES
      ('Milk / Dairy', 1),
      ('Eggs', 2),
      ('Peanuts', 3),
      ('Tree nuts', 4),
      ('Soy', 5),
      ('Wheat', 6),
      ('Fish', 7),
      ('Shellfish', 8),
      ('Sesame', 9);
  END IF;
END $$;
