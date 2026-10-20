
from fastapi import FastAPI
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="SignalDesk AI",
    description="AI-assisted incident triage and resolution",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500",
        "null",
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

class IncidentRequest(BaseModel):
    title: str = Field(min_length=3, max_length=120)
    description: str = Field(min_length=10, max_length=2000)


@app.get("/")
def home():
    return {
        "message": "SignalDesk AI is running",
        "version": "0.1.0",
    }


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.post("/incidents/preview")
def preview_incident(incident: IncidentRequest):
    return {
        "title": incident.title,
        "description": incident.description,
        "status": "received",
        "message": "Incident received successfully.",
    }
