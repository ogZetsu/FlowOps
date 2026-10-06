'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  RequestItem, 
  ApprovalItem, 
  WorkflowModel, 
  WorkflowNode, 
  ExceptionItem, 
  IntegrationItem, 
  NotificationItem, 
  SettingsModel, 
  ToastItem,
  RequestStatus,
  PriorityLevel
} from '@/types/flowops';
import { 
  INITIAL_REQUESTS, 
  INITIAL_APPROVALS, 
  INITIAL_WORKFLOW, 
  INITIAL_EXCEPTIONS, 
  INITIAL_INTEGRATIONS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_SETTINGS 
} from '@/data/mockData';

interface FlowOpsContextType {
  requests: RequestItem[];
  approvals: ApprovalItem[];
  workflow: WorkflowModel;
  exceptions: ExceptionItem[];
  integrations: IntegrationItem[];
  notifications: NotificationItem[];
  settings: SettingsModel;
  toasts: ToastItem[];
  
  // Toast Actions
  addToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;

  // Request & Approval Actions
  approveRequest: (requestId: string, notes?: string) => void;
  rejectRequest: (requestId: string, reason?: string) => void;
  requestChanges: (requestId: string, notes?: string) => void;
  addRequestComment: (requestId: string, comment: string) => void;
  createNewRequest: (requestData: Partial<RequestItem>) => void;

  // Exception Actions
  resolveException: (exceptionId: string, resolutionNotes: string) => void;

  // Workflow Actions
  addWorkflowStep: (stepData: Omit<WorkflowNode, 'id'>) => void;
  updateWorkflowStep: (stepId: string, updated: Partial<WorkflowNode>) => void;
  deleteWorkflowStep: (stepId: string) => void;
  saveWorkflow: () => void;

  // Integration Actions
  connectIntegration: (integrationId: string, workspaceUrl: string, permissions: string[]) => void;
  disconnectIntegration: (integrationId: string) => void;
  testIntegrationConnection: (integrationId: string) => void;
  updateIntegrationPermissions: (integrationId: string, permissions: string[]) => void;

  // Settings Actions
  updateSettings: (category: keyof SettingsModel, key: string, value: any) => void;

  // Notification Actions
  markNotificationRead: (notificationId: string) => void;
  markAllNotificationsRead: () => void;
}

const FlowOpsContext = createContext<FlowOpsContextType | undefined>(undefined);

