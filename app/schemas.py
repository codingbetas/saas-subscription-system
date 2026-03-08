from pydantic import BaseModel, EmailStr
from datetime import datetime


class UserCreate(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    email: EmailStr
    role: str
    created_at: datetime

    model_config = {"from_attributes": True}


class PlanCreate(BaseModel):
    name: str
    price: float
    duration_days: int


class PlanResponse(BaseModel):
    id: int
    name: str
    price: float
    duration_days: int
    is_active: bool

    model_config = {"from_attributes": True}


class SubscriptionCreate(BaseModel):
    plan_id: int


class SubscriptionResponse(BaseModel):
    id: int
    user_id: int
    plan_id: int
    is_active: bool
    start_date: datetime
    end_date: datetime

    model_config = {"from_attributes": True}