import React, { useState } from 'react';
import { Pencil, Trash2, Check, X, ShieldAlert, GraduationCap } from 'lucide-react';

export function StudentRow({ student, isEditing, onEdit, onDelete, isDeleting }) {
  // Inline confirmation state for this specific row (Zero Modals!)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const firstname = student.firstname || student.firstName || '';
  const lastname = student.lastname || student.lastName || '';
  const fullName = `${firstname} ${lastname}`.trim() || `Student #${student.id}`;

  const handleDeleteConfirm = () => {
    onDelete(student.id, fullName);
    setShowConfirmDelete(false);
  };

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
          <span className="font-mono text-xs font-semibold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
            #{student.id}
          </span>
        </div>
      </td>

      {/* Full Name */}
      <td className="px-4 py-3.5 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0">
            {firstname ? firstname.charAt(0).toUpperCase() : 'S'}
          </div>
          <div>
            <span className="text-sm font-semibold text-slate-900">
              {fullName}
            </span>
          </div>
        </div>
      </td>

      {/* Course */}
      <td className="px-4 py-3.5 whitespace-nowrap text-xs">
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
          <GraduationCap className="w-3 h-3" />
          {student.course}
        </span>
      </td>

      {/* Section */}
      <td className="px-4 py-3.5 whitespace-nowrap text-xs">
        <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md border border-slate-200 font-semibold">
          {student.section}
        </span>
      </td>

      {/* Actions Cell (Inline Controls - Zero Modal) */}
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
