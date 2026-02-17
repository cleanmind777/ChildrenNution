-- Add avatar_url to children table for child profile image
ALTER TABLE children ADD COLUMN IF NOT EXISTS avatar_url VARCHAR;
