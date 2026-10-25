# SignalDesk AI — Next.js Landing Page

A responsive landing page and interactive demo UI for the SignalDesk AI intelligent issue triage prototype.

## Curriculum alignment

The JourneyBuddy AI curriculum's integration project describes a Next.js web client, Node.js/FastAPI API layer, Firebase Authentication, Redis rate limiting, MongoDB Atlas Vector Search and Pinecone retrieval, a LangChain agent, Docker, and Google Cloud Platform. The curriculum also asks for an architectural README and a clear client/server boundary.

This repo implements the **Next.js client and local FastAPI demo integration**. The page labels future infrastructure as planned, not implemented. The current SignalDesk prototype uses FastAPI, rule-based classification, TF-IDF/cosine similarity, and local JSON sample data. Firebase, Redis, MongoDB/Pinecone, LangChain, Docker, and GCP are shown as roadmap items only until actually configured and tested.

## Run locally

Requirements: Node.js 20+ and npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

On Windows PowerShell, if `cp` is unavailable:

```powershell
Copy-Item .env.example .env.local
```

Open [http://localhost:3000](http://localhost:3000).

## Connect the existing FastAPI backend

Start the existing SignalDesk backend from its project root:

```powershell
python -m uvicorn backend.main:app --reload
```

The Next.js demo calls `POST ${NEXT_PUBLIC_API_URL}/incidents/analyze`. By default `NEXT_PUBLIC_API_URL` is `http://127.0.0.1:8000`.

Ensure FastAPI CORS allows `http://localhost:3000` and `http://127.0.0.1:3000`. The expected response includes the fields from the SignalDesk Day 3–5 implementation, such as `category`, `priority`, `similar_incidents`, `troubleshooting_guides`, `recommended_team`, `suggested_action`, and `requires_human_approval`. The page handles missing optional arrays gracefully, but category/priority explanations assume the backend returns those fields.

## Architecture and rendering boundary

- `app/layout.tsx`: root layout and static metadata.
- `app/page.tsx`: client component because the interactive incident demo uses React state and browser `fetch`.
- `app/globals.css`: responsive layout and visual design.
- The landing-page content can be split into Server Components later; keep only the interactive demo form/results in a Client Component when refactoring.

## Notes

- The decorative hero dashboard is a static visual preview, not live telemetry.
- Similarity scores are text similarity values, not probabilities.
- Recommendations are for human review. No operational actions are executed.
- Avoid submitting credentials, secrets, or sensitive production incident information to the demo.

## Reference documentation

- Next.js: https://nextjs.org/docs
- FastAPI: https://fastapi.tiangolo.com/
- Node.js: https://nodejs.org/en/docs/
- Firebase Authentication: https://firebase.google.com/docs/auth
- MongoDB Atlas Vector Search: https://www.mongodb.com/docs/atlas/atlas-vector-search/
- Pinecone: https://docs.pinecone.io/
- Redis: https://redis.io/docs/
- Docker: https://docs.docker.com/
- Google Cloud: https://cloud.google.com/docs
- LangChain: https://python.langchain.com/docs/
