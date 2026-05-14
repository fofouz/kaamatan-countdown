from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client, Client
from dotenv import load_dotenv
import os

# ── Load environment variables from .env ─────────────
load_dotenv()

# ── Initialize FastAPI ────────────────────────────────
app = FastAPI(title="Kaamatan Countdown API")

# ── CORS — allow React frontend to talk to backend ───
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# ── Supabase connection ───────────────────────────────
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise RuntimeError("Missing SUPABASE_URL or SUPABASE_KEY in .env file")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# ── Data models ───────────────────────────────────────
class WishInput(BaseModel):
    name: str = ""
    wish: str

class FeedbackInput(BaseModel):
    name:    str = ""
    message: str = ""
    rating:  int = 0

# ── Health check ──────────────────────────────────────
@app.get("/")
def root():
    return {"message": "Kaamatan Countdown API is running 🌾"}

@app.get("/test")
def test():
    return {
        "supabase_url": SUPABASE_URL[:20] if SUPABASE_URL else "MISSING",
        "supabase_key": SUPABASE_KEY[:10] if SUPABASE_KEY else "MISSING",
    }

# ─────────────────────────────────────────────────────
# WISHES
# ─────────────────────────────────────────────────────

@app.post("/submit-wish")
def submit_wish(data: WishInput):
    """Save a new wish to the database."""
    if not data.wish.strip():
        raise HTTPException(status_code=400, detail="Wish cannot be empty")

    result = supabase.table("wishes").insert({
        "name": data.name.strip() or "Tetamu",
        "wish": data.wish.strip(),
    }).execute()

    return {"message": "Wish saved successfully 🌾", "data": result.data}


@app.get("/wishes")
def get_wishes():
    """Get all wishes — newest first."""
    result = supabase.table("wishes") \
        .select("*") \
        .order("created_at", desc=True) \
        .execute()

    return result.data

# ─────────────────────────────────────────────────────
# FEEDBACK
# ─────────────────────────────────────────────────────

@app.post("/submit-feedback")
def submit_feedback(data: FeedbackInput):
    """Save feedback to the database."""
    if not data.message.strip() and data.rating == 0:
        raise HTTPException(status_code=400, detail="Please provide a rating or message")

    if data.rating < 0 or data.rating > 5:
        raise HTTPException(status_code=400, detail="Rating must be between 0 and 5")

    result = supabase.table("feedback").insert({
        "name":    data.name.strip() or "Tetamu",
        "message": data.message.strip(),
        "rating":  data.rating,
    }).execute()

    return {"message": "Feedback saved successfully 🙏", "data": result.data}


@app.get("/feedback")
def get_feedback():
    """Get all feedback — newest first."""
    result = supabase.table("feedback") \
        .select("*") \
        .order("created_at", desc=True) \
        .execute()

    return result.data