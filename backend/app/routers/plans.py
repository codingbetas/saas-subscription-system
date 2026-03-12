from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app import models, schemas
from app.dependencies import get_current_user

router = APIRouter(prefix="/plans", tags=["Plans"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Create plan
@router.post("/", response_model=schemas.PlanResponse)
def create_plan(
    plan: schemas.PlanCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    existing_plan = db.query(models.Plan).filter(
        models.Plan.name == plan.name
    ).first()

    if existing_plan:
        raise HTTPException(status_code=400, detail="Plan already exists")

    new_plan = models.Plan(
        name=plan.name,
        price=plan.price,
        duration_days=plan.duration_days
    )

    db.add(new_plan)
    db.commit()
    db.refresh(new_plan)

    return new_plan


# List all plans
@router.get("/", response_model=list[schemas.PlanResponse])
def get_plans(db: Session = Depends(get_db)):

    plans = db.query(models.Plan).filter(
        models.Plan.is_active == True
    ).all()

    return plans