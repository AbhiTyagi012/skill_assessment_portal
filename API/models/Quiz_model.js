var queries = require("../queries/Quiz");

async function startQuiz(req, res) {
    try {
        const { user_id, skill_id, total_questions } = req.body;

        const [result] = await connection.query(
            queries.startQuiz,
            [user_id, skill_id, total_questions]
        );

        res.json({ attempt_id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function submitAnswer(req, res) {
    try {
        const { attempt_id, question_id, selected_option } = req.body;

        const [results] = await connection.query(
            queries.getCorrectOption,
            [question_id]
        );

        if (!results.length) {
            return res.status(404).json({ error: "Question not found" });
        }

        const is_correct = results[0].correct_option === selected_option;

        await connection.query(
            queries.submitAnswer,
            [attempt_id, question_id, selected_option, is_correct]
        );

        res.json({ correct: is_correct });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function finishQuiz(req, res) {
    try {
        const { attempt_id } = req.body;

        const [results] = await connection.query(
            queries.countCorrectAnswers,
            [attempt_id]
        );

        const correct = results[0]?.correct_count || 0;

        await connection.query(
            queries.finishQuiz,
            [correct, attempt_id]
        );

        res.json({ status: "success", correct_answers: correct });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { startQuiz, submitAnswer, finishQuiz };
