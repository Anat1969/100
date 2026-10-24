import React from 'react';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'ai-menu': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { chat?: string; research?: string };
    }
  }
}

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
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <ai-menu />
      </div>
      {description && <p className="text-gray-600 text-base">{description}</p>}
    </header>
  );
}
