# Pulsepal
# PulsePal - AI-Powered Health & Wellness Assistant

PulsePal is a cross-platform application (Mobile + Web) designed to provide proactive, empathetic mental and physical wellness support. It combines real-time health tracking with conversational AI powered by Gemini to help users manage stress, improve sleep, and stay healthy.

---

## 🧠 Key Features

* **Health Metrics Logging:**

  * Sleep Hours, Hydration (L), Heart Rate (bpm), Steps, Mood, Stress Level

* **Conversational AI Support:**

  * Personalized mental health chat assistant powered by Gemini
  * Context-aware responses based on latest user health data

* **Proactive AI Engagement:**

  * Daily check-ins based on recent health trends
  * Encouragement and habit-building nudges

* **Web Dashboard:**

  * Health trends visualization
  * Access to full chat history

---

## 🛠 Tech Stack

* **Frontend (Mobile):** Flutter
* **Frontend (Web):** React.js
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **AI API:** Gemini (Google Generative Language API)
* **Session Management:** express-session + connect-mongo

---

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Emmanuel246/Pulsepal.git
cd pulsepal
```

### 2. Backend Setup

```bash
cd backend
npm install
```

* Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
SESSION_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

### 3. Run the Server

```bash
npm start
```

### 4. Frontend Setup

Instructions for mobile and web frontend are in their respective folders.

---

## 📡 API Endpoints

### Auth (if enabled)

* `POST /api/auth/register`
* `POST /api/auth/login`

### Health Data

* `POST /api/health` – Submit metrics
* `GET /api/health/latest` – (To be added) Fetch latest data

### Chat

* `POST /api/ai` – Send message to AI

---

## 🤖 Gemini AI Prompt Structure

```
You are a caring wellness assistant. Based on the user's recent health data and message, provide an empathetic, helpful reply. End with a wellness tip or follow-up question.
```

---


---

## 📌 Roadmap / To-Do

* Add user profile management
* Health Connect & wearable integration
* Deploy on Vercel
* Push notification system (FCM)

---

## 💡 Inspiration

This project was built for the **AI for Social Impact Hackathon 2025** to address the growing need for accessible mental and physical health tools.

---

## 📄 License

MIT License
