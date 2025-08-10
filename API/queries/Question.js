let addQuestion = `
INSERT INTO questions(skill_id, question_text, option_a, option_b, option_c, option_d, correct_option, created_by)
VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`;

let getQuestionsBySkill = `SELECT * FROM questions WHERE skill_id = ?`;

module.exports = { addQuestion, getQuestionsBySkill };