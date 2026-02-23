# NyaySaathi – Your AI Legal Companion

NyaySaathi is an **AI-powered legal assistance platform** built using **Retrieval-Augmented Generation (RAG)** to provide users with instant, accurate, and reliable legal advice. It combines verified legal knowledge with conversational AI to make legal help more accessible and affordable for everyone in India.

---

## 🚀 Features

- **AI-Powered Legal Advice** – Get instant answers to legal queries via a chatbot.
- **RAG-based Pipeline** – Combines document retrieval from trusted sources with generative AI for accurate responses.
- **Context-Aware Conversations** – Maintains chat history for better, multi-turn dialogue.
- **Full-Stack MERN Application** – Smooth integration of frontend, backend, and AI services.
- **Secure and Scalable** – Ensures privacy of user queries while handling multiple sessions.

---

## 🏗️ Architecture

**Workflow:**
1. User asks a legal question in the chat interface (**React.js** frontend).
2. The backend (**Node.js + Express.js**) processes the request.
3. Relevant legal documents are retrieved from the database (**MongoDB** or vector DB).
4. Retrieved documents are fed into the AI model to generate a context-aware response.
5. The response is sent back to the frontend and displayed instantly.

---

## 🛠 Tech Stack

**Frontend:**
- React.js
- Tailwind CSS (optional styling)

**Backend:**
- Node.js
- Express.js

**Database:**
- MongoDB && Pinecone

**AI:**
- Retrieval-Augmented Generation (RAG) pipeline integrating LLM + document retriever

**Hosting:**
- Frontend: Vercel
- Backend: DigitalOcean

