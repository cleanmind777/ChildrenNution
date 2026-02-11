-- Seed default dietary restriction options. Run once after creating tables.
-- psql -U postgres -d children_meals_db -f seed_dietary_restriction_options.sql
-- Safe to run multiple times: only inserts if table is empty.

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM dietary_restriction_options LIMIT 1) THEN
    INSERT INTO dietary_restriction_options (label, sort_order) VALUES
      ('Vegetarian', 1),
      ('Vegan', 2),
      ('Dairy-free', 3),
      ('Egg-free', 4),
      ('Gluten-free', 5),
      ('Kosher', 6),
      ('Halal', 7),
      ('Religious / cultural preference', 8);
  END IF;
END $$;

