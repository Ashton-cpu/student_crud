import React, { useState, useEffect } from 'react';
import { UserPlus, UserCheck, RotateCcw, XCircle, AlertCircle } from 'lucide-react';

const COURSES = [
  'BS Computer Science',
  'BS Information Technology',
  'BS Information Systems',
  'BS Computer Engineering',
  'BS Software Engineering',
  'BS Data Science',
];

const YEAR_LEVELS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

const STATUSES = ['Active', 'Inactive', 'Graduated'];

const EMPTY_FORM = {
  studentId: '',
  firstName: '',
  lastName: '',
  email: '',
  course: 'BS Computer Science',
  yearLevel: '1st Year',
  status: 'Active',
};

export function StudentForm({ editingStudent, onSave, onCancelEdit, loading }) {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  // When editingStudent prop changes, populate or clear form
  useEffect(() => {
    if (editingStudent) {
      setFormData({
        studentId: editingStudent.studentId || '',
        firstName: editingStudent.firstName || '',
        lastName: editingStudent.lastName || '',
        email: editingStudent.email || '',
        course: editingStudent.course || 'BS Computer Science',
        yearLevel: editingStudent.yearLevel || '1st Year',
        status: editingStudent.status || 'Active',
      });
      setErrors({});
    } else {
      setFormData(EMPTY_FORM);
      setErrors({});
    }
  }, [editingStudent]);

  const validate = () => {
    const newErrors = {};
    if (!formData.studentId.trim()) {
      newErrors.studentId = 'Student ID is required (e.g. 2024-00101)';
    }
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email format';
    }
    if (!formData.course) {
      newErrors.course = 'Please select a degree course';
    }
    if (!formData.yearLevel) {
      newErrors.yearLevel = 'Please select a year level';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const success = await onSave(formData);
    if (success && !editingStudent) {
      setFormData(EMPTY_FORM);
      setErrors({});
    }
  };

  const handleReset = () => {
    if (editingStudent) {
      onCancelEdit();
    } else {
      setFormData(EMPTY_FORM);
      setErrors({});
    }
  };

  const isEditing = Boolean(editingStudent);

  return (
    <div
      id="student-form-card"
      className={`bg-white rounded-2xl border transition-all duration-300 shadow-sm overflow-hidden ${
        isEditing
          ? 'border-indigo-400 ring-2 ring-indigo-100'
          : 'border-slate-200'
      }`}
    >
      {/* Form Header */}
      <div
        className={`px-6 py-4 border-b flex items-center justify-between ${
          isEditing ? 'bg-indigo-50/70 border-indigo-100' : 'bg-slate-50/70 border-slate-100'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div
            className={`p-2 rounded-lg ${
              isEditing ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-white'
            }`}
          >
            {isEditing ? <UserCheck className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
          </div>
          <div>
            <h2 className="font-semibold text-slate-900 text-base">
              {isEditing ? 'Edit Student Record' : 'Add New Student'}
            </h2>
            <p className="text-xs text-slate-500">
              {isEditing
                ? `Modifying details for ID: ${editingStudent.studentId}`
                : 'Fill in the details to register a new student'}
            </p>
          </div>
        </div>

        {isEditing && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-white border border-slate-200 px-2.5 py-1 rounded-md transition"
          >
            <XCircle className="w-3.5 h-3.5 text-rose-500" />
            Cancel Edit
          </button>
        )}
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {/* Student ID */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Student ID <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            placeholder="e.g. 2024-00101"
            className={`w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 border transition focus:bg-white focus:outline-hidden focus:ring-2 ${
              errors.studentId
                ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30'
                : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'
            }`}
          />
          {errors.studentId && (
            <p className="text-rose-600 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.studentId}
            </p>
          )}
        </div>

        {/* First & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              First Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="e.g. Juan"
              className={`w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 border transition focus:bg-white focus:outline-hidden focus:ring-2 ${
                errors.firstName
                  ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30'
                  : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'
              }`}
            />
            {errors.firstName && (
              <p className="text-rose-600 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.firstName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Last Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="e.g. Dela Cruz"
              className={`w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 border transition focus:bg-white focus:outline-hidden focus:ring-2 ${
                errors.lastName
                  ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30'
                  : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'
              }`}
            />
            {errors.lastName && (
              <p className="text-rose-600 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.lastName}
              </p>
            )}
          </div>
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. juan.delacruz@student.edu"
            className={`w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 border transition focus:bg-white focus:outline-hidden focus:ring-2 ${
              errors.email
                ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30'
                : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'
            }`}
          />
          {errors.email && (
            <p className="text-rose-600 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
            </p>
          )}
        </div>

        {/* Course & Year Level */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Course / Degree <span className="text-rose-500">*</span>
            </label>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 border border-slate-200 transition focus:bg-white focus:outline-hidden focus:ring-2 focus:border-indigo-500 focus:ring-indigo-100"
            >
              {COURSES.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Year Level <span className="text-rose-500">*</span>
            </label>
            <select
              name="yearLevel"
              value={formData.yearLevel}
              onChange={handleChange}
              className="w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 border border-slate-200 transition focus:bg-white focus:outline-hidden focus:ring-2 focus:border-indigo-500 focus:ring-indigo-100"
            >
              {YEAR_LEVELS.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Student Status <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {STATUSES.map((status) => (
              <label
                key={status}
                className={`flex items-center justify-center py-2 px-3 rounded-xl border text-xs font-semibold cursor-pointer transition ${
                  formData.status === status
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <input
                  type="radio"
                  name="status"
                  value={status}
                  checked={formData.status === status}
                  onChange={handleChange}
                  className="sr-only"
                />
                {status}
              </label>
            ))}
          </div>
        </div>

        {/* Form Action Buttons */}
        <div className="pt-3 border-t border-slate-100 flex items-center gap-2.5">
          <button
            type="submit"
            disabled={loading}
            className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold text-white transition flex items-center justify-center gap-2 shadow-xs cursor-pointer ${
              isEditing
                ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200'
                : 'bg-slate-900 hover:bg-slate-800 focus:ring-4 focus:ring-slate-300'
            } ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isEditing ? (
              <>
                <UserCheck className="w-4 h-4" />
                <span>Update Student</span>
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                <span>Save New Student</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="py-2.5 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-sm font-semibold transition flex items-center gap-1.5 cursor-pointer"
            title={isEditing ? 'Cancel editing' : 'Clear form'}
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">{isEditing ? 'Cancel' : 'Clear'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
