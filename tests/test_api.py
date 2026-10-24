
from fastapi.testclient import TestClient

from backend.main import app

client = TestClient(app)


def test_health_endpoint():
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json()["status"] == "healthy"


def test_analyze_incident_returns_expected_fields():
    payload = {
        "title": "Login returns a 500 error",
        "description": (
            "Users cannot log in after the latest "
            "application deployment."
        ),
    }

    response = client.post("/incidents/analyze", json=payload)

    assert response.status_code == 200

    data = response.json()

    assert data["status"] == "analyzed"
    assert data["category"] == "Application / Backend"
    assert data["priority"] == "High"
    assert isinstance(data["similar_incidents"], list)
    assert isinstance(data["troubleshooting_guides"], list)
    assert "recommended_team" in data
    assert "suggested_action" in data
    assert data["requires_human_approval"] is True


def test_database_incident_classification():
    payload = {
        "title": "Database query failed",
        "description": (
            "The database query failed while loading "
            "the customer dashboard."
        ),
    }

    response = client.post("/incidents/analyze", json=payload)

    assert response.status_code == 200

    data = response.json()

    assert data["category"] == "Database"
    assert data["priority"] == "Medium"


def test_short_title_is_rejected():
    payload = {
        "title": "Hi",
        "description": "The application is not loading correctly.",
    }

    response = client.post("/incidents/analyze", json=payload)

    assert response.status_code == 422
