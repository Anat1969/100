import React, { useState } from 'react';
import { useCompliance } from '../hooks/useCompliance';
import { Header } from './shared/Header';
import { StatusBadge } from './shared/StatusBadge';
import { Street3DView } from './visualization/Street3DView';
import { CrossSectionDiagram } from './visualization/CrossSectionDiagram';

interface CategoryDetailProps {
  categoryId: string;
  categoryName: string;
  categoryDescription: string;
}

export function CategoryDetailWithVisualization({
  categoryId,
  categoryName,
  categoryDescription,
}: CategoryDetailProps) {
  const { getParametersByCategory, updateParameter, getComplianceStatus } = useCompliance();
  const params = getParametersByCategory(categoryId);

  // Get key values for visualization
  const walkwayWidth = params.find((p) => p.id.includes('min_width'))?.value || 150;
  const slope = params.find((p) => p.id.includes('max_slope'))?.value || 0;
  const shadePercentage = params.find((p) => p.id.includes('target_coverage'))?.value || 0;

  const handleInputChange = (paramId: string, value: string) => {
    const numValue = value ? parseFloat(value) : null;
    updateParameter(paramId, numValue);
  };

  return (
    <div className="min-h-screen bg-gray-100" dir="rtl">
      <Header title={categoryName} breadcrumb={['בית', categoryName]} description={categoryDescription} />

      <main className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Left Column: Inputs */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-6">שדות קלט</h2>

              <div className="space-y-6">
                {params.map((param) => {
                  const status = getComplianceStatus(param.value, param.threshold);
                  return (
                    <div key={param.id} className="border-b border-gray-200 pb-4 last:border-0">
                      <label className="block text-sm font-semibold text-gray-900 mb-2">{param.label}</label>

                      <div className="mb-2">
                        <StatusBadge status={status} size="sm" />
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <input
                          type="number"
                          value={param.value ?? ''}
                          onChange={(e) => handleInputChange(param.id, e.target.value)}
                          placeholder="הזן ערך"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-600 font-medium min-w-max">{param.unit}</span>
                      </div>

                      <div className="text-xs text-gray-500 space-y-1">
                        <p>דרישה: {param.threshold} {param.unit}</p>
                        <p className="text-blue-600">{param.reference}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Visualizations */}
          <div className="lg:col-span-2 space-y-6">
            {/* 3D Street View */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">תצוגה תלת-מימדית של הרחוב</h2>
              </div>
              <div style={{ height: '500px' }}>
                <Street3DView walkwayWidth={walkwayWidth} slope={slope} shadePercentage={shadePercentage} />
              </div>
            </div>

            {/* 2D Cross Section */}
            <CrossSectionDiagram
              walkwayWidth={walkwayWidth}
              slope={slope}
              shadePercentage={shadePercentage}
            />

            {/* Summary Info */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">ערכים עדכניים:</h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-blue-700">רוחב רצועת הליכה:</p>
                  <p className="font-bold text-gray-900">{walkwayWidth} ס"מ</p>
                </div>
                <div>
                  <p className="text-blue-700">שיפוע:</p>
                  <p className="font-bold text-gray-900">{slope}%</p>
                </div>
                <div>
                  <p className="text-blue-700">כיסוי הצללה:</p>
                  <p className="font-bold text-gray-900">{shadePercentage}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
