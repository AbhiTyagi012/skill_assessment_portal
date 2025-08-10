import React, { useEffect, useState } from "react";
import { getQuizHistory, getSkillPerformance } from "../api/userApi";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const [quizHistory, setQuizHistory] = useState([]);
  const [skillPerformance, setSkillPerformance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    async function fetchData() {
      try {
        const historyData = await getQuizHistory(localStorage.user_id);
        const performanceData = await getSkillPerformance(localStorage.user_id);

        setQuizHistory(historyData);
        setSkillPerformance(performanceData);
      } catch (err) {
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [localStorage.user_id]);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="dashboard-container">
      <h2>My Dashboard</h2>

      {/* Skill Performance Table */}
      <h3>Skill Performance (Weakest to Strongest)</h3>
      {skillPerformance.length === 0 ? (
        <p>No skill performance data found.</p>
      ) : (
        <table className="reports-table">
          <thead>
            <tr>
              <th>Skill</th>
              <th>Average Score</th>
            </tr>
          </thead>
          <tbody>
            {skillPerformance.map((item, index) => (
              <tr key={index}>
                <td>{item.skill_name}</td>
                <td>{item.avg_score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Quiz History Table */}
      <h3>Quiz Attempt History</h3>
      {quizHistory.length === 0 ? (
        <p>No quiz attempts found.</p>
      ) : (
        <table className="reports-table">
          <thead>
            <tr>
              <th>Attempt ID</th>
              <th>Skill</th>
              <th>Total Questions</th>
              <th>Correct Answers</th>
              <th>Score</th>
              <th>Completed At</th>
            </tr>
          </thead>
          <tbody>
            {quizHistory.map((item, i) => (
              <tr key={item.attempt_id}>
                <td>{i + 1}</td> {/* Serial number starting from 1 */}
                <td>{item.skill_name}</td>
                <td>{item.total_questions}</td>
                <td>{item.correct_answers}</td>
                <td>{item.score}</td>
                <td>{new Date(item.completed_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
