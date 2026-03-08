from fastapi import FastAPI
from app.database import engine, Base
from app import models
from app.routers import auth, users, plans, subscription, admin

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="SaaS Subscription System")

@app.get("/")
def health():
    return {"message": "SaaS system running successfully"}

# Include routers
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(plans.router)
app.include_router(subscription.router)
app.include_router(admin.router)