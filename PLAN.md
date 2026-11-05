# Implementation Plan: Student CRUD Application (Vite + React + JavaScript + Tailwind CSS)

## 1. Project Overview & Objectives
Build a modern, responsive Single Page Application (SPA) using **Vite**, **React (JavaScript)**, and **Tailwind CSS**.
- **No Modals / Popups**: All Create, Edit, View, and Delete operations will be performed directly **in-page** (e.g., side-by-side / card layout with inline form and inline delete confirmations).

---

## 2. Technology Stack
- **Build Tool:** Vite
- **Framework:** React (JavaScript / JSX)
- **Styling:** Tailwind CSS (utility-first styling with responsive design)
- **Icons:** Lucide React (clean dashboard icons)
- **HTTP Client:** Axios (configured with base URL and error handling)
- **State Management:** React hooks (`useState`, `useEffect`, `useCallback`)

---

## 3. UI Layout & Architecture (No Modals)

Rather than popup modals, the interface will feature a clean two-column / dashboard card layout:

```text
+-----------------------------------------------------------------------------------+
|  🎓 Student Management System (Navbar + Status Bar)                               |
+-----------------------------------------------------------------------------------+
|  [ LEFT / TOP PANEL ]                    |  [ RIGHT / MAIN PANEL ]                |
|  Student Form Card                       |  Student Directory & Records Table     |
|                                          |                                        |
|  - Dynamic Heading (Add / Edit Student)  |  - Search Bar (ID, Name, Email)        |
|  - Student ID Input                      |  - Filter by Course & Status           |
|  - First & Last Name Inputs              |  - Responsive Data Table               |
|  - Email Input                           |    - ID, Name, Course, Year, Status    |
|  - Course Dropdown                       |    - Action Buttons:                   |
|  - Year Level Dropdown                   |      * [Edit] -> Populates Left Form   |
|  - Status Radio/Dropdown                 |      * [Delete] -> Inline Confirmation |
|  - Buttons:                              |        ("Confirm? [Yes] [No]")         |
|    * [Save Student] / [Update Student]   |  - Pagination / Record Counter         |
|    * [Cancel Edit]                       |                                        |
+-----------------------------------------------------------------------------------+
|  In-page Toast / Notification Banner (Success / Error messages)                   |
+-----------------------------------------------------------------------------------+
```

### Key Behavioral Rules:
1. **Inline Form for Add & Edit:**
   - Clicking **"Edit"** on any row scrolls/populates the student's data into the persistent form panel and highlights it with an active edit badge.
   - A **"Cancel Edit"** button resets the form back to blank "Add Student" mode.
2. **Inline Delete Confirmation:**
   - Clicking **"Delete"** toggles that row's actions into an inline prompt: `Are you sure? [Delete] [Cancel]` directly inside the table cell—no modal dialog.
3. **In-Page Notifications:**
   - Success and error alerts appear as inline dismissible banner cards at the top of the workspace.

---

## 4. Student Data Model
| Field | Type | Description | Validation |
| :--- | :--- | :--- | :--- |
| `id` | String / Number | Unique identifier | Auto-assigned |
| `studentId` | String | Academic Student ID (e.g., `2024-00123`) | Required, alphanumeric |
| `firstName` | String | Student's first name | Required, min 2 chars |
| `lastName` | String | Student's last name | Required, min 2 chars |
| `email` | String | Student email address | Required, valid email |
| `course` | String | Degree program (e.g., `BSCS`, `BSIT`, `BSIS`) | Required |
| `yearLevel` | String | Year level (`1st Year` - `4th Year`) | Required |
| `status` | String | Academic status (`Active`, `Inactive`, `Graduated`) | Required |

---

## 5. API Endpoints Specification
Configured via `VITE_API_BASE_URL` in `.env`:
- `GET /students` - Retrieve all students (with optional search/filtering)
- `GET /students/:id` - Retrieve single student record
- `POST /students` - Create a new student record
- `PUT /students/:id` - Update existing student record
- `DELETE /students/:id` - Delete student record

*(A mock service fallback will be available if no live backend server is running).*

---

## 6. Directory Structure
```text
STUDENT-CRUD/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx            # App header with branding and stats
│   │   ├── StudentForm.jsx       # In-page Add/Edit card (NO MODALS)
│   │   ├── StudentList.jsx       # Data table container
│   │   ├── StudentRow.jsx        # Row with inline edit & inline delete confirmation
│   │   ├── SearchFilter.jsx      # Search input and course/status filters
│   │   ├── AlertBanner.jsx       # In-page success/error alert banners
│   │   └── LoadingSkeleton.jsx   # Tailwind pulse loader during fetching
│   ├── services/
│   │   ├── api.js                # Axios instance configuration
│   │   └── studentService.js     # API communication functions
│   ├── hooks/
│   │   └── useStudents.js        # State management (list, selected/editing, loading, error)
│   ├── App.jsx                   # Two-column dashboard layout
│   ├── main.jsx                  # React entry point
│   └── index.css                 # Tailwind directives (@tailwind base, etc.)
├── .env.example
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── vite.config.js
```

---

## 7. Step-by-Step Implementation Roadmap

### Phase 1: Vite + Tailwind CSS Setup
- Scaffold Vite React JavaScript project (`npm create vite@latest . -- --template react`).
- Install and configure **Tailwind CSS** (`tailwindcss`, `postcss`, `autoprefixer`).
- Install `axios` and `lucide-react`.

### Phase 2: API Service & Mock Layer
- Set up `src/services/api.js` and `src/services/studentService.js`.
- Provide reliable fallback / mock persistence so the application can be tested immediately even if a backend server is not yet attached.

### Phase 3: Custom State Hook (`useStudents.js`)
- Handle fetching, creating, updating, and deleting students.
- Track currently editing student (`editingStudent: null | object`).
- Handle inline loading, error, and feedback alerts.

### Phase 4: In-Page Components (No Modals)
- **`Navbar.jsx`:** Clean header bar with total student counts.
- **`StudentForm.jsx`:** Persistent card with responsive form fields, validation indicators, "Add Student" / "Update Student" action button, and "Cancel Edit" button.
- **`SearchFilter.jsx`:** Live search input, course dropdown filter, and status filter.
- **`StudentList.jsx` & `StudentRow.jsx`:** Responsive table with inline status pills, edit button (loads into form), and inline delete confirmation buttons.
- **`AlertBanner.jsx`:** Dismissible alerts for feedback.

### Phase 5: Verification & Testing
- Test Create, Read, Update, and Delete without any modal windows appearing.
- Test form validation and reset states.
- Test responsive layout on mobile (stacked cards) and desktop (side-by-side).
