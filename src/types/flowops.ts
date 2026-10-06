export type RequestStatus = 'Pending' | 'In Review' | 'Approved' | 'Rejected' | 'Completed';
export type PriorityLevel = 'Urgent' | 'High' | 'Medium' | 'Low';

export interface RequestItem {
  id: string;
  title: string;
  requester: {
    name: string;
    email: string;
    avatar: string;
    department: string;
  };
  owner: {
    name: string;
    avatar: string;
    role: string;
  };
  priority: PriorityLevel;
  status: RequestStatus;
  category: string;
  amount: string;
  department: string;
  workflowName: string;
  updatedAt: string;
  createdAt: string;
  description: string;
  estimatedHours: number;
  aiSummary?: {
    overview: string;
    keyPoints: string[];
    riskAssessment: 'Low' | 'Medium' | 'High';
    nextAction: string;
  };
  timeline: Array<{
    id: string;
    event: string;
    actor: string;
    timestamp: string;
    type: 'creation' | 'approval' | 'comment' | 'status_change';
  }>;
}

export interface ApprovalItem {
  id: string;
  requestId: string;
  requestTitle: string;
  requesterName: string;
  requesterAvatar: string;
  department: string;
  priority: PriorityLevel;
  timeWaiting: string;
  amountOrScope: string;
  requiredAction: string;
  status: 'Pending' | 'In Review' | 'Approved' | 'Rejected' | 'Changes Requested';
  dueDate?: string;
  decisionNotes?: string;
}

export interface WorkflowNode {
  id: string;
  title: string;
  type: 'trigger' | 'condition' | 'approval' | 'action' | 'notification';
  description?: string;
  assignee?: string;
  rule?: string;
  conditionRule?: string;
  timeout?: string;
  owner?: string;
  status: 'configured' | 'draft';
}

export interface WorkflowModel {
  name: string;
  status: string;
  version: string;
  owner: string;
  lastSaved: string;
  steps: WorkflowNode[];
  metrics: {
    steps: number;
    approvals: number;
    automations: number;
    avgCompletion: string;
  };
}

export interface ExceptionItem {
  id: string;
  severity: 'Critical' | 'Warning' | 'Resolved';
  title: string;
  owner: string;
  timeAgo: string;
  status: 'Open' | 'Resolved';
  impactedWorkflow: string;
  actionRequired: string;
  resolutionNotes?: string;
  resolvedAt?: string;
}

export interface IntegrationItem {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'Connected' | 'Not Connected';
  iconName: string;
  workspaceUrl?: string;
  permissions: string[];
  lastSync?: string;
  webhookStatus?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'approval' | 'exception' | 'workflow' | 'info';
  linkId?: string;
}

export interface SettingsModel {
  profile: {
    name: string;
    email: string;
    role: string;
  };
  notifications: {
    email: boolean;
    approvals: boolean;
    exceptions: boolean;
    workflow: boolean;
  };
  security: {
    twoFactor: boolean;
    sessionTimeout: string;
    loginActivity: string;
  };
  preferences: {
    approvalTimeout: string;
    slaThreshold: string;
    autoEscalation: boolean;
  };
  appearance: {
    theme: 'light' | 'dark';
    density: 'comfortable' | 'compact';
  };
}

export interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}
