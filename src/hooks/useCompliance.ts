import { useMemo, useState, useEffect } from 'react';
import { ComplianceStatus, DashboardStats } from '../types';
import parametersData from '../../parameters.json';

interface ParameterValue {
  id: string;
  value: number | null;
  category: string;
  label: string;
  threshold: number;
  unit: string;
  reference: string;
  note?: string;
}

export function useCompliance() {
  const [projectData, setProjectData] = useState<Record<string, number | null>>({});

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('ageplan_project_v1');
    if (saved) {
      try {
        const { parameters } = JSON.parse(saved);
        setProjectData(parameters || {});
      } catch {
        setProjectData({});
      }
    }
  }, []);

  // Get all parameters from JSON
  const allParameters = useMemo(() => {
    const params: ParameterValue[] = [];

    Object.entries(parametersData).forEach(([category, data]: [string, any]) => {
      if (category === '_source' || category === '_version' || category === 'status_thresholds') return;

      if (data.params) {
        Object.entries(data.params).forEach(([paramId, paramData]: [string, any]) => {
          const fullId = `${category}_${paramId}`;
          const value = projectData[fullId] ?? null;

          // Skip non-numeric parameters (true/false values)
          if (typeof paramData.value === 'number') {
            params.push({
              id: fullId,
              category,
              label: paramData.label || paramId,
              value,
              threshold: paramData.value,
              unit: paramData.unit || '',
              reference: paramData.reference || '',
              note: paramData.note,
            });
          }
        });
      }
    });

    return params;
  }, [projectData]);

  const getComplianceStatus = (value: number | null, threshold: number, isMaxValue: boolean = false): ComplianceStatus => {
    if (value === null) return 'pending';

    const warnThreshold = parametersData.status_thresholds.warn_percent;
    const variance = Math.abs(value - threshold);
    const percentVariance = (variance / threshold) * 100;

    if (isMaxValue) {
      // For max values (like max slope), higher than threshold is bad
      if (value <= threshold) return 'pass';
      if (percentVariance <= warnThreshold) return 'warn';
      return 'fail';
    } else {
      // For min values (like min width), lower than threshold is bad
      if (value >= threshold) return 'pass';
      if (percentVariance <= warnThreshold) return 'warn';
      return 'fail';
    }
  };

  const stats = useMemo<DashboardStats>(() => {
    let pass = 0, warn = 0, fail = 0, pending = 0;

    allParameters.forEach((param) => {
      const status = getComplianceStatus(param.value, param.threshold);
      if (status === 'pass') pass++;
      else if (status === 'warn') warn++;
      else if (status === 'fail') fail++;
      else if (status === 'pending') pending++;
    });

    const total = allParameters.length;
    const compliancePercentage = total > 0 ? Math.round(((pass + warn) / total) * 100) : 0;

    return { total, pass, warn, fail, pending, compliancePercentage };
  }, [allParameters]);

  const updateParameter = (paramId: string, value: number | null) => {
    const newData = { ...projectData, [paramId]: value };
    setProjectData(newData);

    // Save to localStorage
    const projectName = localStorage.getItem('ageplan_project_name') || 'Project';
    localStorage.setItem(
      'ageplan_project_v1',
      JSON.stringify({
        projectName,
        projectDate: new Date().toISOString().split('T')[0],
        parameters: newData,
        lastUpdated: new Date().toISOString(),
      })
    );
  };

  const getParametersByCategory = (category: string) => {
    return allParameters.filter((p) => p.category === category);
  };

  return {
    allParameters,
    stats,
    projectData,
    updateParameter,
    getParametersByCategory,
    getComplianceStatus,
  };
}
