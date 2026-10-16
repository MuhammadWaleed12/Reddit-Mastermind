import pytest
from pydantic import ValidationError

from models import Comment, CompanyInfo, InputData, Persona, Post, Subreddit


def valid_input(**overrides):
    values = {
        "company_info": CompanyInfo(
            name="Acme Analytics",
            description="Retail analytics",
            target_audience="Shop owners",
        ),
        "personas": [Persona(name="Owner", description="Runs a shop")],
        "subreddits": [Subreddit(name="smallbusiness")],
        "queries": ["inventory forecasting"],
        "posts_per_week": 1,
    }
    values.update(overrides)
    return values


@pytest.mark.parametrize(
    ("field", "value"),
    [
        ("personas", []),
        ("subreddits", []),
        ("queries", []),
        ("posts_per_week", 0),
    ],
)
def test_input_requires_planner_choices(field, value):
    with pytest.raises(ValidationError):
        InputData(**valid_input(**{field: value}))


def test_post_comments_are_not_shared():
    first = Post(
        day="Monday", subreddit="python", author="Owner", title="A", content="A"
    )
    second = Post(
        day="Tuesday", subreddit="python", author="Owner", title="B", content="B"
    )

    first.comments.append(Comment(author="Analyst", content="Useful"))

    assert second.comments == []
