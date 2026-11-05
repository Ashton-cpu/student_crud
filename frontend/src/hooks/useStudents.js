import { useState, useEffect, useCallback } from 'react';
import { studentService } from '../services/studentService';

export function useStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [alert, setAlert] = useState(null);

  const showAlert = useCallback((type, message) => {
    setAlert({ type, message });
  }, []);

  const clearAlert = useCallback(() => {
    setAlert(null);
  }, []);

  // Fetch all students
  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await studentService.getAll();
      setStudents(data);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to load students.';
      setError(msg);
      showAlert('error', `Error fetching students: ${msg}`);
    } finally {
      setLoading(false);
    }
  }, [showAlert]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Set student to edit (loads data into in-page form)
  const selectForEdit = useCallback((student) => {
    setEditingStudent(student);
    const fname = student.firstname || student.firstName || '';
    const lname = student.lastname || student.lastName || '';
    showAlert('info', `Editing record for ${fname} ${lname} (ID: ${student.id}).`);
    // Smooth scroll to form on mobile/small screens
    const formElement = document.getElementById('student-form-card');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showAlert]);

  // Cancel edit mode
  const cancelEdit = useCallback(() => {
    setEditingStudent(null);
    clearAlert();
  }, [clearAlert]);

  // Create or Update student
  const saveStudent = useCallback(
    async (formData) => {
      setLoading(true);
      setError(null);
      try {
        if (editingStudent) {
          // Update
          const updated = await studentService.update(editingStudent.id, formData);
          setStudents((prev) =>
            prev.map((s) => (String(s.id) === String(editingStudent.id) ? updated : s))
          );
          setEditingStudent(null);
          const fname = updated.firstname || updated.firstName || '';
          const lname = updated.lastname || updated.lastName || '';
          showAlert('success', `Student "${fname} ${lname}" updated successfully!`);
        } else {
          // Create
          const created = await studentService.create(formData);
          setStudents((prev) => [created, ...prev]);
          const fname = created.firstname || created.firstName || '';
          const lname = created.lastname || created.lastName || '';
          showAlert('success', `Student "${fname} ${lname}" added successfully!`);
        }
        return true;
      } catch (err) {
        const msg = err.response?.data?.message || err.message || 'Failed to save student.';
        setError(msg);
        showAlert('error', msg);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [editingStudent, showAlert]
  );

  // Delete student
  const removeStudent = useCallback(
    async (id, studentName) => {
      setLoading(true);
      setError(null);
      try {
        await studentService.delete(id);
        setStudents((prev) => prev.filter((s) => String(s.id) !== String(id)));
        if (editingStudent && String(editingStudent.id) === String(id)) {
          setEditingStudent(null);
        }
        showAlert('success', `Student ${studentName ? `"${studentName}" ` : ''}deleted successfully.`);
        return true;
      } catch (err) {
        const msg = err.response?.data?.message || err.message || 'Failed to delete student.';
        setError(msg);
        showAlert('error', msg);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [editingStudent, showAlert]
  );

  return {
    students,
    loading,
    error,
    editingStudent,
    alert,
    fetchStudents,
    selectForEdit,
    cancelEdit,
    saveStudent,
    removeStudent,
    clearAlert,
  };
}
