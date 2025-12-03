# Time Management App

A comprehensive full-stack application designed for time management and task tracking. This project demonstrates a modern microservices architecture with a React frontend and multiple backend services.

## 🏗 Architecture

The solution consists of three main components:

1.  **Frontend**: A Single Page Application (SPA) built with React.
2.  **Auth Service (.NET)**: A robust authentication and user management service.
3.  **Backend Service (Python)**: A lightweight service for additional functionality (e.g., alternative auth/data processing).

## 🚀 Technologies

### Frontend (`/frontend`)
*   **Framework**: React 18 + TypeScript + Vite
*   **UI Libraries**: Material UI (MUI) v5 + PrimeReact v10
*   **Routing**: React Router v6 (Nested Routes)
*   **State Management**: Context API
*   **Testing**: Vitest + React Testing Library
*   **E2E Testing**: Playwright
*   **Key Features**:
    *   Dark/Light Theme switching (synced between MUI and PrimeReact)
    *   Responsive Sidebar Drawer (Desktop/Mobile layouts)
    *   Role-based Access Control (RBAC)
    *   Breadcrumb navigation
*   Configuration: YAML-based settings

### Backend - .NET Core (`/backend_netCore_service`)
*   **Framework**: ASP.NET Core 9.0 Web API
*   **Database**: MongoDB (via Entity Framework Core)
*   **Authentication**: JWT (JSON Web Tokens)
*   **Testing**: xUnit + WebApplicationFactory (Integration Tests)
*   **Configuration**: YAML-based settings
*   **Swagger**: API Documentation with Swagger

### Backend - Python (`/backend_python_service`)
*   **Framework**: FastAPI
*   **Database**: MongoDB (via Beanie ODM / Motor)
*   **Authentication**: JWT
*   Configuration: YAML-based settings
*   **Testing**: Pytest + TestClient
*   **Swagger**: API Documentation with Swagger

## 📂 Project Structure

```
root/
├── frontend/                 # React Application
├── backend_netCore_service/  # ASP.NET Core Web API
├── backend_python_service/   # FastAPI Service
└── README.md                 # This file
```

## 🛠 Getting Started

Each service has its own detailed setup instructions. Please refer to the respective README files:

*   [Frontend Setup](./frontend/README.md)
*   [.NET Backend Setup](./backend_netCore_service/README.md)
*   [Python Backend Setup](./backend_python_service/readme.md)

## ✨ Recent Updates

*   **UI Overhaul**: Integrated PrimeReact components into the Material UI shell.
*   **Theming**: Implemented a synchronized Dark/Light mode across all UI components.
*   **Navigation**: Enhanced sidebar navigation with active state logic and breadcrumbs.
*   **Routing**: Improved deep-linking capabilities for "About Me" and other nested pages.


### Main Page

<img width="1860" height="1436" alt="image" src="https://github.com/user-attachments/assets/85324d45-81f6-486f-8494-d3fbc2819173" />

### Track Status

<img width="1928" height="1828" alt="image" src="https://github.com/user-attachments/assets/4555a96c-3877-4af7-b744-ac5b9718f193" />

### Jira Scram page

<img width="2345" height="1261" alt="image" src="https://github.com/user-attachments/assets/7000ec17-fb7e-40df-a3ed-2a83eb90b133" />

### Ligth mode

<img width="1888" height="1437" alt="image" src="https://github.com/user-attachments/assets/8a7055c7-8d97-430d-89d2-ed257a664e38" />

### Mobile mode

<img width="1367" height="1459" alt="image" src="https://github.com/user-attachments/assets/c07457d6-f6a9-4b46-9338-9c38f1f8aead" />
