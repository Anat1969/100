import React from 'react';
import { ComplianceStatus } from '../../types';

interface StatusBadgeProps {
  status: ComplianceStatus;
  size?: 'sm' | 'md' | 'lg';
}

const statusConfig: Record<ComplianceStatus, { bg: string; text: string; label: string }> = {
  pass: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    label: '✓ עומד בדרישה',
  },
  warn: {
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    label: '⚠ סטייה מקובלת',
  },
  fail: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    label: '✗ לא עומד בדרישה',
  },
  pending: {
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    label: '○ ממתין לנתונים',
  },
};

const sizeConfig = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-3 py-2 text-base',
  lg: 'px-4 py-3 text-lg font-semibold',
};

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <div
      className={`${config.bg} ${config.text} rounded-md font-medium inline-block ${sizeConfig[size]}`}
      dir="rtl"
    >
      {config.label}
    </div>
  );
}
