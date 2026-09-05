# Reddit Mastermind

A full-stack content-planning prototype that turns company context, audience personas, target subreddits, and campaign queries into a structured weekly Reddit calendar.

[View the deployed frontend](https://reddit-mastermind-wine.vercel.app)

> **Current scope:** the backend uses a deterministic local `MockLLM` content generator. No paid model API or external AI service is required.

## What it does

- Accepts company information, target personas, subreddits, topics, and a weekly post count.
- Distributes posts across the seven-day calendar.
- Avoids reusing the same subreddit on the same day when alternatives exist.
- Produces typed post and comment objects through Pydantic models.
- Exposes the planner through a FastAPI endpoint.
- Presents the generated plan in a React interface with motion and responsive styling.

## Architecture

```text
frontend/              React 19 + Vite + Tailwind CSS
backend/
├── main.py            FastAPI application and /api/generate endpoint
├── models.py          Pydantic request and response contracts
├── planner.py         Scheduling and mock content-generation logic
└── requirements.txt   Python runtime dependencies
vercel.json            Frontend deployment configuration
```

The frontend calls the FastAPI API. The API validates the request with Pydantic, delegates scheduling to `Planner`, and returns a typed `WeekCalendar`.

## Tech stack

| Layer | Technology |
| --- | --- |
| Frontend | React 19, Vite, Tailwind CSS, Framer Motion |
| Backend | Python, FastAPI, Uvicorn |
| Validation | Pydantic |
| HTTP client | Axios |
| Deployment | Vercel frontend, Render-compatible backend |

## Run locally

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
uvicorn main:app --reload
```

On Windows, activate the environment with `.venv\\Scripts\\activate`. The API runs at `http://localhost:8000`, and interactive documentation is available at `http://localhost:8000/docs`.

### Frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`.

## API

`POST /api/generate`

Example request:

```json
{
  "company_info": {
    "name": "Acme Analytics",
    "description": "Analytics for small retailers",
    "target_audience": "Independent shop owners"
  },
  "personas": [
    {
      "name": "Operations Lead",
      "description": "Runs daily store operations"
    },
    {
      "name": "Data Analyst",
      "description": "Evaluates retail performance"
    }
  ],
  "subreddits": [
    {
      "name": "smallbusiness",
      "description": "Small-business discussions"
    }
  ],
  "queries": ["inventory forecasting", "retail analytics"],
  "posts_per_week": 3
}
```

The response contains a `week_number` and a list of scheduled posts with day, subreddit, author persona, title, content, and generated comments.

## Quality and limitations

- Content selection currently uses Python's `random` module and reusable mock templates.
- The API allows all CORS origins for development; restrict this before production use.
- The prototype does not publish content to Reddit.
- A production version should add authentication, persistent storage, tests, rate limiting, and a real model provider behind an explicit interface.

## Roadmap

- Add deterministic planner unit tests.
- Introduce an interchangeable LLM provider interface.
- Add persistence for saved calendars.
- Add export to JSON and CSV.
- Harden CORS and deployment configuration.
