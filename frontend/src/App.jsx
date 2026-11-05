import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { AlertBanner } from './components/AlertBanner';
import { StudentForm } from './components/StudentForm';
import { SearchFilter } from './components/SearchFilter';
import { StudentList } from './components/StudentList';
import { useStudents } from './hooks/useStudents';
import { Sparkles } from 'lucide-react';

export default function App() {
  const {
    students,
    loading,
    editingStudent,
    alert,
    fetchStudents,
    selectForEdit,
    cancelEdit,
    saveStudent,
    removeStudent,
    clearAlert,
  } = useStudents();

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('All Courses');

  // Filter Logic
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const query = searchQuery.trim().toLowerCase();
      const fname = (student.firstname || student.firstName || '').toLowerCase();
      const lname = (student.lastname || student.lastName || '').toLowerCase();
      const course = (student.course || '').toLowerCase();
      const section = (student.section || '').toLowerCase();
      const id = String(student.id || '');

      const matchesSearch =
        !query ||
        id.includes(query) ||
        fname.includes(query) ||
        lname.includes(query) ||
        `${fname} ${lname}`.includes(query) ||
        course.includes(query) ||
        section.includes(query);

      const matchesCourse =
        courseFilter === 'All Courses' ||
        (student.course || '').toUpperCase() === courseFilter.toUpperCase();

      return matchesSearch && matchesCourse;
    });
  }, [students, searchQuery, courseFilter]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setCourseFilter('All Courses');
  };

  const isFiltered = Boolean(searchQuery.trim()) || courseFilter !== 'All Courses';

  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col">
      {/* Top Navigation */}
      <Navbar totalCount={students.length} onRefresh={fetchStudents} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* In-page Notification Alert (No Modal) */}
        <AlertBanner alert={alert} onClose={clearAlert} />

        {/* Dashboard Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Persistent In-page Form (No Modals) */}
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-22">
            <StudentForm
              editingStudent={editingStudent}
              onSave={saveStudent}
              onCancelEdit={cancelEdit}
              loading={loading}
            />

            {/* In-page Helper Guide Card */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 text-xs text-slate-600 shadow-xs">
              <div className="flex items-center gap-2 font-semibold text-slate-800 mb-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Zero-Modal Experience</span>
              </div>
              <ul className="space-y-1.5 text-slate-500 list-disc list-inside">
                <li>
                  Click <strong className="text-slate-700">Edit</strong> on any row to immediately populate and edit the student in the form.
                </li>
                <li>
                  Click <strong className="text-slate-700">Delete</strong> for an inline confirmation directly in the row—no popup modals.
                </li>
                <li>
                  Connected to Spring Boot REST API (`/zablan/students`) &amp; Render PostgreSQL.
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Search, Filter & Directory Table */}
          <div className="lg:col-span-7 space-y-4">
            <SearchFilter
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              courseFilter={courseFilter}
              onCourseChange={setCourseFilter}
              onClearFilters={handleClearFilters}
              totalCount={students.length}
              filteredCount={filteredStudents.length}
            />

            <StudentList
              students={filteredStudents}
              loading={loading}
              editingStudent={editingStudent}
              onEdit={selectForEdit}
              onDelete={removeStudent}
              onClearFilters={handleClearFilters}
              isFiltered={isFiltered}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-4 border-t border-slate-200 bg-white text-center text-xs text-slate-500">
        Student Management System &bull; Built with Vite, React &amp; Spring Boot
      </footer>
    </div>
  );
}
