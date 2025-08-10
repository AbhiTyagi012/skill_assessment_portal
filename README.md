# 🧑‍💻 Skill Assessment Portal

A web-based system where users can register, take skill-based quizzes (MCQs), and view performance reports. Admins can manage users, skill categories, questions, and generate detailed reports.

---

## 🔗 Live Demo


---

## 🚀 Features

### 👥 User Management
- User registration and login with JWT-based authentication
- Role-based access control (`admin` and `user`)

### 📝 Skill & Quiz Management
- Admin can add skill categories and quiz questions
- Users can select skills and take quizzes
- Save quiz attempts with selected answers and scores

### 📊 Performance Reports
- User-wise quiz performance reports
- Skill gap identification based on average scores
- Time-based reports (filter by week/month)
- Admin dashboard with aggregate user and skill data

### 🔒 Secure APIs
- JWT token verification on all protected routes
- Pagination and filtering support in APIs

---

## 🛠️ Tech Stack

| Frontend            | Backend           | Database         |
|---------------------|-------------------|------------------|
| React + React Router| Node.js + Express | MySQL            |

---

## Usage Notes

- All protected routes require the `Authorization: Bearer <token>` header with a valid JWT.
- Admin users have access to additional endpoints to manage users, skills, and questions.
- Frontend manages user sessions and stores JWT tokens in localStorage.

---

## Running Locally

1. Clone the repo
2. Setup MySQL database
3. Configure `.env` with database and JWT secret info
4. Run backend server
5. Run frontend React app

---


