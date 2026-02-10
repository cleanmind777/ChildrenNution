-- =============================================================================
-- Children Meals - Create Tables Only (PostgreSQL)
-- =============================================================================
-- Use when the database already exists. Run against children_meals_db:
--   psql -U postgres -d children_meals_db -f create_tables_only.sql
-- =============================================================================

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

-- Table: quizzes
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

SELECT 'Tables created successfully.' AS status;
