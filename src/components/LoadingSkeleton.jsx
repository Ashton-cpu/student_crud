import React from 'react';

export function LoadingSkeleton({ rows = 4 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <tr key={index} className="animate-pulse border-b border-slate-100">
          <td className="px-4 py-4">
            <div className="h-5 bg-slate-200 rounded-md w-24"></div>
          </td>
          <td className="px-4 py-4">
            <div className="h-4 bg-slate-200 rounded-md w-36 mb-1.5"></div>
            <div className="h-3 bg-slate-100 rounded-md w-48"></div>
          </td>
          <td className="px-4 py-4">
            <div className="h-4 bg-slate-200 rounded-md w-32"></div>
          </td>
          <td className="px-4 py-4">
            <div className="h-5 bg-slate-200 rounded-full w-20"></div>
          </td>
          <td className="px-4 py-4">
            <div className="h-5 bg-slate-200 rounded-full w-16"></div>
          </td>
          <td className="px-4 py-4 text-right">
            <div className="inline-flex gap-2">
              <div className="h-7 w-12 bg-slate-200 rounded-lg"></div>
              <div className="h-7 w-14 bg-slate-200 rounded-lg"></div>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}
