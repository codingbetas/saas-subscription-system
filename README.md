# SaaS Subscription System 🚀

A full-stack SaaS engine built with a decoupled architecture, featuring a FastAPI backend and a Next.js 16 frontend.

**[Live Demo (Frontend)]**(https://saas-subscription-system.vercel.app)  
**[API Documentation (Swagger)]**(https://saas-subscription-system.onrender.com)

## 📸 Screenshots

<img width="943" height="721" alt="Image" src="https://github.com/user-attachments/assets/6733ce8a-8c8e-489a-83c1-8128744fbd7f" />

---

## 🛠️ Tech Stack
- **Frontend:** Next.js 16.1.6 (App Router), Tailwind CSS, Axios, JWT Interceptors
- **Backend:** FastAPI (Python), SQLAlchemy (ORM), Pydantic v2
- **Database:** SQLite (Production-ready on Render)
- **Deployment:** Vercel (Frontend), Render (Backend)

---

## 📂 Project Structure (Monorepo)
- `/backend`: FastAPI server, SQLite database, and JWT Auth logic.
- `/saas-frontend`: Next.js application with Dashboard, Plans, and Subscription management.

---

## ✨ Features
- **JWT Authentication:** Secure login flow with persistent sessions via LocalStorage.
- **Dynamic Subscriptions:** Real-time plan upgrades, cancellations, and expiry tracking.
- **Admin CRUD:** Private routes for plan creation and system statistics.
- **CORS Regex:** Advanced cross-origin handling for dynamic Vercel preview deployments.
- **Responsive UI:** Modern "Glassmorphism" design built with Tailwind CSS.

---

## 🚀 How to Run Locally

### Backend
1. `cd backend`
2. `pip install -r requirements.txt`
3. `uvicorn app.main:app --reload`

### Frontend
1. `cd saas-frontend`
2. `npm install`
3. `npm run dev`

---

## 🔮 Future Roadmap
- [ ] Manual Payment Verification (QR Code + Receipt Upload)
- [ ] Stripe/Razorpay API Integration
- [ ] Multi-tenant organization support
