let startQuiz = `
INSERT INTO quiz_attempts(user_id, skill_id, total_questions, correct_answers, score)
VALUES (?, ?, ?, 0, 0)
`;

let getCorrectOption = `SELECT correct_option FROM questions WHERE id = ?`;

let submitAnswer = `
INSERT INTO quiz_answers(attempt_id, question_id, selected_option, is_correct)
VALUES (?, ?, ?, ?)
`;

let countCorrectAnswers = `
SELECT COUNT(*) AS correct_count FROM quiz_answers WHERE attempt_id = ? AND is_correct = 1
`;

let finishQuiz = `
UPDATE quiz_attempts
SET correct_answers = ?, score = (correct_answers / total_questions) * 100, completed_at = NOW()
WHERE id = ?
`;

module.exports = { startQuiz, getCorrectOption, submitAnswer, countCorrectAnswers, finishQuiz };
    