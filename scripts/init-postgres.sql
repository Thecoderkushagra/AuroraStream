-- Create Databases for Microservices
CREATE DATABASE user_db;
CREATE DATABASE metadata_db;

-- Create Local Application User
CREATE USER aurora_local WITH PASSWORD 'aurora_pass';

-- Grant Database Privileges
GRANT ALL PRIVILEGES ON DATABASE user_db TO aurora_local;
GRANT ALL PRIVILEGES ON DATABASE metadata_db TO aurora_local;

-- Setup User Schema
\c user_db
CREATE SCHEMA IF NOT EXISTS user_schema AUTHORIZATION aurora_local;
GRANT ALL ON SCHEMA user_schema TO aurora_local;
ALTER DEFAULT PRIVILEGES IN SCHEMA user_schema GRANT ALL ON TABLES TO aurora_local;

-- Setup Metadata Schema
\c metadata_db
CREATE SCHEMA IF NOT EXISTS metadata_schema AUTHORIZATION aurora_local;
GRANT ALL ON SCHEMA metadata_schema TO aurora_local;
ALTER DEFAULT PRIVILEGES IN SCHEMA metadata_schema GRANT ALL ON TABLES TO aurora_local;
