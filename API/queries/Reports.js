// 1. User performance (list all attempts)
let userPerformance = `
SELECT qa.id AS attempt_id, s.name AS skill_name, qa.total_questions, qa.correct_answers,
       qa.score, qa.completed_at
FROM quiz_attempts qa
JOIN skills s ON qa.skill_id = s.id
WHERE qa.user_id = ?
ORDER BY qa.completed_at DESC
`;

// 2. Skill gap (average score per skill)
let skillGapReport = `
SELECT s.name AS skill_name, ROUND(AVG(qa.score), 2) AS avg_score
FROM quiz_attempts qa
JOIN skills s ON qa.skill_id = s.id
WHERE qa.user_id = ?
GROUP BY s.name
ORDER BY avg_score ASC
`;

// 3. Time-based report (all attempts in date range)
let timeBasedReport = `
SELECT u.name AS user_name, s.name AS skill_name, qa.score, qa.completed_at
FROM quiz_attempts qa
JOIN users u ON qa.user_id = u.id
JOIN skills s ON qa.skill_id = s.id
WHERE DATE(qa.completed_at) BETWEEN ? AND ?
ORDER BY qa.completed_at DESC
`;

module.exports = { userPerformance, skillGapReport, timeBasedReport };
