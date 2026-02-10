-- Add medical_notes to children table (run on existing DB if table was created before this column existed)
-- psql -U postgres -d children_meals_db -f add_medical_notes_column.sql

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'children' AND column_name = 'medical_notes'
  ) THEN
    ALTER TABLE children ADD COLUMN medical_notes TEXT;
  END IF;
END $$;
