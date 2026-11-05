import axios from 'axios';

// Resolves backend base URL:
// 1. User runtime custom URL from UI settings drawer
// 2. Render injected VITE_API_BASE_URL (which might be "student-backend" or "student-backend-xxxx")
// 3. Fallback to empty string for local dev (Vite proxy forwards /zablan to http://localhost:8080)
export function getApiRoot() {
  const customUrl = localStorage.getItem('CUSTOM_API_BASE_URL');
  if (customUrl && customUrl.trim()) {
    return customUrl.trim().replace(/\/+$/, '');
  }

  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl) {
    let clean = envUrl.trim().replace(/\/+$/, '');
    const withoutProto = clean.replace(/^https?:\/\//i, '');
    if (!withoutProto.includes('.') && !withoutProto.includes('localhost')) {
      clean = `https://${withoutProto}.onrender.com`;
    } else if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
      clean = `https://${clean}`;
    }
    return clean;
  }
  return '';
}

export function getBaseUrl() {
  return `${getApiRoot()}/zablan/students`;
}

const STORAGE_KEY = 'STUDENTS_STORE_DATA';

const INITIAL_MOCK_STUDENTS = [
  {
    id: 1,
    firstname: 'Maria',
    lastname: 'Santos',
    course: 'BSCS',
    section: '3A',
  },
  {
    id: 2,
    firstname: 'Juan',
    lastname: 'Dela Cruz',
    course: 'BSIT',
    section: '2B',
  },
  {
    id: 3,
    firstname: 'Alex',
    lastname: 'Reyes',
    course: 'BSIS',
    section: '4A',
  },
  {
    id: 4,
    firstname: 'Sofia',
    lastname: 'Garcia',
    course: 'BSIT',
    section: '1C',
  },
];

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
  isLiveApiConfigured: () => Boolean(getApiRoot() || import.meta.env.VITE_API_BASE_URL),

  getAll: async () => {
    const url = getBaseUrl();
    try {
      const response = await axios.get(url, { timeout: 6000 });
      const data = response.data;
      return Array.isArray(data) ? data : data.data || [];
    } catch (err) {
      console.warn('Backend fetch failed, using local mock data:', err.message);
      // If we don't have a live connection, return local storage mock
      return getStoredStudents();
    }
  },

  getById: async (id) => {
    const url = `${getBaseUrl()}/${id}`;
    try {
      const response = await axios.get(url, { timeout: 6000 });
      return response.data;
    } catch (err) {
      const students = getStoredStudents();
      const student = students.find((s) => String(s.id) === String(id));
      if (!student) throw new Error('Student not found');
      return student;
    }
  },

  create: async (studentData) => {
    const payload = {
      firstname: studentData.firstname || studentData.firstName,
      lastname: studentData.lastname || studentData.lastName,
      course: studentData.course,
      section: studentData.section,
    };
    const url = getBaseUrl();
    try {
      const response = await axios.post(url, payload, { timeout: 6000 });
      return response.data;
    } catch (err) {
      console.warn('Backend post failed, saving to local store:', err.message);
      const students = getStoredStudents();
      const newStudent = {
        ...payload,
        id: Date.now(),
      };
      const updated = [newStudent, ...students];
      saveStoredStudents(updated);
      return newStudent;
    }
  },

  update: async (id, studentData) => {
    const payload = {
      firstname: studentData.firstname || studentData.firstName,
      lastname: studentData.lastname || studentData.lastName,
      course: studentData.course,
      section: studentData.section,
    };
    const url = `${getBaseUrl()}/${id}`;
    try {
      const response = await axios.put(url, payload, { timeout: 6000 });
      return response.data;
    } catch (err) {
      console.warn('Backend put failed, updating in local store:', err.message);
      const students = getStoredStudents();
      const index = students.findIndex((s) => String(s.id) === String(id));
      if (index === -1) throw new Error('Student record not found');
      const updated = { ...students[index], ...payload };
      students[index] = updated;
      saveStoredStudents(students);
      return updated;
    }
  },

  delete: async (id) => {
    const url = `${getBaseUrl()}/${id}`;
    try {
      await axios.delete(url, { timeout: 6000 });
      return { success: true, id };
    } catch (err) {
      console.warn('Backend delete failed, removing from local store:', err.message);
      const students = getStoredStudents();
      const filtered = students.filter((s) => String(s.id) !== String(id));
      saveStoredStudents(filtered);
      return { success: true, id };
    }
  },
};
