"""
Data models for the Reddit Mastermind application.
"""
from typing import List, Optional
from pydantic import BaseModel

class Persona(BaseModel):
    """Represents a target persona for engagement."""
    name: str
    description: str

class Subreddit(BaseModel):
    """Represents a target subreddit."""
    name: str
    description: Optional[str] = None

class CompanyInfo(BaseModel):
    """Information about the company being promoted."""
    name: str
    description: str
    target_audience: str

class InputData(BaseModel):
    """Input payload for generating a calendar."""
    company_info: CompanyInfo
    personas: List[Persona]
    subreddits: List[Subreddit]
    queries: List[str]
    posts_per_week: int

class Comment(BaseModel):
    """A comment on a reddit post."""
    author: str  # Persona name
    content: str
    depth: int = 0

class Post(BaseModel):
    """A planned reddit post."""
    day: str # "Monday", "Tuesday", etc.
    subreddit: str
    author: str # Persona name
    title: str
    content: str
    comments: List[Comment] = []

class WeekCalendar(BaseModel):
    """The output schedule for a week."""
    week_number: int
    posts: List[Post]
