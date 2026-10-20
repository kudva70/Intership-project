
from fastapi import FastAPI
from pydantic import BaseModel, Field

app = FastAPI(
    title="SignalDesk AI",
    description="AI-assisted incident triage and resolution",
    version="0.1.0",
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
