# 🐄 Milking Tracker with Music 🎵

A fullstack web application that helps dairy farmers track milking sessions while playing relaxing music to enhance milk yield. Built with **React + Next.js** on the frontend and **Node.js + Express + MongoDB/MySQL** on the backend.

---

## 🔗 Live Demo

- 🔹 Frontend: https://milking-tracker-y9g4.vercel.app/
- 🔹 Backend API: https://milking-tracker-zye2.onrender.com/

---

## 🚀 Features

### 🏠 Landing Page
- "Start Milking" button to initiate session
- Link to view Milking History

### ⏱️ Milking Session
- Music plays automatically from a playlist
- Timer starts on session begin
- Controls: Pause, Resume, Stop
- Milk quantity is input at end of session

### 📜 History Page
- Displays session data in table format:
  - Date | Start Time | End Time | Duration | Milk Collected (in Litres)
- Data fetched from API

---

## 🛠️ Tech Stack

| Frontend      | Backend          | Database      |
|---------------|------------------|-------------- |
| React         | Node.js + Express| MongoDB       |

---

## 🧪 API Endpoints

### `GET /session`
Returns all stored sessions.

``` json
[
  {
    "id": 1,
    "start_time": "2025-03-10T14:00:00Z",
    "end_time": "2025-03-10T14:15:00Z",
    "duration": 900,
    "milk_quantity": 5.2
  }
]

### `POST /session`
Creates a new session.

```json
{
  "start_time": "2025-03-10T14:00:00Z",
  "end_time": "2025-03-10T14:15:00Z",
  "duration": 900,
  "milk_quantity": 5.2
}


