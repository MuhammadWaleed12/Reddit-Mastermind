import random
from collections import defaultdict

from models import CompanyInfo, InputData, Persona, Subreddit
from planner import DAYS_OF_WEEK, Planner


def planner_input(posts_per_week=10):
    return InputData(
        company_info=CompanyInfo(
            name="Acme Analytics",
            description="Retail analytics",
            target_audience="Shop owners",
        ),
        personas=[
            Persona(name="Owner", description="Runs a shop"),
            Persona(name="Analyst", description="Studies performance"),
        ],
        subreddits=[
            Subreddit(name="smallbusiness"),
            Subreddit(name="analytics"),
        ],
        queries=["inventory forecasting", "weekly reporting"],
        posts_per_week=posts_per_week,
    )


def test_generate_week_returns_requested_chronological_posts():
    random.seed(42)

    calendar = Planner().generate_week(planner_input(), week_offset=2)

    assert calendar.week_number == 3
    assert len(calendar.posts) == 10
    assert [DAYS_OF_WEEK.index(post.day) for post in calendar.posts] == sorted(
        DAYS_OF_WEEK.index(post.day) for post in calendar.posts
    )


def test_generate_week_avoids_duplicate_subreddit_per_day_when_possible():
    random.seed(42)
    posts_by_day = defaultdict(list)

    for post in Planner().generate_week(planner_input()).posts:
        posts_by_day[post.day].append(post.subreddit)

    for subreddits in posts_by_day.values():
        assert len(subreddits) == len(set(subreddits))


def test_generated_comments_use_a_different_persona():
    random.seed(42)

    calendar = Planner().generate_week(planner_input(posts_per_week=7))

    for post in calendar.posts:
        assert all(comment.author != post.author for comment in post.comments)
