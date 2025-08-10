const express = require("express");
const router = express.Router();
const auth_model = require("../models/Auth_model");
const skills_model = require("../models/Skills_model");
const questions_model = require("../models/Question_model");
const quiz_model = require("../models/Quiz_model");
const reports_model = require("../models/Reports_model");
const session = require("../Authentication/session");


router.post("/login", auth_model.login);

router.post("/sign_up",auth_model.sign_up);

router.post("/add_skill",session.authenticate, skills_model.addSkill);  

router.get("/get_all_skills",session.authenticate,skills_model.getSkills);

router.post("/add_questions", session.authenticate,questions_model.addQuestion);

router.get("/get_question_by_skill/:skill_id",session.authenticate, questions_model.getQuestionsBySkill);

router.post("/start",session.authenticate, quiz_model.startQuiz);

router.post("/answer",session.authenticate, quiz_model.submitAnswer);

router.post("/finish", session.authenticate,quiz_model.finishQuiz);

router.get("/user/:user_id",session.authenticate, reports_model.userPerformance);


router.get("/skill-gap/:user_id", session.authenticate,reports_model.skillGapReport);

// Time-based report (week/month filter)
router.get("/time-based", session.authenticate,reports_model.timeBasedReport);

router.get("/get_all_users",session.authenticate,auth_model.getAllUsers);

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.json({
      status: "success",
      message: "Logged out",
    });
});



module.exports = router;
