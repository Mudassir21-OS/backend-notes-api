# Week 4 Database Setup – PostgreSQL

## Database Used
PostgreSQL

## Platform Used
Neon PostgreSQL

## Database Name
sohail_notes

## Table Name
notes

## Setup Summary
A PostgreSQL database named `sohail_notes` was created using Neon. The database was accessed through the Neon SQL Editor. Inside the database, a table named `notes` was created to store simple note records.

## SQL Used

CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

## Sample Data

INSERT INTO notes (title, content)
VALUES ('First Note', 'Hello PostgreSQL');

## Verification Query

SELECT * FROM notes;

## Result
The database connection, table creation, data insertion, and query verification were completed successfully.