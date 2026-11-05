import React from 'react';
import { Users, AlertTriangle } from 'lucide-react';
import { StudentRow } from './StudentRow';
import { LoadingSkeleton } from './LoadingSkeleton';

export function StudentList({
  students,
  loading,
  editingStudent,
  onEdit,
  onDelete,
  onClearFilters,
  isFiltered,
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th scope="col" className="px-4 py-3.5">
                Student ID
              </th>
              <th scope="col" className="px-4 py-3.5">
                Student Name
              </th>
              <th scope="col" className="px-4 py-3.5">
                Course Program
              </th>
              <th scope="col" className="px-4 py-3.5">
                Year Level
              </th>
              <th scope="col" className="px-4 py-3.5">
                Status
              </th>
              <th scope="col" className="px-4 py-3.5 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <LoadingSkeleton rows={4} />
            ) : students.length > 0 ? (
              students.map((student) => (
                <StudentRow
                  key={student.id}
                  student={student}
                  isEditing={editingStudent && String(editingStudent.id) === String(student.id)}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  isDeleting={loading}
                />
              ))
            ) : (
              // Empty State
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                    <div className="p-3 bg-slate-100 rounded-full text-slate-400 mb-3">
                      {isFiltered ? (
                        <AlertTriangle className="w-6 h-6 text-amber-500" />
                      ) : (
                        <Users className="w-6 h-6 text-slate-400" />
                      )}
                    </div>
                    <h3 className="text-sm font-semibold text-slate-800">
                      {isFiltered ? 'No matching student records found' : 'No students registered yet'}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 mb-4">
                      {isFiltered
                        ? 'Try adjusting your search query or reset the filters to see all records.'
                        : 'Use the Student Form on the left to add your first student record.'}
                    </p>
                    {isFiltered && (
                      <button
                        onClick={onClearFilters}
                        className="px-3.5 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition"
                      >
                        Reset All Filters
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
