"""
Core logic for planning the Reddit content calendar.
"""
import random
from typing import List, Dict, Set
from models import InputData, WeekCalendar, Post, Comment

DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

class MockLLM:
    """Simulates LLM generation for content."""

    @staticmethod
    def generate_post_content(topic: str, persona: str, company: str) -> Dict[str, str]:
        """Generates a mock post title and body."""
        titles = [
            f"Question about {topic}?",
            f"Has anyone tried {company} for {topic}?",
            f"My experience with {topic} so far...",
            f"Why is {topic} so hard?",
            f"Looking for advice on {topic}"
        ]
        bodies = [
            f"I've been looking into {topic} and I'm a bit stuck. "
            f"I heard about {company} but want to know if it's legit.",
            f"Hey everyone, just wondering if {topic} is worth the hype. "
            f"I'm a {persona} and I need a solution.",
            f"Just a quick rant about {topic}. Why does nobody talk about the real issues?",
            f"I found this tool {company} while searching for {topic}. Thoughts?",
        ]
        return {
            "title": random.choice(titles),
            "content": random.choice(bodies)
        }

    @staticmethod
    def generate_comment(post_title: str, persona: str, sentiment: str = "neutral") -> str:
        """Generates a mock comment."""
        # Unused arguments for now, but keeping signature for future expansion
        _ = (post_title, sentiment)
        comments = [
            f"Totally agree with this! As a {persona}, I feel the same.",
            "Interesting perspective.",
            "Have you tried checking the wiki?",
            "I used to have this issue too.",
            "This checks out.",
            "Big if true."
        ]
        return random.choice(comments)

class Planner:
    """Orchestrates the creation of the content calendar."""

    def __init__(self):
        pass

    def generate_week(self, data: InputData, week_offset: int = 0) -> WeekCalendar:
        """Generates a full week of posts based on input data."""
        posts: List[Post] = []

        # Determine slots
        # Evenly distribute posts across the week
        slots = []
        full_weeks = data.posts_per_week // 7
        remainder = data.posts_per_week % 7

        # Add full weeks (every day gets a post)
        for _ in range(full_weeks):
            slots.extend(DAYS_OF_WEEK)

        # Add remaining days (randomly select unique days)
        if remainder > 0:
            slots.extend(random.sample(DAYS_OF_WEEK, remainder))

        # Sort slots by day index
        slots.sort(key=DAYS_OF_WEEK.index)

        # Track usage to avoid "Overposting in a subreddit"
        # dict: day -> set(subreddits)
        usage_tracker: Dict[str, Set[str]] = {day: set() for day in DAYS_OF_WEEK}

        for day in slots:
            # 1. Select Subreddit
            # Try to find a subreddit not used today
            available_subs = [
                s.name for s in data.subreddits
                if s.name not in usage_tracker[day]
            ]
            if not available_subs:
                # Fallback: just pick any
                sub_name = random.choice(data.subreddits).name
            else:
                sub_name = random.choice(available_subs)

            usage_tracker[day].add(sub_name)

            # 2. Select Persona (OP)
            op_persona = random.choice(data.personas)

            # 3. Select Topic/Query
            topic = random.choice(data.queries)

            # 4. Generate Content
            content_data = MockLLM.generate_post_content(
                topic, op_persona.name, data.company_info.name
            )

            # 5. Generate Comments
            # Randomly 1-3 comments from OTHER personas
            comments = []
            other_personas = [p for p in data.personas if p.name != op_persona.name]
            # pylint: disable=line-too-long
            num_comments = random.randint(1, min(3, len(other_personas))) if other_personas else 0

            for _ in range(num_comments):
                commenter = random.choice(other_personas)
                c_text = MockLLM.generate_comment(content_data["title"], commenter.name)
                comments.append(Comment(author=commenter.name, content=c_text))

            post = Post(
                day=day,
                subreddit=sub_name,
                author=op_persona.name,
                title=content_data["title"],
                content=content_data["content"],
                comments=comments
            )
            posts.append(post)

        return WeekCalendar(week_number=1 + week_offset, posts=posts)
