# PostgreSQL Setup Guide

This guide will help you set up PostgreSQL for the Children Meals application.

## Installation

### Windows

1. Download PostgreSQL from: https://www.postgresql.org/download/windows/
2. Run the installer
3. Remember the password you set for the `postgres` user
4. PostgreSQL will be installed as a Windows service

### macOS

Using Homebrew:
```bash
brew install postgresql@15
brew services start postgresql@15
```

### Linux (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

## Create Database

### Method 1: Using psql command line

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE children_meals_db;

# Create a user (optional, recommended)
CREATE USER children_meals_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE children_meals_db TO children_meals_user;

# Exit
\q
```

### Method 2: Using createdb command

```bash
createdb children_meals_db
```

### Method 3: Using pgAdmin (GUI)

1. Open pgAdmin
2. Right-click on "Databases"
3. Select "Create" → "Database"
4. Enter name: `children_meals_db`
5. Click "Save"

## Configure Connection String

Update your `.env` file:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/children_meals_db
```

### Examples:

**Using default postgres user:**
```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/children_meals_db
```

**Using custom user:**
```env
DATABASE_URL=postgresql://children_meals_user:your_password@localhost:5432/children_meals_db
```

**Remote database:**
```env
DATABASE_URL=postgresql://username:password@hostname:5432/children_meals_db
```

**With SSL (production):**
```env
DATABASE_URL=postgresql://username:password@hostname:5432/children_meals_db?sslmode=require
```

## Verify Connection

Test the connection:

```bash
# Using psql
psql -U postgres -d children_meals_db

# Or test from Python
python -c "from app.database import engine; engine.connect(); print('Connected!')"
```

## Common Issues

### Connection Refused

**Problem:** `connection refused` or `could not connect to server`

**Solutions:**
1. Check if PostgreSQL is running:
   ```bash
   # Windows
   services.msc  # Look for PostgreSQL service
   
   # Linux/Mac
   sudo systemctl status postgresql
   # or
   pg_isready
   ```

2. Check PostgreSQL is listening on the correct port (default: 5432)

3. Verify firewall settings allow connections

### Authentication Failed

**Problem:** `password authentication failed`

**Solutions:**
1. Verify username and password in `.env`
2. Check `pg_hba.conf` file for authentication settings
3. Reset password if needed:
   ```bash
   psql -U postgres
   ALTER USER username WITH PASSWORD 'new_password';
   ```

### Database Does Not Exist

**Problem:** `database "children_meals_db" does not exist`

**Solution:**
```bash
createdb children_meals_db
```

### Permission Denied

**Problem:** `permission denied for database`

**Solution:**
```bash
psql -U postgres
GRANT ALL PRIVILEGES ON DATABASE children_meals_db TO your_username;
```

## Useful Commands

```bash
# List all databases
psql -U postgres -l

# Connect to database
psql -U postgres -d children_meals_db

# List all tables
\dt

# Describe a table
\d table_name

# Exit psql
\q

# Check PostgreSQL version
psql --version

# Check if PostgreSQL is running
pg_isready
```

## Production Considerations

1. **Use a dedicated database user** (not `postgres`)
2. **Set strong passwords**
3. **Enable SSL connections**
4. **Configure connection pooling**
5. **Set up regular backups**
6. **Monitor database performance**
7. **Use environment variables** for credentials (never hardcode)

## Backup and Restore

### Backup
```bash
pg_dump -U postgres children_meals_db > backup.sql
```

### Restore
```bash
psql -U postgres children_meals_db < backup.sql
```

## Next Steps

After setting up PostgreSQL:

1. Update `.env` with your `DATABASE_URL`
2. Run the FastAPI server - tables will be created automatically
3. (Optional) Seed sample data: `python app/seed_data.py`
