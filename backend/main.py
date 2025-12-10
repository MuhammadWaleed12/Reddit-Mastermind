"""
Entry point for the Reddit Mastermind Backend API.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import InputData, WeekCalendar
from planner import Planner

app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev, allow all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

planner = Planner()

@app.post("/api/generate", response_model=WeekCalendar)
async def generate_calendar(data: InputData):
    """
    Generates a weekly content calendar based on the provided inputs.
    """
    # Basic generation for week 1
    # If we wanted subsequent weeks, we could accept a "week_offset" param
    # For now, just generate the next logical week.
    return planner.generate_week(data)
