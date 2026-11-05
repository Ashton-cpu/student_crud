import { api, getBaseUrl } from './api';

const STORAGE_KEY = 'STUDENTS_STORE_DATA';

const INITIAL_MOCK_STUDENTS = [
  {
    id: '1',
    studentId: '2023-01042',
    firstName: 'Maria',
    lastName: 'Santos',
    email: 'maria.santos@student.edu',
    course: 'BS Computer Science',
    yearLevel: '3rd Year',
    status: 'Active',
    createdAt: new Date('2023-08-15').toISOString(),
  },
  {
    id: '2',
    studentId: '2024-00199',
    firstName: 'Juan',
    lastName: 'Dela Cruz',
    email: 'juan.delacruz@student.edu',
    course: 'BS Information Technology',
    yearLevel: '2nd Year',
    status: 'Active',
    createdAt: new Date('2024-01-10').toISOString(),
  },
  {
    id: '3',
    studentId: '2022-03112',
    firstName: 'Alex',
    lastName: 'Reyes',
    email: 'alex.reyes@student.edu',
    course: 'BS Information Systems',
    yearLevel: '4th Year',
    status: 'Graduated',
    createdAt: new Date('2022-06-01').toISOString(),
  },
  {
    id: '4',
    studentId: '2025-00045',
    firstName: 'Sofia',
    lastName: 'Garcia',
    email: 'sofia.garcia@student.edu',
    course: 'BS Computer Engineering',
    yearLevel: '1st Year',
    status: 'Inactive',
    createdAt: new Date('2025-02-14').toISOString(),
  },
];

// Helper: Local Storage fallback handlers
const getStoredStudents = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MOCK_STUDENTS));
    return INITIAL_MOCK_STUDENTS;
  }
  try {
    return JSON.parse(data);
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MOCK_STUDENTS));
    return INITIAL_MOCK_STUDENTS;
  }
};

const saveStoredStudents = (students) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
};

export const studentService = {
  // Check if live API is configured
  isLiveApiConfigured: () => Boolean(getBaseUrl()),

  // GET ALL STUDENTS
  getAll: async () => {
    const baseURL = getBaseUrl();
    if (baseURL) {
      try {
        const response = await api.get('/students');
        // Handle responses that might be wrapped in data property
        return Array.isArray(response.data) ? response.data : response.data.data || [];
      } catch (err) {
        console.warn('API fetch failed, falling back to local data store:', err.message);
        throw err;
      }
    }
    // Mock simulation
    await new Promise((resolve) => setTimeout(resolve, 300));
    return getStoredStudents();
  },

  // GET STUDENT BY ID
  getById: async (id) => {
    const baseURL = getBaseUrl();
    if (baseURL) {
      const response = await api.get(`/students/${id}`);
      return response.data;
    }
    await new Promise((resolve) => setTimeout(resolve, 200));
    const students = getStoredStudents();
    const student = students.find((s) => String(s.id) === String(id));
    if (!student) throw new Error('Student not found');
    return student;
  },

  // CREATE NEW STUDENT
  create: async (studentData) => {
    const baseURL = getBaseUrl();
    if (baseURL) {
      const response = await api.post('/students', studentData);
      return response.data;
    }
    await new Promise((resolve) => setTimeout(resolve, 300));
    const students = getStoredStudents();
    const newStudent = {
      ...studentData,
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
    };
    const updated = [newStudent, ...students];
    saveStoredStudents(updated);
    return newStudent;
  },

  // UPDATE EXISTING STUDENT
  update: async (id, studentData) => {
    const baseURL = getBaseUrl();
    if (baseURL) {
      const response = await api.put(`/students/${id}`, studentData);
      return response.data;
    }
    await new Promise((resolve) => setTimeout(resolve, 300));
    const students = getStoredStudents();
    const index = students.findIndex((s) => String(s.id) === String(id));
    if (index === -1) throw new Error('Student record not found');
    const updatedStudent = { ...students[index], ...studentData };
    students[index] = updatedStudent;
    saveStoredStudents(students);
    return updatedStudent;
  },

  // DELETE STUDENT
  delete: async (id) => {
    const baseURL = getBaseUrl();
    if (baseURL) {
      const response = await api.delete(`/students/${id}`);
      return response.data;
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
    const students = getStoredStudents();
    const filtered = students.filter((s) => String(s.id) !== String(id));
    saveStoredStudents(filtered);
    return { success: true, id };
  },

  // Reset to initial mock data (helpful testing utility)
  resetMockData: () => {
    saveStoredStudents(INITIAL_MOCK_STUDENTS);
    return INITIAL_MOCK_STUDENTS;
  },
};
