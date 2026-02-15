-- Migration: replace age with birthday (run on existing DB that has age column)
-- psql -U postgres -d children_meals_db -f add_birthday_column.sql

-- Add birthday column (nullable first for backfill)
ALTER TABLE children ADD COLUMN IF NOT EXISTS birthday DATE;

-- Backfill: set birthday from age (approximate: today minus age years)
UPDATE children
SET birthday = (CURRENT_DATE - (age::text || ' years')::interval)::date
WHERE birthday IS NULL AND age IS NOT NULL;

-- If any rows still have NULL birthday, set a safe default (e.g. 5 years ago)
UPDATE children SET birthday = CURRENT_DATE - interval '5 years' WHERE birthday IS NULL;

-- Make birthday NOT NULL
ALTER TABLE children ALTER COLUMN birthday SET NOT NULL;

-- Drop age column
ALTER TABLE children DROP COLUMN IF EXISTS age;
