import React, { useState, useEffect } from 'react';
import { UserPlus, UserCheck, RotateCcw, XCircle, AlertCircle } from 'lucide-react';

const EMPTY_FORM = {
  firstname: '',
  lastname: '',
  course: '',
  section: '',
};

export function StudentForm({ editingStudent, onSave, onCancelEdit, loading }) {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        firstname: editingStudent.firstname || editingStudent.firstName || '',
        lastname: editingStudent.lastname || editingStudent.lastName || '',
        course: editingStudent.course || '',
        section: editingStudent.section || '',
      });
      setErrors({});
    } else {
      setFormData(EMPTY_FORM);
      setErrors({});
    }
  }, [editingStudent]);

  const validate = () => {
    const newErrors = {};
    if (!formData.firstname.trim()) newErrors.firstname = 'First name is required';
    if (!formData.lastname.trim()) newErrors.lastname = 'Last name is required';
    if (!formData.course.trim()) newErrors.course = 'Course is required (e.g. BSIT, BSCS)';
    if (!formData.section.trim()) newErrors.section = 'Section is required (e.g. 3A, 3B)';

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
      className={`bg-white rounded-2xl border transition-all duration-300 shadow-xs overflow-hidden ${
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
              {isEditing ? `Edit Student (ID: ${editingStudent.id})` : 'Add New Student'}
            </h2>
            <p className="text-xs text-slate-500">
              {isEditing
                ? 'Update student information and save changes'
                : 'Fill in details to register a new student record'}
            </p>
          </div>
        </div>

        {isEditing && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-white border border-slate-200 px-2.5 py-1 rounded-md transition cursor-pointer"
          >
            <XCircle className="w-3.5 h-3.5 text-rose-500" />
            Cancel Edit
          </button>
        )}
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {/* First & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              First Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              placeholder="e.g. Juan"
              className={`w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 border transition focus:bg-white focus:outline-hidden focus:ring-2 ${
                errors.firstname
                  ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30'
                  : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'
              }`}
            />
            {errors.firstname && (
              <p className="text-rose-600 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.firstname}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Last Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder="e.g. Dela Cruz"
              className={`w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 border transition focus:bg-white focus:outline-hidden focus:ring-2 ${
                errors.lastname
                  ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30'
                  : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'
              }`}
            />
            {errors.lastname && (
              <p className="text-rose-600 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.lastname}
              </p>
            )}
          </div>
        </div>

        {/* Course & Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Course <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="e.g. BSIT or BSCS"
              className={`w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 border transition focus:bg-white focus:outline-hidden focus:ring-2 ${
                errors.course
                  ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30'
                  : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'
              }`}
            />
            {errors.course && (
              <p className="text-rose-600 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.course}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Section <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="section"
              value={formData.section}
              onChange={handleChange}
              placeholder="e.g. 3A or 3B"
              className={`w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 border transition focus:bg-white focus:outline-hidden focus:ring-2 ${
                errors.section
                  ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30'
                  : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'
              }`}
            />
            {errors.section && (
              <p className="text-rose-600 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.section}
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
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
