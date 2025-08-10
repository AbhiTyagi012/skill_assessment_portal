import React, { useState, useEffect } from "react";
import {
  getTimeBasedReport,
  getUsers,
  getQuizHistory,
  getSkillPerformance,
} from "../api/userApi";
import "../styles/AdminDashboard.css";

export default function AdminDashboard() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [timeReports, setTimeReports] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [quizHistory, setQuizHistory] = useState([]);
  const [skillPerformance, setSkillPerformance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const allUsers = await getUsers();
        setUsers(allUsers);
      } catch {
        setError("Failed to load users");
      }
    }
    fetchUsers();
  }, []);

  const handleFilter = async () => {
    if (!startDate || !endDate) {
      setError("Please select both start and end dates.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const reports = await getTimeBasedReport(startDate, endDate);
      setTimeReports(reports);
    } catch {
      setError("Failed to load time-based report.");
    } finally {
      setLoading(false);
    }
  };

  const handleUserClick = async (user) => {
    setSelectedUser(user);
    setLoading(true);
    setError("");
    try {
      const history = await getQuizHistory(user.id);
      const performance = await getSkillPerformance(user.id);
      setQuizHistory(history);
      setSkillPerformance(performance);
    } catch {
      setError("Failed to load user report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>

      <div className="filter-container">
        <label>
          Start Date:{" "}
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>

        <label>
          End Date:{" "}
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>

        <button onClick={handleFilter}>Filter</button>
      </div>

      <h3>Time Based Report</h3>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && timeReports.length === 0 && (
        <p>No records found for selected date range.</p>
      )}
      {timeReports.length > 0 && (
        <table className="reports-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Skill</th>
              <th>Score</th>
              <th>Completed At</th>
            </tr>
          </thead>
          <tbody>
            {timeReports.map((item, i) => (
              <tr key={i}>
                <td>{item.user_name}</td>
                <td>{item.skill_name}</td>
                <td>{item.score}</td>
                <td>{new Date(item.completed_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h3>Users</h3>
      <ul className="user-list">
        {users.map((user) => (
          <li
            key={user.id}
            className={selectedUser?.id === user.id ? "selected" : ""}
            onClick={() => handleUserClick(user)}
          >
            {user.name} ({user.email})
          </li>
        ))}
      </ul>

      {selectedUser && (
        <div className="user-report">
          <h3>Report for {selectedUser.name}</h3>

          {!loading && skillPerformance.length === 0 && (
            <p>No skill performance data found.</p>
          )}
          {skillPerformance.length > 0 && (
            <>
              <h4>Skill Performance (Weakest to Strongest)</h4>
              <table className="reports-table">
                <thead>
                  <tr>
                    <th>Skill</th>
                    <th>Average Score</th>
                  </tr>
                </thead>
                <tbody>
                  {skillPerformance.map((item, i) => (
                    <tr key={i}>
                      <td>{item.skill_name}</td>
                      <td>{item.avg_score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {!loading && quizHistory.length === 0 && (
            <p>No quiz attempts found.</p>
          )}
          {quizHistory.length > 0 && (
            <>
              <h4>Quiz Attempt History</h4>
              <table className="reports-table">
                <thead>
                  <tr>
                    <th>Attempts</th>
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
            </>
          )}
        </div>
      )}
    </div>
  );
}
