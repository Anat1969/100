import React, { useState } from 'react';
import { useCompliance } from '../hooks/useCompliance';
import { Header } from './shared/Header';
import { ProgressBar } from './shared/ProgressBar';
import parametersData from '../../parameters.json';

const categoryInfo: Record<string, { emoji: string; description: string }> = {
  walkway: { emoji: '🚶', description: 'רצועות הליכה, שיפוע וגישה כללית' },
  benches: { emoji: '💺', description: 'ספסלים ומקומות ישיבה' },
  restrooms: { emoji: '🚻', description: 'חדרי נוחיות ונגישות' },
  shade_and_wind: { emoji: '☀️', description: 'הצללה ושיכוך רוח' },
  lighting: { emoji: '💡', description: 'תאורת רחוב ובטיחות' },
  circular_route: { emoji: '🔄', description: 'מסלול מעגלי שכונתי' },
  parks: { emoji: '🌳', description: 'פארקים וגינות' },
  cemetery: { emoji: '🕯️', description: 'בית עלמין ונגישות' },
};

export function ComplianceDashboard() {
  const { stats, getParametersByCategory } = useCompliance();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Object.entries(parametersData)
    .filter(([key]) => key !== '_source' && key !== '_version' && key !== 'status_thresholds')
    .map(([key, data]: [string, any]) => ({
      id: key,
      name: data.label,
      chapter: data.chapter,
    }));

  return (
    <div className="min-h-screen bg-gray-100" dir="rtl">
      <Header
        title="ניירות ציות AgePlan"
        breadcrumb={['בית', 'ניירות ציות']}
        description="בדיקה אוטומטית לציות תכנון סביבת גיל"
      />

      <main className="p-6 max-w-7xl mx-auto">
        <ProgressBar {...stats} />

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">בחר קטגוריה לבדיקה</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => {
              const params = getParametersByCategory(category.id);
              const info = categoryInfo[category.id] || { emoji: '📋', description: '' };

              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md hover:border-blue-300 border-2 border-transparent transition-all text-right"
                >
                  <div className="text-4xl mb-3">{info.emoji}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{info.description}</p>
                  <p className="text-xs text-gray-500">{params.length} פרמטרים</p>
                </button>
              );
            })}
          </div>
        </div>

        {selectedCategory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" dir="rtl">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  {categories.find((c) => c.id === selectedCategory)?.name}
                </h2>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-6">
                  {categories.find((c) => c.id === selectedCategory)?.chapter}
                </p>
                <div className="space-y-4">
                  {getParametersByCategory(selectedCategory).map((param) => (
                    <div
                      key={param.id}
                      className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                    >
                      <p className="font-semibold text-gray-900 mb-1">{param.label}</p>
                      <p className="text-sm text-gray-600">
                        דרישה: {param.threshold} {param.unit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
