
# SignalDesk AI

An intelligent issue triage and resolution assistant that
classifies technical incidents, retrieves similar past incidents,
and suggests troubleshooting steps for human review.

## Features

- Rule-based incident categorization
- Rule-based priority estimation
- Explainable classification results
- Similar incident retrieval using TF-IDF and cosine similarity
- Troubleshooting knowledge base
- Suggested support team and resolution steps
- Human approval safeguard
- FastAPI backend and browser-based frontend

## Tech Stack

- Python
- FastAPI
- Pydantic
- scikit-learn
- HTML, CSS and JavaScript
- JSON sample datasets
- Pytest

## Project Structure

backend/
  main.py
  data/
    incidents.json
    troubleshooting.json

frontend/
  index.html
  style.css
  script.js

tests/
  test_api.py

## Setup

Create and activate a virtual environment:

    python -m venv .venv

Windows PowerShell:

    .\.venv\Scripts\Activate.ps1

Install dependencies:

    pip install -r requirements.txt

Start the backend from the project root:

    python -m uvicorn backend.main:app --reload

Open the frontend using your configured local development
server, or use the existing local setup.

API documentation:

    http://127.0.0.1:8000/docs

Health endpoint:

    http://127.0.0.1:8000/health

## Main API

POST /incidents/analyze

Accepts an incident title and description. Returns the
classification, priority, similar incidents, troubleshooting
guides and suggested next steps.

## Limitations

- Classification currently uses keyword-based rules.
- Retrieval uses text similarity, not semantic understanding.
- The included incident records are sample data.
- Similarity scores are not probabilities of a correct diagnosis.
- Recommendations can be inaccurate and require human review.
- The prototype does not execute repairs or production changes.

## Future Improvements

- User authentication and role-based access
- Persistent incident storage
- Semantic search using embeddings
- Integration with an approved AI model
- Auditable approval workflows
- Containerization and cloud deployment
