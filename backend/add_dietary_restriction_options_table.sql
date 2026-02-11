-- Add dietary_restriction_options table (for existing DBs created before this feature).
-- psql -U postgres -d children_meals_db -f add_dietary_restriction_options_table.sql

CREATE TABLE IF NOT EXISTS dietary_restriction_options (
  id SERIAL PRIMARY KEY,
  label VARCHAR(255) NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS ix_dietary_restriction_options_id ON dietary_restriction_options (id);

-- Seed defaults if table is empty
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

