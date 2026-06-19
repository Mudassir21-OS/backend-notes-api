-- Writing JOIN Queries — Reading Data Across Related Tables
-- Sohail Smart Solutions Internship Assignment

-- 1. All submissions with student name + task title
-- INNER JOIN across students, tasks, and submissions

SELECT 
    s.full_name,
    t.title,
    sub.status,
    sub.submitted_at
FROM submissions sub
JOIN students s ON sub.student_id = s.id
JOIN tasks t ON sub.task_id = t.id;


-- 2. Every student and their submission count
-- LEFT JOIN includes students even if they have zero submissions

SELECT 
    s.full_name,
    COUNT(sub.id) AS total_submissions
FROM students s
LEFT JOIN submissions sub ON s.id = sub.student_id
GROUP BY s.full_name;


-- 3. All tasks that have NOT been submitted by anyone
-- LEFT JOIN + IS NULL finds unmatched task rows

SELECT 
    t.id,
    t.title,
    t.description
FROM tasks t
LEFT JOIN submissions sub ON t.id = sub.task_id
WHERE sub.id IS NULL;


-- 4. Custom JOIN query
-- Business question: Which student submissions are still pending?

SELECT 
    s.full_name,
    t.title AS task_title,
    sub.status,
    sub.submitted_at
FROM submissions sub
JOIN students s ON sub.student_id = s.id
JOIN tasks t ON sub.task_id = t.id
WHERE sub.status = 'pending'
ORDER BY sub.submitted_at DESC;