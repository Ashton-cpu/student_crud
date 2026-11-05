# Student Management System (CRUD)

A responsive, modern Single Page Application (SPA) for managing student records via a REST API, built with **Vite**, **React (JavaScript)**, and **Tailwind CSS**.

---

## 🌟 Key Features

- **Full CRUD Operations:** Create, Read, Update, and Delete student records.
- **Strictly Zero Modals:** 
  - **In-Page Form:** Persistent side-by-side card for both Adding and Editing students with active edit indicators and quick cancel.
  - **Inline Delete Confirmation:** Deletion triggers an inline `"Delete? [Yes] [No]"` confirmation inside the table cell itself—no popups.
  - **In-Page Alerts:** Dismissible alert banners for immediate user feedback.
- **Tailwind CSS:** Responsive layout, modern status pill badges, and clean typography.
- **Dual Mode (REST API & Local Fallback):**
  - Connects seamlessly to any backend Student REST API via Axios.
  - Automatically falls back to persistent local storage with seed data if the backend server is offline or not yet configured.
  - Change the API URL on-the-fly via the API settings drawer in the top navigation bar.
- **Search & Filtering:** Real-time search across ID, name, and email, alongside dropdown filters for Course and Status.

---

## 🛠️ Tech Stack

- **Build Tool:** Vite 6
- **UI Framework:** React 19 (JavaScript / JSX)
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React
- **HTTP Client:** Axios

---

## 📁 Project Structure

```text
STUDENT-CRUD/
├── public/
├── src/
│   ├── components/
│   │   ├── AlertBanner.jsx      # In-page feedback banner (no modal)
│   │   ├── LoadingSkeleton.jsx  # Tailwind pulse animation for loading states
│   │   ├── Navbar.jsx           # Header with metrics and live/mock API config drawer
│   │   ├── SearchFilter.jsx     # Live search and course/status dropdown filters
│   │   ├── StudentForm.jsx      # In-page Add/Edit student form card
│   │   ├── StudentList.jsx      # Student data table container
│   │   └── StudentRow.jsx       # Row with inline edit and inline delete confirmation
│   ├── hooks/
│   │   └── useStudents.js       # Centralized CRUD state management
│   ├── services/
│   │   ├── api.js               # Axios instance with dynamic base URL support
│   │   └── studentService.js    # REST API CRUD methods + fallback storage
│   ├── App.jsx                  # Main dashboard layout
│   ├── index.css                # Tailwind imports & base styles
│   └── main.jsx                 # Application entry point
├── .env.example                 # Environment configuration template
├── package.json
└── vite.config.js               # Vite & Tailwind CSS configuration
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Backend API (Optional)
To connect to your existing backend server, create a `.env` file (or use the in-app settings drawer):
```env
VITE_API_BASE_URL=http://localhost:5000/api
```
*(If left blank, the app will run in Mock Mode using browser storage with sample data).*

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

---

## 🔌 Expected REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/students` | Get all student records |
| `GET` | `/students/:id` | Get single student details |
| `POST` | `/students` | Create new student |
| `PUT` | `/students/:id` | Update student details |
| `DELETE` | `/students/:id` | Delete student |
