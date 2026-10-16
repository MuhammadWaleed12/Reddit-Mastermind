"""
Data models for the Reddit Mastermind application.
"""

from pydantic import BaseModel, Field


class Persona(BaseModel):
    """Represents a target persona for engagement."""

    name: str
    description: str


class Subreddit(BaseModel):
    """Represents a target subreddit."""

    name: str
    description: str | None = None


class CompanyInfo(BaseModel):
    """Information about the company being promoted."""

    name: str
    description: str
    target_audience: str


class InputData(BaseModel):
    """Input payload for generating a calendar."""

    company_info: CompanyInfo
    personas: list[Persona] = Field(min_length=1)
    subreddits: list[Subreddit] = Field(min_length=1)
    queries: list[str] = Field(min_length=1)
    posts_per_week: int = Field(ge=1)


class Comment(BaseModel):
    """A comment on a reddit post."""

    author: str  # Persona name
    content: str
    depth: int = 0


class Post(BaseModel):
    """A planned reddit post."""

    day: str  # "Monday", "Tuesday", etc.
    subreddit: str
    author: str  # Persona name
    title: str
    content: str
    comments: list[Comment] = Field(default_factory=list)


class WeekCalendar(BaseModel):
    """The output schedule for a week."""

    week_number: int
    posts: list[Post]
