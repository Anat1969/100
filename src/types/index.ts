export type ComplianceStatus = 'pass' | 'warn' | 'fail' | 'pending';

export interface ComplianceParameter {
  id: string;
  name: string;
  category: string;
  threshold: number;
  unit: string;
  currentValue: number | null;
  status: ComplianceStatus;
  minValue?: number;
  maxValue?: number;
  reference: string;
  explanation: string;
}

export interface ComplianceResult {
  paramId: string;
  status: ComplianceStatus;
  value: number | null;
  threshold: number;
  message: string;
}

export interface ProjectData {
  projectName: string;
  projectDate: string;
  parameters: Record<string, number | null>;
  lastUpdated: string;
}

export interface DashboardStats {
  total: number;
  pass: number;
  warn: number;
  fail: number;
  pending: number;
  compliancePercentage: number;
}
