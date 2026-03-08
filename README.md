# SaaS Subscription System

A backend SaaS system built using **FastAPI** that supports authentication,
plan management, and subscription lifecycle.

## Features

- JWT Authentication
- OAuth2 Login
- User Registration
- Plan Creation and Listing
- Subscription Management
- Upgrade / Cancel Subscription
- Subscription Expiry Handling
- Modular FastAPI Router Architecture
- Admin Router Placeholder

## Tech Stack

- Python
- FastAPI
- SQLAlchemy
- SQLite
- JWT Authentication
- Pydantic

## Project Structure

app/
routers/
auth.py
users.py
plans.py
subscription.py
admin.py

models.py
schemas.py
database.py
dependencies.py

main.py

## Run Project

Install dependencies

pip install -r requirements.txt

Run server

uvicorn app.main:app --reload

Open API docs

http://127.0.0.1:8000/docs

## Future Improvements

- Admin dashboard APIs
- Subscription billing integration
- Payment gateway support
- Plan analytics