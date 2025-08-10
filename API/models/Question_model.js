var queries = require("../queries/Question");

async function addQuestion(req, res) {
    try {
        const { skill_id, question_text, option_a, option_b, option_c, option_d, correct_option, created_by } = req.body;

        await connection.query(
            queries.addQuestion,
            [skill_id, question_text, option_a, option_b, option_c, option_d, correct_option, created_by]
        );

        res.json({ status: "success", message: "Question Added" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getQuestionsBySkill(req, res) {
    try {
        const skill_id = req.params.skill_id;
        console.log(skill_id)
        const [results] = await connection.query(
            queries.getQuestionsBySkill,
            [skill_id]
        );

        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { addQuestion, getQuestionsBySkill };