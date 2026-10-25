# SignalDesk AI — Intelligent Issue Triage & Resolution Assistant

SignalDesk AI is a prototype for analyzing technical incidents, identifying likely categories and priorities, finding similar incidents and troubleshooting guidance, and recommending a support team or next action. Recommendations are intended for human review; the prototype does not execute operational actions.

This project supports **two frontend options**:

1. **HTML/CSS/JavaScript frontend** — the original lightweight frontend in `frontend/`.
2. **Next.js frontend** — the newer React-based landing page and interactive demo in `signaldesk-nextjs/`.

Both frontends use the same local FastAPI backend. You can run either frontend independently; you do not need to run both at once.

## Features in the current prototype

- Incident classification and priority assignment using the current backend logic.
- Similar-incident retrieval using TF-IDF and cosine similarity over local sample data.
- Troubleshooting-guide retrieval from local JSON knowledge-base data.
- Suggested support team and next action.
- Human-approval flag for recommendations.

> **Implementation status:** The current prototype uses FastAPI, Pydantic, scikit-learn, and local JSON data. Firebase Authentication, Redis, MongoDB Atlas Vector Search, Pinecone, LangChain, Docker, and Google Cloud are curriculum-aligned roadmap items unless they have been separately configured and tested. Do not describe them as implemented based on this prototype alone.

## Project layout

The following is the expected combined repository layout. If your folder names differ, adjust the `cd` commands accordingly. If you extracted the Next.js project as a standalone folder, run the Next.js commands from that folder directly (do not run `cd signaldesk-nextjs` again). The HTML frontend and FastAPI backend must remain in the main repository for their respective steps to work.

```text
signaldesk-ai/
├── backend/
│   ├── main.py
│   └── data/
│       ├── incidents.json
│       └── troubleshooting.json
├── frontend/                  # Original HTML/CSS/JavaScript frontend
│   ├── index.html
│   ├── style.css
│   └── script.js
├── signaldesk-nextjs/         # Next.js frontend project
│   ├── app/
│   ├── package.json
│   └── .env.example
├── tests/
│   └── test_api.py
├── requirements.txt
└── README.md
```

## Requirements

- Python 3.10+ recommended for the FastAPI backend.
- Node.js 20+ and npm for the Next.js frontend.
- Git is optional for running the app, but recommended for version control.

## 1. Run the app with the HTML/CSS/JavaScript frontend

Open **two terminals** from the root of the `signaldesk-ai` repository.

### Terminal 1 — start the FastAPI backend

```powershell
# Optional: create a virtual environment once
python -m venv .venv

# Windows PowerShell activation
.\.venv\Scripts\Activate.ps1

# Install Python dependencies
python -m pip install -r requirements.txt

# Start the API
python -m uvicorn backend.main:app --reload
```

The API should be available at `http://127.0.0.1:8000`. You can check `http://127.0.0.1:8000/health` and explore `http://127.0.0.1:8000/docs` if those routes are enabled in your backend.

### Terminal 2 — serve the HTML frontend

```powershell
cd frontend
python -m http.server 5500
```

Open **http://localhost:5500** in your browser. Keep both terminals running while using the app.

**Important:** Serving the HTML through a local HTTP server is more reliable than opening `index.html` directly as a `file://` URL. If the page cannot call the API, check the browser console and configure FastAPI CORS to allow `http://localhost:5500` and `http://127.0.0.1:5500`.

## 2. Run the app with the Next.js frontend

Keep the FastAPI backend running as described above. Open a **new terminal** at the repository root.

### Install and configure the frontend

```powershell
# Run this from the main repository root.
cd signaldesk-landing
npm install
Copy-Item .env.example .env.local
```

If your terminal is already inside the extracted `signaldesk-nextjs` folder, skip the `cd signaldesk-nextjs` line and run the remaining commands there.

The `.env.local` file should contain:

```dotenv
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

If `.env.local` already exists, check the value rather than overwriting your local settings.

### Start Next.js

```powershell
npm run dev
```

Open **http://localhost:3000**. Keep the Next.js terminal and FastAPI terminal running.

For a production build test, run these commands from `signaldesk-landing/`:

```powershell
npm run build
npm run start
```

### CORS configuration

The FastAPI backend must allow the origin of whichever frontend you use. For the Next.js frontend, allow:

- `http://localhost:3000`
- `http://127.0.0.1:3000`

For the HTML frontend, also allow:

- `http://localhost:5500`
- `http://127.0.0.1:5500`

Configure these origins in the backend's CORS middleware if they are not already present. Restart FastAPI after changing the configuration.

## API integration

The Next.js interactive demo sends a request to:

```text
POST /incidents/analyze
```

The full URL is formed from `NEXT_PUBLIC_API_URL`, for example `http://127.0.0.1:8000/incidents/analyze`. The response is expected to include incident analysis fields such as `category`, `priority`, `similar_incidents`, `troubleshooting_guides`, `recommended_team`, `suggested_action`, and `requires_human_approval`. The exact response must match the implementation in `backend/main.py`.

## Tests

From the repository root, after installing the Python dependencies and any test dependencies listed in `requirements.txt`:

```powershell
python -m pytest -v
```

If `pytest` is not installed in the active environment, install it with `python -m pip install pytest`.

## Troubleshooting

- **`npm` is not recognized:** Install Node.js 20+ and reopen the terminal.
- **Python package import errors:** Activate the virtual environment and run `python -m pip install -r requirements.txt` from the repository root.
- **Frontend cannot reach the API:** Confirm FastAPI is running on port `8000`, check `NEXT_PUBLIC_API_URL` for Next.js, and verify CORS origins.
- **Port already in use:** Stop the other process or use a different port and update the frontend/API configuration as appropriate.
- **Next.js changes to environment variables do not apply:** Stop and restart `npm run dev` after editing `.env.local`.

## Architecture and curriculum alignment

- **HTML frontend:** static HTML, CSS, and browser JavaScript.
- **Next.js frontend:** App Router, TypeScript, React, and a responsive interactive incident demo.
- **API:** FastAPI with validated request/response handling.
- **Current retrieval approach:** TF-IDF/cosine similarity and local JSON sample data.
- **Roadmap:** Firebase Authentication, Redis caching/session/rate limiting, MongoDB Atlas Vector Search and/or Pinecone, LangChain agent orchestration, Docker, and deployment to Google Cloud. These should be marked complete only after implementation and verification.

## Safety and limitations

- Similarity scores indicate text similarity; they are not calibrated probabilities.
- Suggested resolutions are advisory and require human review.
- Do not submit passwords, secrets, or sensitive production incident details to this demo.

## Reference documentation

- Next.js: https://nextjs.org/docs
- Node.js: https://nodejs.org/en/docs/
- FastAPI: https://fastapi.tiangolo.com/
- Pydantic: https://docs.pydantic.dev/
- scikit-learn: https://scikit-learn.org/stable/
