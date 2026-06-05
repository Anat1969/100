import React from 'react';

interface HeaderProps {
  title: string;
  breadcrumb?: string[];
  description?: string;
}

export function Header({ title, breadcrumb, description }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-6" dir="rtl">
      {breadcrumb && breadcrumb.length > 0 && (
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          {breadcrumb.map((item, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <span>‹</span>}
              <span>{item}</span>
            </React.Fragment>
          ))}
        </nav>
      )}
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
      {description && <p className="text-gray-600 text-base">{description}</p>}
    </header>
  );
}
