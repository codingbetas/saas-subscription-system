from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app import models
from app.routers import auth, users, plans, subscription, admin

app = FastAPI(title="SaaS Subscription System")

origins = [
    "http://localhost:3000",    # Local development
    "http://127.0.0.1:3000",    # Local development alternative
    "https://saas-subscription-system.onrender.com", # Add your future Vercel URL here
]
# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables
Base.metadata.create_all(bind=engine)

@app.get("/")
def health():
    return {"message": "SaaS system running successfully"}

# Include routers
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(plans.router)
app.include_router(subscription.router)
app.include_router(admin.router)