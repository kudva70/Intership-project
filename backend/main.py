
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(
    title="SignalDesk AI",
    description="AI-assisted incident triage and resolution",
    version="0.2.0",
)

# Local development only
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "null",
        "http://127.0.0.1:5500",
        "http://localhost:5500",
        "http://127.0.0.1:3000",
        "http://localhost:3000",
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class IncidentRequest(BaseModel):
    title: str = Field(min_length=3, max_length=120)
    description: str = Field(min_length=10, max_length=2000)


def analyze_incident(title: str, description: str) -> dict:
    # Combine both fields so we can check the entire report.
    text = f"{title} {description}".lower()

    # Step 1: Classify the incident.
    if any(word in text for word in [
        "password", "unauthorized", "hacked",
        "security breach", "suspicious login"
    ]):
        category = "Security"
        category_reason = "The report mentions a security-related issue."

    elif any(word in text for word in [
        "database", "sql", "query failed", "db connection"
    ]):
        category = "Database"
        category_reason = "The report mentions a database or query issue."

    elif any(word in text for word in [
        "network", "connection timeout", "dns",
        "cannot connect", "connection refused"
    ]):
        category = "Network"
        category_reason = "The report mentions a network or connection issue."

    elif any(word in text for word in [
        "login", "log in", "authentication",
        "500 error", "server error", "api error",
        "backend", "deployment"
    ]):
        category = "Application / Backend"
        category_reason = (
            "The report mentions an application, login, "
            "server, or deployment issue."
        )

    elif any(word in text for word in [
        "slow", "latency", "performance", "lagging"
    ]):
        category = "Performance"
        category_reason = "The report mentions slow or degraded performance."

    else:
        category = "General"
        category_reason = (
            "No specific category matched the current keyword rules."
        )

    # Step 2: Estimate priority separately from category.
    high_priority_terms = [
        "all users", "everyone", "complete outage",
        "production down", "service down", "security breach",
        "unable to log in", "cannot log in",
        "500 error", "data loss"
    ]

    medium_priority_terms = [
        "error", "failed", "failure", "timeout",
        "slow", "intermittent", "not working"
    ]

    if any(term in text for term in high_priority_terms):
        priority = "High"
        priority_reason = (
            "The report contains a potential outage, broad access "
            "failure, serious security issue, or data-loss indicator."
        )

    elif any(term in text for term in medium_priority_terms):
        priority = "Medium"
        priority_reason = (
            "The report contains an error or service problem "
            "that needs investigation."
        )

    else:
        priority = "Low"
        priority_reason = (
            "No high- or medium-priority keyword matched. "
            "A human should confirm the actual impact."
        )

    return {
        "category": category,
        "category_reason": category_reason,
        "priority": priority,
        "priority_reason": priority_reason,
    }


@app.get("/")
def home():
    return {
        "message": "SignalDesk AI is running",
        "version": "0.2.0",
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


@app.post("/incidents/analyze")
def analyze(incident: IncidentRequest):
    analysis = analyze_incident(
        incident.title,
        incident.description,
    )

    return {
        "title": incident.title,
        "description": incident.description,
        "status": "analyzed",
        **analysis,
    }
