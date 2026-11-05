import React from 'react';
import { Search, Filter, X, SlidersHorizontal } from 'lucide-react';

const COURSES = [
  'All Courses',
  'BS Computer Science',
  'BS Information Technology',
  'BS Information Systems',
  'BS Computer Engineering',
  'BS Software Engineering',
  'BS Data Science',
];

const STATUSES = ['All Statuses', 'Active', 'Inactive', 'Graduated'];

export function SearchFilter({
  searchQuery,
  onSearchChange,
  courseFilter,
  onCourseChange,
  statusFilter,
  onStatusChange,
  onClearFilters,
  totalCount,
  filteredCount,
}) {
  const hasActiveFilters =
    Boolean(searchQuery.trim()) || courseFilter !== 'All Courses' || statusFilter !== 'All Statuses';

  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by ID, name, or email..."
            className="w-full pl-9.5 pr-8 py-2 rounded-xl text-sm bg-slate-50 border border-slate-200 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filters Group */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Course Filter */}
          <div className="relative">
            <select
              value={courseFilter}
              onChange={(e) => onCourseChange(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 rounded-xl text-xs font-medium bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 transition focus:outline-hidden focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
            >
              {COURSES.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
            <Filter className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => onStatusChange(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 rounded-xl text-xs font-medium bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 transition focus:outline-hidden focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
            >
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <SlidersHorizontal className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Reset Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="flex items-center gap-1 px-2.5 py-2 text-xs font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition cursor-pointer"
            >
              <X className="w-3 h-3" />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Counter summary */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
        <span>
          Showing <strong className="text-slate-800">{filteredCount}</strong> of{' '}
          <strong className="text-slate-800">{totalCount}</strong> students
        </span>
        {hasActiveFilters && (
          <span className="text-indigo-600 font-medium bg-indigo-50 px-2 py-0.5 rounded-md">
            Filtered view
          </span>
        )}
      </div>
    </div>
  );
}
