# MEC Hostel Management Project

A comprehensive digitalization solution for managing hostel operations, including student registration, attendance tracking, and request management (Leave, OD, and Outing).

## 🚀 Technology Stack

### Backend
- **Framework**: Spring Boot 3.3.4
- **Language**: Java 17
- **Build Tool**: Maven
- **Database**: MySQL (Local)
- **Persistence**: Spring Data JPA / Hibernate
- **Utilities**: Lombok for boilerplate reduction, Jakarta Validation for API request validation.

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Bootstrap 5 + Vanilla CSS
- **Routing**: React Router 7
- **API Client**: Axios

---

## 🏗 Architecture & Solution Design

The project follows a modern **Decoupled Architecture** with a clear separation between the presentation layer and the business logic layer.

### 1. High-Level Architecture
- **Client Side**: A Single Page Application (SPA) built with React. It handles the UI/UX and client-side routing.
- **Server Side**: A RESTful API built with Spring Boot. It handles business logic, data validation, and database interactions.
- **Data Layer**: A MySQL database for persistent storage.

### 2. Solution Design Pattern
- **MVC (Model-View-Controller)**: The backend follows the standard MVC pattern:
    - **Entity (Model)**: Represents the database schema (Student, Attendance, LeaveRequest, etc.).
    - **Repository**: Handles low-level database operations using Spring Data JPA.
    - **Service Layer**: Contains the core business logic (e.g., calculating request status, handling registrations).
    - **Controller**: Exposes REST endpoints and marks the entry point for the frontend.
- **Component-Based UI**: The frontend is built using reusable React components and layouts for consistency and maintainability.

---

## 🛠 Key Features

### For Students
- **Self-Registration**: Enter roll number, department, and room details.
- **Attendance**: Daily self-marking system.
- **Requests**: Apply for Leave, On-Duty (OD), and Outing with specific reasons and dates.
- **History**: View status of all previous requests (Pending, Approved, Rejected).

### For Warden
- **Dashboard**: View all pending requests in one place.
- **Approval Flow**: Approve or Reject Leave/OD/Outing requests with a single click.
- **Reports**: Generate daily attendance reports for the entire hostel.

---

## 📡 API Flow (E2E)

1.  **Request**: Frontend sends a JSON payload via an Axios POST request (e.g., `/leave/apply`).
2.  **Processing**: Spring Boot Controller receives the request, validates the DTO, and passes it to the Service layer.
3.  **Persistence**: The Service layer interacts with the MySQL Repository to save the request to the `mec_hostel_db` schema.
4.  **Response**: Backend returns the saved object or a success message, which the Frontend uses to update the UI (e.g., showing a success toast or updating the history list).

---

## ⚙️ Setup & Installation

### Backend
1.  Navigate to `backend/`.
2.  Configure your MySQL credentials in `src/main/resources/application.properties`.
3.  Run the application using:
    ```bash
    mvn spring-boot:run
    ```

### Frontend
1.  Navigate to `frontend/`.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

---

## 📈 Future Enhancements
- User Authentication (Login for Student/Warden).
- Automated Email/SMS notifications for request approvals.
- Integration with biometric systems for attendance.
