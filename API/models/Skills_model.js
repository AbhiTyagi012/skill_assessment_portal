var sql = require("mysql2");
var queries = require("../queries/Skills");
const bcrypt = require("bcrypt");
const axios = require("axios");

async function addSkill(req, res) {
    try {
        const { name, description } = req.body;

        await connection.query(
            queries.addSkill,
            [name, description]
        );

        res.json({
            status: "success",
            message: "Skill Added"
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getSkills(req, res) {
    try {
        const [results] = await connection.query(
            queries.getSkills
        );

        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
  addSkill,
  getSkills
};