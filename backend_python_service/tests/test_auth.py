import sys
from pathlib import Path

# Ensure package imports work when the file is executed directly (debug runs, `python app/main.py`, etc.).
PROJECT_ROOT = Path(__file__).resolve().parents[2]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from fastapi.testclient import TestClient

from backend_python_service.app.main import app

client = TestClient(app)


def login(username: str, password: str) -> str:
    response = client.post("/api/auth/login", json={"username": username, "password": password})
    assert response.status_code == 200, response.json()
    return response.json()["access_token"]


def test_user_can_login_and_access_profile():
    token = login("user@example.com", "User123!")

    response = client.get("/api/users/me", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    payload = response.json()
    assert payload["username"] == "user@example.com"
    assert payload["role"] == "user"


def test_admin_can_access_admin_dashboard():
    token = login("admin@example.com", "Admin123!")

    response = client.get("/api/admin/reports", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    payload = response.json()
    assert payload["username"] == "admin@example.com"
    assert payload["role"] == "admin"


def test_user_cannot_access_admin_dashboard():
    token = login("user@example.com", "User123!")

    response = client.get("/api/admin/reports", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 403
    assert response.json()["detail"] == "Admin access required"


def test_login_rejects_invalid_credentials():
    response = client.post("/api/auth/login", json={"username": "user@example.com", "password": "wrong"})
    assert response.status_code == 400
    assert response.json()["detail"] == "Incorrect username or password"


def test_public_info_endpoint_available_without_auth():
    response = client.get("/api/info")
    assert response.status_code == 200
    payload = response.json()
    assert payload["service"] == "Role-based Auth API"
    assert payload["status"] == "ok"