export const FlowOpsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [requests, setRequests] = useState<RequestItem[]>(INITIAL_REQUESTS);
  const [approvals, setApprovals] = useState<ApprovalItem[]>(INITIAL_APPROVALS);
  const [workflow, setWorkflow] = useState<WorkflowModel>(INITIAL_WORKFLOW);
  const [exceptions, setExceptions] = useState<ExceptionItem[]>(INITIAL_EXCEPTIONS);
  const [integrations, setIntegrations] = useState<IntegrationItem[]>(INITIAL_INTEGRATIONS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [settings, setSettings] = useState<SettingsModel>(INITIAL_SETTINGS);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Toast Helpers
  const addToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Request & Approval Synchronized Mutators
  const approveRequest = (requestId: string, notes?: string) => {
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Update Requests
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id === requestId) {
          return {
            ...r,
            status: 'Approved' as RequestStatus,
            updatedAt: 'Just now',
            timeline: [
              ...r.timeline,
              {
                id: `t-${Date.now()}`,
                event: notes ? `Approved with notes: "${notes}"` : 'Approved by Operations Lead',
                actor: 'Operations Lead',
                timestamp: nowStr,
                type: 'approval'
              }
            ]
          };
        }
        return r;
      })
    );

    // Update Approvals
    setApprovals((prev) =>
      prev.map((a) =>
        a.requestId === requestId || a.id === requestId
          ? { ...a, status: 'Approved', decisionNotes: notes }
          : a
      )
    );

    addToast(`Request ${requestId} approved successfully`, 'success');
  };

  const rejectRequest = (requestId: string, reason?: string) => {
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setRequests((prev) =>
      prev.map((r) => {
        if (r.id === requestId) {
          return {
            ...r,
            status: 'Rejected' as RequestStatus,
            updatedAt: 'Just now',
            timeline: [
              ...r.timeline,
              {
                id: `t-${Date.now()}`,
                event: reason ? `Rejected: "${reason}"` : 'Rejected by Operations Lead',
                actor: 'Operations Lead',
                timestamp: nowStr,
                type: 'status_change'
              }
            ]
          };
        }
        return r;
      })
    );

    setApprovals((prev) =>
      prev.map((a) =>
        a.requestId === requestId || a.id === requestId
          ? { ...a, status: 'Rejected', decisionNotes: reason }
          : a
      )
    );

    addToast(`Request ${requestId} rejected`, 'warning');
  };

  const requestChanges = (requestId: string, notes?: string) => {
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setRequests((prev) =>
      prev.map((r) => {
        if (r.id === requestId) {
          return {
            ...r,
            status: 'In Review' as RequestStatus,
            updatedAt: 'Just now',
            timeline: [
              ...r.timeline,
              {
                id: `t-${Date.now()}`,
                event: notes ? `Changes Requested: "${notes}"` : 'Requested documentation updates',
                actor: 'Operations Lead',
                timestamp: nowStr,
                type: 'comment'
              }
            ]
          };
        }
        return r;
      })
    );

    setApprovals((prev) =>
      prev.map((a) =>
        a.requestId === requestId || a.id === requestId
          ? { ...a, status: 'Changes Requested', decisionNotes: notes }
          : a
      )
    );

    addToast(`Changes requested for ${requestId}`, 'info');
  };

  const addRequestComment = (requestId: string, comment: string) => {
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setRequests((prev) =>
      prev.map((r) => {
        if (r.id === requestId) {
          return {
            ...r,
            timeline: [
              ...r.timeline,
              {
                id: `t-${Date.now()}`,
                event: `Comment: "${comment}"`,
                actor: 'Saimeen Shaikh',
                timestamp: nowStr,
                type: 'comment'
              }
            ]
          };
        }
        return r;
      })
    );

    addToast('Comment added successfully', 'success');
  };

  const createNewRequest = (requestData: Partial<RequestItem>) => {
    const newId = `REQ-${Math.floor(8500 + Math.random() * 500)}`;
    const nowStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const newReq: RequestItem = {
      id: newId,
      title: requestData.title || 'New Operational Request',
      requester: {
        name: 'Saimeen Shaikh',
        email: 'saimeen.shaikh@flowops.portfolio',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        department: requestData.department || 'Product Design'
      },
      owner: {
        name: 'Operations Lead',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        role: 'Operations Lead'
      },
      priority: requestData.priority || 'Medium',
      status: 'Pending',
      category: requestData.category || 'General Request',
      amount: requestData.amount || '$10,000',
      department: requestData.department || 'Operations',
      workflowName: 'Standard Operations Gate',
      updatedAt: 'Just now',
      createdAt: nowStr,
      estimatedHours: 24,
      description: requestData.description || 'Newly submitted operational request awaiting triage.',
      timeline: [
        {
          id: `t-${Date.now()}`,
          event: 'Request created by Saimeen Shaikh',
          actor: 'Saimeen Shaikh',
          timestamp: 'Just now',
          type: 'creation'
        }
      ]
    };

    setRequests((prev) => [newReq, ...prev]);

    // Create corresponding Approval item if high/urgent priority
    const newApp: ApprovalItem = {
      id: `APR-${Math.floor(310 + Math.random() * 100)}`,
      requestId: newId,
      requestTitle: newReq.title,
      requesterName: newReq.requester.name,
      requesterAvatar: newReq.requester.avatar,
      department: newReq.department,
      priority: newReq.priority,
      timeWaiting: '1m',
      amountOrScope: newReq.amount,
      requiredAction: 'Operations Sign-Off Required',
      status: 'Pending'
    };
    setApprovals((prev) => [newApp, ...prev]);

    addToast(`New request ${newId} created`, 'success');
  };

  // Exception Resolver
  const resolveException = (exceptionId: string, resolutionNotes: string) => {
    const nowStr = new Date().toLocaleString();

    setExceptions((prev) =>
      prev.map((exc) => {
        if (exc.id === exceptionId) {
          return {
            ...exc,
            status: 'Resolved',
            severity: 'Resolved',
            resolutionNotes,
            resolvedAt: nowStr
          };
        }
        return exc;
      })
    );

    addToast(`Exception ${exceptionId} resolved successfully`, 'success');
  };

  // Workflow Operations
  const addWorkflowStep = (stepData: Omit<WorkflowNode, 'id'>) => {
    const newStep: WorkflowNode = {
      ...stepData,
      id: `wf-step-${workflow.steps.length + 1}`,
      status: 'configured'
    };

    setWorkflow((prev) => ({
      ...prev,
      steps: [...prev.steps, newStep],
      metrics: {
        ...prev.metrics,
        steps: prev.steps.length + 1
      }
    }));

    addToast(`Workflow step "${newStep.title}" added`, 'success');
  };

  const updateWorkflowStep = (stepId: string, updated: Partial<WorkflowNode>) => {
    setWorkflow((prev) => ({
      ...prev,
      steps: prev.steps.map((s) => (s.id === stepId ? { ...s, ...updated } : s))
    }));

    addToast('Workflow step updated', 'success');
  };

  const deleteWorkflowStep = (stepId: string) => {
    setWorkflow((prev) => ({
      ...prev,
      steps: prev.steps.filter((s) => s.id !== stepId),
      metrics: {
        ...prev.metrics,
        steps: prev.steps.length - 1
      }
    }));

    addToast('Workflow step removed', 'info');
  };

  const saveWorkflow = () => {
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setWorkflow((prev) => ({
      ...prev,
      lastSaved: `Today at ${nowStr}`
    }));

    addToast('Workflow configuration saved successfully', 'success');
  };

  // Integration Operations
  const connectIntegration = (integrationId: string, workspaceUrl: string, permissions: string[]) => {
    setIntegrations((prev) =>
      prev.map((item) => {
        if (item.id === integrationId) {
          return {
            ...item,
            status: 'Connected',
            workspaceUrl,
            permissions: permissions.length > 0 ? permissions : item.permissions,
            lastSync: 'Just now',
            webhookStatus: 'Active'
          };
        }
        return item;
      })
    );

    const target = integrations.find((i) => i.id === integrationId);
    addToast(`${target?.name || 'Integration'} connected successfully`, 'success');
  };

  const disconnectIntegration = (integrationId: string) => {
    setIntegrations((prev) =>
      prev.map((item) => (item.id === integrationId ? { ...item, status: 'Not Connected' } : item))
    );

    const target = integrations.find((i) => i.id === integrationId);
    addToast(`${target?.name || 'Integration'} disconnected`, 'info');
  };

  const testIntegrationConnection = (integrationId: string) => {
    const target = integrations.find((i) => i.id === integrationId);
    addToast(`Connection test for ${target?.name || 'Integration'} successful`, 'success');
  };

  const updateIntegrationPermissions = (integrationId: string, permissions: string[]) => {
    setIntegrations((prev) =>
      prev.map((item) => (item.id === integrationId ? { ...item, permissions } : item))
    );

    addToast('Integration permissions updated', 'success');
  };

  // Settings
  const updateSettings = (category: keyof SettingsModel, key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));

    addToast('Settings preference updated', 'success');
  };

  // Notifications
  const markNotificationRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast('All notifications marked as read', 'info');
  };

  return (
    <FlowOpsContext.Provider
      value={{
        requests,
        approvals,
        workflow,
        exceptions,
        integrations,
        notifications,
        settings,
        toasts,
        addToast,
        removeToast,
        approveRequest,
        rejectRequest,
        requestChanges,
        addRequestComment,
        createNewRequest,
        resolveException,
        addWorkflowStep,
        updateWorkflowStep,
        deleteWorkflowStep,
        saveWorkflow,
        connectIntegration,
        disconnectIntegration,
        testIntegrationConnection,
        updateIntegrationPermissions,
        updateSettings,
        markNotificationRead,
        markAllNotificationsRead
      }}
    >
      {children}
    </FlowOpsContext.Provider>
  );
};

export const useFlowOps = () => {
  const context = useContext(FlowOpsContext);
  if (!context) {
    throw new Error('useFlowOps must be used within a FlowOpsProvider');
  }
  return context;
};
