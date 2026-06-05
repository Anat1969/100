import React from 'react';

interface ProgressBarProps {
  percentage: number;
  pass: number;
  warn: number;
  fail: number;
  pending: number;
}

export function ProgressBar({ percentage, pass, warn, fail, pending }: ProgressBarProps) {
  const total = pass + warn + fail + pending;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm" dir="rtl">
      <div className="mb-4">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-4xl font-bold text-gray-900">{percentage}%</span>
          <span className="text-gray-600">עומד בדרישות</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className="bg-gradient-to-l from-green-500 via-orange-400 to-red-500 h-full rounded-full transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mt-6">
        <div className="bg-green-50 rounded-lg p-3">
          <p className="text-xs text-gray-600 mb-1">עומד בדרישה</p>
          <p className="text-2xl font-bold text-green-700">{pass}</p>
        </div>
        <div className="bg-orange-50 rounded-lg p-3">
          <p className="text-xs text-gray-600 mb-1">סטייה מקובלת</p>
          <p className="text-2xl font-bold text-orange-700">{warn}</p>
        </div>
        <div className="bg-red-50 rounded-lg p-3">
          <p className="text-xs text-gray-600 mb-1">לא עומד בדרישה</p>
          <p className="text-2xl font-bold text-red-700">{fail}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-600 mb-1">ממתין לנתונים</p>
          <p className="text-2xl font-bold text-gray-700">{pending}</p>
        </div>
      </div>
    </div>
  );
}
