import React, { useState } from 'react';
import { Pencil, Trash2, Check, X, ShieldAlert, Mail } from 'lucide-react';

export function StudentRow({ student, isEditing, onEdit, onDelete, isDeleting }) {
  // Inline confirmation state for this specific row (Zero Modals!)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleDeleteConfirm = () => {
    onDelete(student.id, `${student.firstName} ${student.lastName}`);
    setShowConfirmDelete(false);
  };

  const statusStyles = {
    Active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Inactive: 'bg-amber-50 text-amber-700 border-amber-200',
    Graduated: 'bg-purple-50 text-purple-700 border-purple-200',
  }[student.status] || 'bg-slate-50 text-slate-700 border-slate-200';

  return (
    <tr
      className={`transition-colors border-b border-slate-100 ${
        isEditing
          ? 'bg-indigo-50/60 font-medium'
          : showConfirmDelete
          ? 'bg-rose-50/40'
          : 'hover:bg-slate-50/80'
      }`}
    >
      {/* Student ID */}
      <td className="px-4 py-3.5 whitespace-nowrap">
        <div className="flex items-center gap-2">
          {isEditing && (
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
          )}
          <span className="font-mono text-xs font-semibold text-slate-900 bg-slate-100 px-2 py-1 rounded-md border border-slate-200">
            {student.studentId}
          </span>
        </div>
      </td>

      {/* Full Name & Email */}
      <td className="px-4 py-3.5">
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-slate-900">
            {student.firstName} {student.lastName}
          </span>
          <span className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
            <Mail className="w-3 h-3 text-slate-400" />
            {student.email}
          </span>
        </div>
      </td>

      {/* Course Program */}
      <td className="px-4 py-3.5 whitespace-nowrap text-xs text-slate-700 font-medium">
        {student.course}
      </td>

      {/* Year Level */}
      <td className="px-4 py-3.5 whitespace-nowrap text-xs text-slate-600">
        <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full border border-slate-200 font-medium">
          {student.yearLevel}
        </span>
      </td>

      {/* Status Badge */}
      <td className="px-4 py-3.5 whitespace-nowrap">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusStyles}`}
        >
          {student.status}
        </span>
      </td>

      {/* Actions Cell (Inline Controls - Absolutely NO Modal) */}
      <td className="px-4 py-3.5 whitespace-nowrap text-right">
        {showConfirmDelete ? (
          // Inline Delete Confirmation Bar directly inside the cell
          <div className="inline-flex items-center gap-1.5 bg-white p-1 rounded-lg border border-rose-200 shadow-xs">
            <span className="text-[11px] font-semibold text-rose-700 flex items-center gap-1 pl-1">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
              Delete?
            </span>
            <button
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="px-2 py-0.5 bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-semibold rounded transition flex items-center gap-0.5 cursor-pointer"
            >
              <Check className="w-3 h-3" /> Yes
            </button>
            <button
              onClick={() => setShowConfirmDelete(false)}
              className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold rounded transition flex items-center gap-0.5 cursor-pointer"
            >
              <X className="w-3 h-3" /> No
            </button>
          </div>
        ) : (
          // Standard Action Buttons
          <div className="flex items-center justify-end gap-1.5">
            <button
              onClick={() => onEdit(student)}
              className={`p-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1 cursor-pointer ${
                isEditing
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200'
              }`}
              title="Edit in left panel form"
            >
              <Pencil className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">{isEditing ? 'Editing' : 'Edit'}</span>
            </button>

            <button
              onClick={() => setShowConfirmDelete(true)}
              className="p-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 hover:bg-rose-50 hover:text-rose-600 border border-slate-200 transition flex items-center gap-1 cursor-pointer"
              title="Delete student (inline confirmation)"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Delete</span>
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}
