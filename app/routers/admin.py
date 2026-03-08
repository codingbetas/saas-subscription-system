from fastapi import APIRouter

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.get("/dashboard")
def admin_dashboard():
    return {"message": "Admin dashboard coming soon"}

# Admin management routes will be added here
# Example future features:
# - Manage users
# - Manage subscription plans
# - View platform analytics