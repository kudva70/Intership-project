
# SignalDesk AI

An AI-assisted incident triage and resolution assistant.

## Problem

Technical support teams receive incident reports that can be
difficult to classify, prioritize, and resolve consistently.

SignalDesk AI aims to help users classify incidents, retrieve
similar past issues, and suggest evidence-based troubleshooting.

## Planned features

- Incident submission and validation
- Incident classification and prioritization
- Similar-incident retrieval
- Knowledge-based troubleshooting suggestions
- Human approval for proposed actions

## Technology

- Python
- FastAPI
- Pydantic
- scikit-learn
- HTML, CSS, and JavaScript

## Run locally

Create and activate a Python virtual environment, then install:

    pip install -r requirements.txt

Run the backend from the project root:

    python -m uvicorn backend.main:app --reload

Open http://127.0.0.1:8000/docs to test the API.

## Project status

Initial backend prototype. AI-assisted classification,
retrieval, and resolution features are under development.
