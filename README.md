# Student Management System (Fullstack CRUD)

A modern fullstack CRUD application for managing student records, configured for one-click deployment on [Render.com](https://render.com) using Infrastructure-as-Code (`render.yaml`).

---

## 🏗️ Architecture & Technology Stack

- **Frontend (`frontend/`):**
  - **Framework:** React 19 bootstrapped with Vite 6
  - **Styling:** Tailwind CSS 4 (`@tailwindcss/vite`)
  - **Icons:** Lucide React
  - **UI Design:** Strictly **Zero Modals** (inline sticky card form for Add/Edit, inline two-step confirmation for Delete, in-page alerts)
- **Backend (`student/`):**
  - **Framework:** Spring Boot (Java 21) & Spring Data JPA
  - **REST Endpoint:** `/zablan/students`
  - **Database:** PostgreSQL (Render Cloud PostgreSQL)
  - **Deployment Container:** Multi-stage Dockerfile (`eclipse-temurin:21`)
- **Infrastructure (`render.yaml`):**
  - Render Blueprint provisioning the PostgreSQL database (`student-db`), Spring Boot Docker backend (`student-backend`), and Vite static frontend (`student-frontend`).

---

## 📁 Repository Structure

```text
student_crud/
├── render.yaml              # Render Blueprint Infrastructure-as-Code
├── frontend/                # React + Vite + Tailwind frontend
│   ├── src/
│   │   ├── components/      # UI components (StudentForm, StudentList, StudentRow, etc.)
│   │   ├── hooks/           # useStudents custom state hook
│   │   ├── services/        # studentService.js (dynamic URL resolver & REST client)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js       # Vite config with /zablan proxy
└── student/                 # Spring Boot Java 21 Backend
    ├── Dockerfile           # Multi-stage production container build
    ├── pom.xml
    └── src/
        └── main/
            ├── java/com/zablan/student/
            │   ├── Student.java           # JPA Entity (id, firstname, lastname, course, section)
            │   ├── StudentController.java # REST Controller with @CrossOrigin
            │   └── StudentRepository.java # JPA Repository
            └── resources/
                └── application.properties # Render & local PostgreSQL datasource
```

---

## 🚀 Deployment to Render.com

This repository includes a `render.yaml` blueprint:

1. Log in to [Render.com](https://dashboard.render.com).
2. Go to **Blueprints** and click **New Blueprint Instance**.
3. Connect your repository: `https://github.com/Ashton-cpu/student_crud`.
4. Render will automatically detect `render.yaml` and provision:
   - **`student-db`:** Free PostgreSQL database.
   - **`student-backend`:** Web service building `student/Dockerfile` and connecting to `student-db`.
   - **`student-frontend`:** Static web service building `frontend/` and routing API requests to `student-backend`.
5. Click **Apply** to deploy!

---

## 💻 Local Development Setup

### 1. Backend (`student/`)
Ensure PostgreSQL is running locally (`db_student` database), then:
```powershell
cd student
.\mvnw.cmd spring-boot:run
```
Runs at `http://localhost:8080/zablan/students`.

### 2. Frontend (`frontend/`)
```powershell
cd frontend
npm.cmd install
npm.cmd run dev
```
Runs at `http://localhost:5173`.
*(API calls to `/zablan` are automatically forwarded to `http://localhost:8080` by Vite's development proxy).*
