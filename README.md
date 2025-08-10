## 🧪 API Endpoints Overview

### User Auth
- `POST /sign_up` — User registration
- `POST /login` — User login, returns JWT token
- `GET /logout` — User logout

### Skills
- `POST /add_skill` — Add a new skill (admin only)
- `GET /get_all_skills` — Get all skills

### Questions
- `POST /add_questions` — Add quiz questions (admin only)
- `GET /get_question_by_skill/:skill_id` — Get questions for a skill

### Quiz Flow
- `POST /start` — Start a quiz attempt
- `POST /answer` — Submit answer for a question
- `POST /finish` — Finish quiz and calculate score

### Reports
- `GET /user/:user_id` — Get quiz attempts for a user
- `GET /skill-gap/:user_id` — Get skill gap report for a user
- `GET /time-based?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD` — Get quiz attempts within a date range

### Admin
- `GET /get_all_users` — Get all registered users (admin only)\

---