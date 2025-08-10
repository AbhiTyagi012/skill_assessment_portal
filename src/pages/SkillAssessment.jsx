import React, { useState, useEffect } from "react";
import {
  getSkills,
  startQuiz,
  getQuestionsBySkill,
  submitAnswer,
  finishQuiz,
} from "../api/userApi";
import "../styles/SkillAssessment.css";

export default function SkillAssessment() {
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [attemptId, setAttemptId] = useState(null);
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(null);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const res = await getSkills();
        setSkills(res);
      } catch (err) {
        console.error(err);
      }
    }
    fetchSkills();
  }, []);

  const handleStart = async () => {
    if (!selectedSkill) {
      setMessage("Please select a skill first.");
      return;
    }
    try {
      const res = await startQuiz({
        user_id: 1, // Replace with actual logged-in user ID
        skill_id: selectedSkill,
        total_questions: 5,
      });
      setAttemptId(res.attempt_id);
      setQuizStarted(true);
      setMessage("");

      // Fetch questions for this skill
      const qRes = await getQuestionsBySkill(selectedSkill);

      // Randomize and pick only first 5
      const shuffled = [...qRes].sort(() => 0.5 - Math.random());
      setQuestions(shuffled.slice(0, 5));
    } catch (err) {
      setMessage("Error starting quiz");
    }
  };

  const handleAnswer = async (optionKey) => {
    const currentQ = questions[currentIndex];
    try {
      const res = await submitAnswer({
        attempt_id: attemptId,
        question_id: currentQ.id,
        selected_option: optionKey,
      });
      console.log("Answer Result:", res);

      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // Finish quiz
        const finishRes = await finishQuiz({ attempt_id: attemptId });
        setScore(finishRes.correct_answers);
        setQuizStarted(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="assessment-container">
      {!quizStarted && score === null && (
        <>
          <h2>Choose a Skill for Assessment</h2>
          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
          >
            <option value="">-- Select Skill --</option>
            {skills.map((skill) => (
              <option key={skill.id} value={skill.id}>
                {skill.name}
              </option>
            ))}
          </select>
          <button onClick={handleStart}>Start Assessment</button>
          {message && <p className="message">{message}</p>}
        </>
      )}

      {quizStarted && questions.length > 0 && (
        <div className="question-card">
          <h3>
            Question {currentIndex + 1} of {questions.length}
          </h3>
          <p>{questions[currentIndex].question_text}</p>
          <div className="options">
            <button onClick={() => handleAnswer("A")}>
              A. {questions[currentIndex].option_a}
            </button>
            <button onClick={() => handleAnswer("B")}>
              B. {questions[currentIndex].option_b}
            </button>
            <button onClick={() => handleAnswer("C")}>
              C. {questions[currentIndex].option_c}
            </button>
            <button onClick={() => handleAnswer("D")}>
              D. {questions[currentIndex].option_d}
            </button>
          </div>
        </div>
      )}

      {score !== null && (
        <div className="result-card">
          <h2>Assessment Completed!</h2>
          <p>
            Your Score: {score} / {questions.length}
          </p>
          <button
            onClick={() => {
              setScore(null);
              setSelectedSkill("");
              setCurrentIndex(0);
              setQuestions([]);
            }}
          >
            Take Another Assessment
          </button>
        </div>
      )}
    </div>
  );
}
