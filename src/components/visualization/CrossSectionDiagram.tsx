import React from 'react';

interface CrossSectionDiagramProps {
  walkwayWidth: number;
  slope: number;
  shadePercentage: number;
}

export function CrossSectionDiagram({
  walkwayWidth,
  slope,
  shadePercentage,
}: CrossSectionDiagramProps) {
  const scale = 20; // pixels per cm
  const width = walkwayWidth * scale + 400;
  const height = 300;
  const walkwayY = 150;
  const walkwayX = 100;

  // Calculate slope visualization
  const slopeHeight = (walkwayWidth / 100) * (slope / 100);
  const endX = walkwayX + (walkwayWidth / 100) * scale;
  const endY = walkwayY - slopeHeight * scale;

  // Shade arc
  const shadeArcRadius = (walkwayWidth / 100 / 2) * scale;
  const shadeCenterX = (walkwayX + endX) / 2;
  const shadeStartAngle = Math.PI - (shadePercentage / 100) * Math.PI;
  const shadeStartX = shadeCenterX + shadeArcRadius * Math.cos(shadeStartAngle);
  const shadeStartY = walkwayY + shadeArcRadius * Math.sin(shadeStartAngle);
  const shadeEndX = shadeCenterX + shadeArcRadius * Math.cos(Math.PI);
  const shadeEndY = walkwayY + shadeArcRadius * Math.sin(Math.PI);

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200" dir="rtl">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">חתך סכמטי דו-מימדי</h3>
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="border border-gray-300 rounded">
        {/* Sky */}
        <rect width={width} height={walkwayY} fill="#e0f7ff" />

        {/* Ground */}
        <rect y={walkwayY} width={width} height={height - walkwayY} fill="#d2b48c" />

        {/* Walkway */}
        <line
          x1={walkwayX}
          y1={walkwayY}
          x2={endX}
          y2={endY}
          stroke="#777777"
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* Walkway dimension line */}
        <line x1={walkwayX} y1={walkwayY + 30} x2={endX} y2={endY + 30} stroke="#0066cc" strokeWidth="1" />
        <text x={(walkwayX + endX) / 2} y={walkwayY + 50} textAnchor="middle" fontSize="12" fill="#0066cc">
          {walkwayWidth} ס"מ
        </text>

        {/* Slope indicator */}
        {slope > 0 && (
          <text x={endX + 20} y={endY - 20} fontSize="12" fill="#cc6600">
            שיפוע {slope}%
          </text>
        )}

        {/* Shade coverage arc */}
        {shadePercentage > 0 && (
          <>
            {/* Sun rays */}
            <line x1={width - 50} y1={20} x2={width - 100} y2={60} stroke="#ffcc00" strokeWidth="2" />
            <circle cx={width - 50} cy={20} r="8" fill="#ffcc00" />

            {/* Shade area */}
            <path
              d={`
                M ${shadeCenterX} ${walkwayY}
                A ${shadeArcRadius} ${shadeArcRadius} 0 0 1 ${shadeEndX} ${shadeEndY}
                L ${shadeStartX} ${shadeStartY}
                A ${shadeArcRadius} ${shadeArcRadius} 0 0 0 ${shadeCenterX} ${walkwayY}
              `}
              fill="rgba(0, 0, 0, 0.2)"
              stroke="rgba(0, 0, 0, 0.3)"
              strokeWidth="1"
            />

            <text x={shadeCenterX} y={walkwayY + 70} textAnchor="middle" fontSize="12" fill="#333333">
              הצללה {shadePercentage}%
            </text>
          </>
        )}

        {/* Buildings */}
        <rect x={endX + 40} y={walkwayY - 80} width="80" height="80" fill="#d4a574" stroke="#8b6914" strokeWidth="1" />

        {/* Labels */}
        <text x={walkwayX - 80} y={walkwayY + 20} fontSize="12" fill="#666" textAnchor="end">
          רצועת הליכה
        </text>

        {/* Dimension arrows */}
        <line x1={walkwayX - 10} y1={walkwayY - 5} x2={walkwayX - 10} y2={walkwayY + 5} stroke="#0066cc" strokeWidth="1" />
        <line x1={endX + 10} y1={endY - 5} x2={endX + 10} y2={endY + 5} stroke="#0066cc" strokeWidth="1" />
      </svg>

      {/* Legend */}
      <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-1 bg-gray-600"></div>
          <span>רצועת הליכה</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-1 bg-black bg-opacity-20"></div>
          <span>הצללה</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-300 rounded-full"></div>
          <span>שמש</span>
        </div>
      </div>
    </div>
  );
}
