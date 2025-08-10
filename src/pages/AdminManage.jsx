import React, { useState, useEffect } from "react";
import { addSkill, addQuestion, getSkills } from "../api/userApi";
import "../styles/AdminManage.css";

export default function AdminManage() {
  const [activeTab, setActiveTab] = useState("skill"); 

  // Skill form state
  const [skillData, setSkillData] = useState({ name: "", description: "" });
  const [skillMessage, setSkillMessage] = useState("");

  // Question form state
  const [skills, setSkills] = useState([]);
  const [questionData, setQuestionData] = useState({
    skill_id: "",
    question_text: "",
    option_a: "",
    option_b: "",
    option_c: "",
    option_d: "",
    correct_option: "A",
    created_by: 1, // update as per logged-in admin ID
  });
  const [questionMessage, setQuestionMessage] = useState("");

  useEffect(() => {
    async function fetchSkills() {
      try {
        const data = await getSkills();
        setSkills(data);
      } catch (err) {
        console.error("Failed to load skills");
      }
    }
    fetchSkills();
  }, []);

  // Handlers for skill form
  const handleSkillChange = (e) => {
    setSkillData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    setSkillMessage("");
    if (!skillData.name.trim()) {
      setSkillMessage("Skill name is required");
      return;
    }
    try {
      const res = await addSkill(skillData);
      if (res.status === "success") {
        setSkillMessage("Skill added successfully!");
        setSkillData({ name: "", description: "" });
        // Refresh skills for question form
        const updatedSkills = await getSkills();
        setSkills(updatedSkills);
      } else {
        setSkillMessage("Failed to add skill");
      }
    } catch (err) {
      setSkillMessage("Error: " + err.message);
    }
  };

  // Handlers for question form
  const handleQuestionChange = (e) => {
    setQuestionData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    setQuestionMessage("");
    const q = questionData;
    if (!q.skill_id) {
      setQuestionMessage("Please select a skill.");
      return;
    }
    if (!q.question_text.trim()) {
      setQuestionMessage("Question text is required.");
      return;
    }
    if (
      !q.option_a.trim() ||
      !q.option_b.trim() ||
      !q.option_c.trim() ||
      !q.option_d.trim()
    ) {
      setQuestionMessage("All options are required.");
      return;
    }

    try {
      const res = await addQuestion(questionData);
      if (res.status === "success") {
        setQuestionMessage("Question added successfully!");
        setQuestionData({
          skill_id: "",
          question_text: "",
          option_a: "",
          option_b: "",
          option_c: "",
          option_d: "",
          correct_option: "A",
          created_by: 1,
        });
      } else {
        setQuestionMessage("Failed to add question");
      }
    } catch (err) {
      setQuestionMessage("Error: " + err.message);
    }
  };

  return (
    <div className="admin-manage-container">
      <h2>Admin Management</h2>
      <div className="tabs">
        <button
          className={activeTab === "skill" ? "active" : ""}
          onClick={() => setActiveTab("skill")}
        >
          Add Skill
        </button>
        <button
          className={activeTab === "question" ? "active" : ""}
          onClick={() => setActiveTab("question")}
        >
          Add Question
        </button>
      </div>

      {activeTab === "skill" && (
        <form className="form" onSubmit={handleSkillSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Skill Name"
            value={skillData.name}
            onChange={handleSkillChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description (optional)"
            value={skillData.description}
            onChange={handleSkillChange}
            rows={3}
          />
          <button type="submit">Add Skill</button>
          {skillMessage && <p className="form-message">{skillMessage}</p>}
        </form>
      )}

      {activeTab === "question" && (
        <form className="form" onSubmit={handleQuestionSubmit}>
          <select
            name="skill_id"
            value={questionData.skill_id}
            onChange={handleQuestionChange}
            required
          >
            <option value="">-- Select Skill --</option>
            {skills.map((skill) => (
              <option key={skill.id} value={skill.id}>
                {skill.name}
              </option>
            ))}
          </select>

          <textarea
            name="question_text"
            placeholder="Enter the question"
            value={questionData.question_text}
            onChange={handleQuestionChange}
            rows={3}
            required
          />

          <input
            type="text"
            name="option_a"
            placeholder="Option A"
            value={questionData.option_a}
            onChange={handleQuestionChange}
            required
          />
          <input
            type="text"
            name="option_b"
            placeholder="Option B"
            value={questionData.option_b}
            onChange={handleQuestionChange}
            required
          />
          <input
            type="text"
            name="option_c"
            placeholder="Option C"
            value={questionData.option_c}
            onChange={handleQuestionChange}
            required
          />
          <input
            type="text"
            name="option_d"
            placeholder="Option D"
            value={questionData.option_d}
            onChange={handleQuestionChange}
            required
          />

          <label>
            Correct Option:
            <select
              name="correct_option"
              value={questionData.correct_option}
              onChange={handleQuestionChange}
              required
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </label>

          <button type="submit">Add Question</button>
          {questionMessage && <p className="form-message">{questionMessage}</p>}
        </form>
      )}
    </div>
  );
}
