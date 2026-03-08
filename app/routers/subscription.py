from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timedelta

from app.database import SessionLocal
from app.dependencies import get_current_user
from app import models
from app.schemas import SubscriptionResponse

router = APIRouter(prefix="/subscription", tags=["Subscription"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Check if subscription expired
def check_and_update_subscription(db: Session, subscription: models.Subscription):

    if subscription.end_date and subscription.end_date < datetime.utcnow():
        subscription.is_active = False
        db.commit()


# Subscribe to a plan
@router.post("/subscribe/{plan_id}", response_model=SubscriptionResponse)
def subscribe(
    plan_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):

    existing_subscription = db.query(models.Subscription).filter(
        models.Subscription.user_id == current_user.id,
        models.Subscription.is_active == True
    ).first()

    if existing_subscription:
        raise HTTPException(
            status_code=400,
            detail="User already has active subscription"
        )

    plan = db.query(models.Plan).filter(
        models.Plan.id == plan_id
    ).first()

    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found")

    start_date = datetime.utcnow()
    end_date = start_date + timedelta(days=plan.duration_days)

    subscription = models.Subscription(
        user_id=current_user.id,
        plan_id=plan_id,
        start_date=start_date,
        end_date=end_date,
        is_active=True
    )

    db.add(subscription)
    db.commit()
    db.refresh(subscription)

    return subscription


# Get my subscription
@router.get("/my-subscription", response_model=SubscriptionResponse)
def get_my_subscription(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):

    subscription = db.query(models.Subscription).filter(
        models.Subscription.user_id == current_user.id,
        models.Subscription.is_active == True
    ).first()

    if not subscription:
        raise HTTPException(status_code=404, detail="No active subscription")

    check_and_update_subscription(db, subscription)

    if not subscription.is_active:
        raise HTTPException(status_code=400, detail="Subscription expired")

    return subscription


# Cancel subscription
@router.post("/cancel")
def cancel_subscription(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):

    subscription = db.query(models.Subscription).filter(
        models.Subscription.user_id == current_user.id,
        models.Subscription.is_active == True
    ).first()

    if not subscription:
        raise HTTPException(status_code=404, detail="No active subscription")

    subscription.is_active = False
    db.commit()

    return {"message": "Subscription cancelled"}

@router.post("/upgrade/{plan_id}", response_model=SubscriptionResponse)
def upgrade_subscription(
    plan_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):

    # Get current active subscription
    current_subscription = db.query(models.Subscription).filter(
        models.Subscription.user_id == current_user.id,
        models.Subscription.is_active == True
    ).first()

    if not current_subscription:
        raise HTTPException(status_code=404, detail="No active subscription")

    # Get new plan
    new_plan = db.query(models.Plan).filter(
        models.Plan.id == plan_id
    ).first()

    if not new_plan:
        raise HTTPException(status_code=404, detail="Plan not found")

    # deactivate old subscription
    current_subscription.is_active = False

    start_date = datetime.utcnow()
    end_date = start_date + timedelta(days=new_plan.duration_days)

    new_subscription = models.Subscription(
        user_id=current_user.id,
        plan_id=new_plan.id,
        start_date=start_date,
        end_date=end_date,
        is_active=True
    )

    db.add(new_subscription)
    db.commit()
    db.refresh(new_subscription)

    return new_subscription