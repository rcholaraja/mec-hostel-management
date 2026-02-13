# Hostel Management System

A production-ready backend application for managing hostel operations, built with Spring Boot 3.x and Java 17.

## Troubleshooting

### IDE Package Warnings
If your IDE shows errors like `The declared package "..." does not match the expected package "main.java..."`, it means the IDE is not correctly recognizing `src/main/java` as the source root.
- **VS Code**: Right-click on `pom.xml` and select "Update Project Configuration" or "Reload Project". ensure the "Java Extension Pack" is installed.
- **IntelliJ IDEA**: Right-click on `pom.xml` -> "Add as Maven Project" or "Reload Project".
- **Eclipse**: Right-click on the project -> Configure -> Convert to Maven Project.

### Maven Installation
If `mvn` command is not found, verify your Maven installation path is added to your system environment variables.

## Tech Stack
- **Java 17**
- **Spring Boot 3.x**
- **Spring Data JPA (Hibernate)**
- **MySQL** (H2 Database configured for development/demo)
- **Maven**

## Features
- **Student Module**: Registration, Attendance Marking, Leave/OD/Outing Applications, Request History.
- **Warden Module**: View Students, Approve/Reject Requests, Attendance Reports.

## Setup & Running

1. **Prerequisites**: Java 17, Maven installed.
2. **Database**: 
   - Default configured to use **H2 In-Memory Database** for easy testing.
   - To use **MySQL**, update `src/main/resources/application.properties` with your credentials.
3. **Build**:
   ```sh
   mvn clean install
   ```
4. **Run**:
   ```sh
   mvn spring-boot:run
   ```

## API Documentation

### Student APIs
- `POST /students` - Register a new student
- `GET /students` - Get all students
- `POST /attendance/mark` - Mark daily attendance
- `POST /leave/apply` - Apply for leave
- `POST /od/apply` - Apply for On-Duty
- `POST /outing/apply` - Apply for Outing
- `GET /student/{id}/history` - View request history

### Warden APIs
- `GET /warden/pending-requests` - View all pending requests
- `PUT /warden/leave/{id}/approve` - Approve Leave
- `PUT /warden/leave/{id}/reject` - Reject Leave
- `PUT /warden/od/{id}/approve` - Approve OD
- `PUT /warden/od/{id}/reject` - Reject OD
- `PUT /warden/outing/{id}/approve` - Approve Outing
- `PUT /warden/outing/{id}/reject` - Reject Outing
- `GET /warden/attendance-report?date=YYYY-MM-DD` - View attendance report

## Testing
A shell script `test_endpoints.sh` is provided to test the flow using `curl`.
```sh
chmod +x test_endpoints.sh
./test_endpoints.sh
```
