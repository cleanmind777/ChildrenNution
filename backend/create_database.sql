-- =============================================================================
-- Children Meals - Database Creation Script (PostgreSQL)
-- =============================================================================
-- Run as postgres superuser:  psql -U postgres -f create_database.sql
--
-- If the database or user already exists, those commands will fail; you can
-- run create_tables_only.sql instead:  psql -U postgres -d children_meals_db -f create_tables_only.sql
-- =============================================================================

-- -----------------------------------------------------------------------------
-- SECTION 1: Create database and user (run connected to 'postgres' or 'template1')
-- -----------------------------------------------------------------------------

-- Create database
CREATE DATABASE children_meals_db;

-- Create application user (change 'your_password' in production)
CREATE USER children_meals_user WITH PASSWORD 'your_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE children_meals_db TO children_meals_user;
ALTER DATABASE children_meals_db OWNER TO children_meals_user;

-- Connect to the new database (psql only; for other clients run create_tables_only.sql on children_meals_db)
\connect children_meals_db

-- Grant schema privileges for the app user
GRANT ALL ON SCHEMA public TO children_meals_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO children_meals_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO children_meals_user;

-- -----------------------------------------------------------------------------
-- SECTION 2: Create enum types and tables
-- -----------------------------------------------------------------------------

-- Enum types (match SQLAlchemy models)
DO $$ BEGIN
  CREATE TYPE mealtype AS ENUM ('breakfast', 'lunch', 'dinner', 'snack');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE gender AS ENUM ('male', 'female', 'other');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE activitytype AS ENUM ('quiz', 'video');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Table: users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR NOT NULL UNIQUE,
  hashed_password VARCHAR NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  is_verified BOOLEAN DEFAULT FALSE,
  verification_code VARCHAR,
  verification_code_expires TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc')
);

CREATE INDEX IF NOT EXISTS ix_users_id ON users (id);
CREATE INDEX IF NOT EXISTS ix_users_email ON users (email);

-- Table: children
CREATE TABLE IF NOT EXISTS children (
  id SERIAL PRIMARY KEY,
  parent_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  name VARCHAR NOT NULL,
  age INTEGER NOT NULL,
  sex gender NOT NULL,
  food_allergies TEXT,
  dietary_restrictions TEXT,
  feeding_preferences TEXT,
  medical_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc')
);

CREATE INDEX IF NOT EXISTS ix_children_id ON children (id);
CREATE INDEX IF NOT EXISTS ix_children_parent_id ON children (parent_id);

-- Table: food_allergy_options (admin-managed list for add-child flow)
CREATE TABLE IF NOT EXISTS food_allergy_options (
  id SERIAL PRIMARY KEY,
  label VARCHAR(255) NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS ix_food_allergy_options_id ON food_allergy_options (id);

-- Table: dietary_restriction_options (admin-managed list for add-child flow)
CREATE TABLE IF NOT EXISTS dietary_restriction_options (
  id SERIAL PRIMARY KEY,
  label VARCHAR(255) NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS ix_dietary_restriction_options_id ON dietary_restriction_options (id);

-- Table: feeding_preference_options (admin-managed list for add-child flow)
CREATE TABLE IF NOT EXISTS feeding_preference_options (
  id SERIAL PRIMARY KEY,
  label VARCHAR(255) NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS ix_feeding_preference_options_id ON feeding_preference_options (id);

-- Table: quizzes (no FK to app tables; referenced by activities)
CREATE TABLE IF NOT EXISTS quizzes (
  id SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  description TEXT,
  questions TEXT NOT NULL,
  coins_reward INTEGER DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc')
);

CREATE INDEX IF NOT EXISTS ix_quizzes_id ON quizzes (id);

-- Table: videos
CREATE TABLE IF NOT EXISTS videos (
  id SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  description TEXT,
  video_url VARCHAR NOT NULL,
  duration_seconds INTEGER NOT NULL,
  coins_reward INTEGER DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc')
);

CREATE INDEX IF NOT EXISTS ix_videos_id ON videos (id);

-- Table: meals
CREATE TABLE IF NOT EXISTS meals (
  id SERIAL PRIMARY KEY,
  child_id INTEGER NOT NULL REFERENCES children (id) ON DELETE CASCADE,
  meal_type mealtype NOT NULL,
  food_image_url VARCHAR,
  nutrition_data TEXT,
  food_category VARCHAR,
  notes TEXT,
  logged_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc')
);

CREATE INDEX IF NOT EXISTS ix_meals_id ON meals (id);
CREATE INDEX IF NOT EXISTS ix_meals_child_id ON meals (child_id);

-- Table: activities
CREATE TABLE IF NOT EXISTS activities (
  id SERIAL PRIMARY KEY,
  child_id INTEGER NOT NULL REFERENCES children (id) ON DELETE CASCADE,
  activity_type activitytype NOT NULL,
  quiz_id INTEGER REFERENCES quizzes (id) ON DELETE SET NULL,
  video_id INTEGER REFERENCES videos (id) ON DELETE SET NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc'),
  coins_earned INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS ix_activities_id ON activities (id);
CREATE INDEX IF NOT EXISTS ix_activities_child_id ON activities (child_id);

-- Table: coins
CREATE TABLE IF NOT EXISTS coins (
  id SERIAL PRIMARY KEY,
  child_id INTEGER NOT NULL REFERENCES children (id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  source VARCHAR NOT NULL,
  source_id INTEGER,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc')
);

CREATE INDEX IF NOT EXISTS ix_coins_id ON coins (id);
CREATE INDEX IF NOT EXISTS ix_coins_child_id ON coins (child_id);

-- Grant table/sequence usage to app user (for tables created above)
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO children_meals_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO children_meals_user;

-- Done
SELECT 'Database and tables created successfully.' AS status;
