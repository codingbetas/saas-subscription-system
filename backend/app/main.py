from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app import models
from app.routers import auth, users, plans, subscription, admin

app = FastAPI(title="SaaS Subscription System")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"https://.*\.vercel\.app|http://localhost:3000|http://127.0.0.1:3000",  # frontend URL
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