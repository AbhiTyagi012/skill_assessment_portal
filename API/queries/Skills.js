let addSkill = `INSERT INTO skills(name, description) VALUES(?, ?)`;
let getSkills = `SELECT * FROM skills`;

module.exports = { addSkill, getSkills };