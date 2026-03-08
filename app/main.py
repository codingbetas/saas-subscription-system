from fastapi import FastAPI
from app.database import engine, Base
from app import models
from app.routers import users
from app.routers import auth
from app.routers import plans
from app.routers import auth, users, plans, subscription
from app.routers import admin

Base.metadata.create_all(bind=engine)

app = FastAPI(title="SaaS Subscription System")

@app.get("/")
def health():
    return {"message": "SaaS system running successfully"}

app.include_router(users.router)
app.include_router(auth.router)
app.include_router(plans.router)
app.include_router(subscription.router)
app.include_router(admin.router)