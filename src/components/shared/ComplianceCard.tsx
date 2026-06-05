import React, { useState } from 'react';
import { ComplianceStatus } from '../../types';
import { StatusBadge } from './StatusBadge';

interface ComplianceCardProps {
  paramId: string;
  label: string;
  currentValue: number | null;
  threshold: number;
  unit: string;
  status: ComplianceStatus;
  reference: string;
  note?: string;
  onUpdate: (paramId: string, value: number | null) => void;
  isMaxValue?: boolean;
}

const statusBorderColor: Record<ComplianceStatus, string> = {
  pass: 'border-l-green-600',
  warn: 'border-l-orange-600',
  fail: 'border-l-red-600',
  pending: 'border-l-gray-300',
};

export function ComplianceCard({
  paramId,
  label,
  currentValue,
  threshold,
  unit,
  status,
  reference,
  note,
  onUpdate,
  isMaxValue,
}: ComplianceCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState<string>(currentValue?.toString() || '');

  const handleSave = () => {
    const numValue = editValue ? parseFloat(editValue) : null;
    onUpdate(paramId, numValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(currentValue?.toString() || '');
    setIsEditing(false);
  };

  return (
    <div
      className={`border-l-8 ${statusBorderColor[status]} bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow`}
      dir="rtl"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{label}</h3>
          <StatusBadge status={status} size="md" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 bg-gray-50 p-4 rounded">
        <div>
          <p className="text-sm text-gray-600 mb-1">דרישה</p>
          <p className="text-2xl font-bold text-gray-900">
            {threshold} {unit}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">מצב בפרויקט</p>
          <p className="text-2xl font-bold text-gray-900">
            {currentValue !== null ? `${currentValue} ${unit}` : '—'}
          </p>
        </div>
      </div>

      {!isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2 px-4 rounded transition-colors"
        >
          ✎ עריכה
        </button>
      )}

      {isEditing && (
        <div className="bg-blue-50 p-4 rounded mb-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              הזן ערך חדש:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                placeholder="הזן מספר"
                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="text-gray-600 font-medium">{unit}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              שמור
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded transition-colors"
            >
              ביטול
            </button>
          </div>
        </div>
      )}

      <div className="pt-4 border-t border-gray-200 text-sm text-gray-600">
        <p>
          <strong>התייחסות:</strong> {reference}
        </p>
        {note && <p className="mt-2 italic">💡 {note}</p>}
      </div>
    </div>
  );
}
