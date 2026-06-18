-- Sohail Platform Core Schema
-- Database Relationships & Schema Design Assignment

DROP TABLE IF EXISTS submissions;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS students;

CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    university VARCHAR(120),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    deadline DATE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE submissions (
    id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    task_id INTEGER NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'pending',
    submitted_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO students (full_name, email, university)
VALUES
('Syed Mudassir Shahab', 'mudassir@example.com', 'American University of Ras Al Khaimah'),
('Ahmed Khan', 'ahmed@example.com', 'American University of Ras Al Khaimah'),
('Sara Ali', 'sara@example.com', 'American University of Ras Al Khaimah');

INSERT INTO tasks (title, description, deadline)
VALUES
('Database Schema Design', 'Create relational tables for students, tasks, and submissions.', '2026-06-19'),
('API Testing', 'Test backend API endpoints using Thunder Client or Postman.', '2026-06-22'),
('Weekly Internship Report', 'Prepare and submit the weekly internship progress report.', '2026-06-25');

INSERT INTO submissions (student_id, task_id, status)
VALUES
(1, 1, 'submitted'),
(1, 2, 'pending'),
(2, 1, 'submitted'),
(2, 3, 'pending'),
(3, 2, 'submitted');