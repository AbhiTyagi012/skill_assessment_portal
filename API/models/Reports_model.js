const queries = require("../queries/Reports");

// 1. User Performance
async function userPerformance(req, res) {
    try {
        let user_id = req.params.user_id;
        const [results] = await connection.query(queries.userPerformance, [user_id]);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// 2. Skill Gap
async function skillGapReport(req, res) {
    try {
        let user_id = req.params.user_id;
        const [results] = await connection.query(queries.skillGapReport, [user_id]);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// 3. Time-based
async function timeBasedReport(req, res) {
    try {
        let { start_date, end_date } = req.query;
        const [results] = await connection.query(queries.timeBasedReport, [start_date, end_date]);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { userPerformance, skillGapReport, timeBasedReport };
