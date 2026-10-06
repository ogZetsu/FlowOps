import { 
  RequestItem, 
  ApprovalItem, 
  WorkflowModel, 
  ExceptionItem, 
  IntegrationItem, 
  NotificationItem, 
  SettingsModel 
} from '@/types/flowops';

export const INITIAL_REQUESTS: RequestItem[] = [
  {
    id: "REQ-8492",
    title: "Q4 Enterprise Cloud Infrastructure Budget Upgrade",
    requester: {
      name: "Elena Rostova",
      email: "elena.rostova@acmeops.io",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      department: "DevOps Engineering"
    },
    owner: {
      name: "Operations Lead",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      role: "Operations Lead"
    },
    priority: "Urgent",
    status: "Pending",
    category: "Financial Approval",
    amount: "$85,000",
    department: "Infrastructure",
    workflowName: "Enterprise Infrastructure Approval",
    updatedAt: "10 mins ago",
    createdAt: "Oct 5, 2026",
    estimatedHours: 24,
    description: "Requesting additional allocation of $85,000 for multi-region Kubernetes cluster deployment to support projected holiday traffic spikes.",
    aiSummary: {
      overview: "This request requires Finance & VP Engineering sign-off prior to provisioning. It has been waiting for 18 hours in the Finance queue.",
      keyPoints: [
        "$85,000 extra allocation required for AWS multi-region cluster",
        "Prerequisite for SOC2 Type II compliance audit",
        "Includes vendor discount valid through end of week"
      ],
      riskAssessment: "Medium",
      nextAction: "Requires Finance VP sign-off to unblock DevOps deployment pipeline."
    },
    timeline: [
      { id: "t1", event: "Request created by Elena Rostova", actor: "Elena Rostova", timestamp: "Oct 5, 09:30 AM", type: "creation" },
      { id: "t2", event: "Automated routing rule triggered: >$5k Finance Review", actor: "System AI", timestamp: "Oct 5, 09:31 AM", type: "status_change" },
      { id: "t3", event: "Assigned to Operations Lead", actor: "Routing Engine", timestamp: "Oct 5, 09:35 AM", type: "status_change" },
      { id: "t4", event: "Comment added: Vendor quote attached to documentation tab", actor: "Elena Rostova", timestamp: "Oct 5, 11:15 AM", type: "comment" }
    ]
  },
  {
    id: "REQ-8491",
    title: "SOC2 Compliance Automated Audit Log Integration",
    requester: {
      name: "Marcus Chen",
      email: "m.chen@acmeops.io",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      department: "Security & Risk"
    },
    owner: {
      name: "Sarah Jenkins",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      role: "Compliance Officer"
    },
    priority: "High",
    status: "In Review",
    category: "Security & Governance",
    amount: "$42,000",
    department: "Security",
    workflowName: "Security Audit Clearance",
    updatedAt: "42 mins ago",
    createdAt: "Oct 4, 2026",
    estimatedHours: 48,
    description: "Connect Datadog audit logs directly into compliance monitoring dashboard with automated monthly reporting.",
    aiSummary: {
      overview: "Standard security automation workflow. Security team has validated API endpoints and permissions.",
      keyPoints: [
        "Read-only API access to Datadog log streams",
        "Automated PDF export generated on 1st of each month",
        "No production downtime expected"
      ],
      riskAssessment: "Low",
      nextAction: "Awaiting final approval from Compliance Lead."
    },
    timeline: [
      { id: "t1", event: "Request created", actor: "Marcus Chen", timestamp: "Oct 4, 02:00 PM", type: "creation" },
      { id: "t2", event: "Security review passed", actor: "Security Bot", timestamp: "Oct 4, 03:15 PM", type: "approval" }
    ]
  },
  {
    id: "REQ-8490",
    title: "Employee Onboarding Automation Pipeline",
    requester: {
      name: "Priya Shah",
      email: "p.shah@acmeops.io",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      department: "People Operations"
    },
    owner: {
      name: "Operations Lead",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      role: "Operations Lead"
    },
    priority: "Medium",
    status: "Approved",
    category: "HR Operations",
    amount: "$15,000",
    department: "People Ops",
    workflowName: "Employee Onboarding Sequence",
    updatedAt: "1 hour ago",
    createdAt: "Oct 4, 2026",
    estimatedHours: 12,
    description: "Automate Okta SCIM provisioning, Slack channel invites, and hardware asset dispatches for Q4 hires.",
    timeline: [
      { id: "t1", event: "Request created", actor: "Priya Shah", timestamp: "Oct 4, 11:00 AM", type: "creation" },
      { id: "t2", event: "HR Approval granted", actor: "People Ops Lead", timestamp: "Oct 4, 01:30 PM", type: "approval" }
    ]
  },
  {
    id: "REQ-8489",
    title: "AWS Production Infrastructure Access Request",
    requester: {
      name: "Daniel Wong",
      email: "d.wong@acmeops.io",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      department: "Data Engineering"
    },
    owner: {
      name: "Sarah Jenkins",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      role: "Security Administrator"
    },
    priority: "High",
    status: "Pending",
    category: "IAM Access",
    amount: "Prod IAM Role",
    department: "Engineering",
    workflowName: "Production Access Gate",
    updatedAt: "2 hours ago",
    createdAt: "Oct 5, 2026",
    estimatedHours: 8,
    description: "Temporary 48-hour elevated admin access to AWS us-east-1 production cluster for database migration.",
    timeline: [
      { id: "t1", event: "Request created", actor: "Daniel Wong", timestamp: "Oct 5, 08:00 AM", type: "creation" }
    ]
  },
  {
    id: "REQ-8488",
    title: "Security Policy Exception Review for Databricks AI",
    requester: {
      name: "Maya Patel",
      email: "m.patel@acmeops.io",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
      department: "Data Science"
    },
    owner: {
      name: "Compliance Team",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      role: "Security Lead"
    },
    priority: "Medium",
    status: "Rejected",
    category: "Security Exception",
    amount: "Data Access",
    department: "Data Science",
    workflowName: "Security Exception Review",
    updatedAt: "3 hours ago",
    createdAt: "Oct 3, 2026",
    estimatedHours: 0,
    description: "Request for direct raw unmasked customer PII export into sandbox machine learning pipeline.",
    timeline: [
      { id: "t1", event: "Request created", actor: "Maya Patel", timestamp: "Oct 3, 09:00 AM", type: "creation" },
      { id: "t2", event: "Rejected due to GDPR PII policy mismatch", actor: "Security Lead", timestamp: "Oct 3, 02:00 PM", type: "status_change" }
    ]
  }
];

export const INITIAL_APPROVALS: ApprovalItem[] = [
  {
    id: "APR-301",
    requestId: "REQ-8492",
    requestTitle: "Q4 Enterprise Cloud Infrastructure Budget Upgrade",
    requesterName: "Elena Rostova",
    requesterAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    department: "Finance",
    priority: "Urgent",
    timeWaiting: "18h",
    amountOrScope: "$85,000",
    requiredAction: "Finance VP Sign-Off Required",
    status: "Pending",
    dueDate: "Today at 5:00 PM"
  },
  {
    id: "APR-302",
    requestId: "REQ-8491",
    requestTitle: "SOC2 Compliance Automated Audit Log Integration",
    requesterName: "Marcus Chen",
    requesterAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    department: "Security",
    priority: "High",
    timeWaiting: "4h",
    amountOrScope: "$42,000",
    requiredAction: "Security Officer Sign-Off",
    status: "In Review",
    dueDate: "Tomorrow at 12:00 PM"
  },
  {
    id: "APR-303",
    requestId: "REQ-8489",
    requestTitle: "AWS Production Infrastructure Access Request",
    requesterName: "Daniel Wong",
    requesterAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    department: "Engineering",
    priority: "High",
    timeWaiting: "2h",
    amountOrScope: "Prod IAM Role",
    requiredAction: "Lead Architect Clearance",
    status: "Pending",
    dueDate: "Today at 3:00 PM"
  }
];

export const INITIAL_WORKFLOW: WorkflowModel = {
  name: "Enterprise Infrastructure Approval",
  status: "Active",
  version: "v2.4",
  owner: "Operations Team",
  lastSaved: "Today at 09:30 AM",
  metrics: {
    steps: 7,
    approvals: 2,
    automations: 3,
    avgCompletion: "4.2h"
  },
  steps: [
    {
      id: "wf-step-1",
      title: "Request Submitted",
      type: "trigger",
      description: "When new operational request is filed via UI, API, or Slack",
      status: "configured"
    },
    {
      id: "wf-step-2",
      title: "Budget Threshold Check",
      type: "condition",
      description: "Check if requested budget exceeds $5,000 threshold",
      conditionRule: "Amount > $5,000",
      status: "configured"
    },
    {
      id: "wf-step-3",
      title: "Finance & Legal Approval",
      type: "approval",
      description: "Dual-key approval gate requiring Finance VP sign-off",
      assignee: "Finance VP & Legal Lead",
      timeout: "24h SLA",
      status: "configured"
    },
    {
      id: "wf-step-4",
      title: "Security Scope Review",
      type: "condition",
      description: "Evaluate if request touches production database or IAM roles",
      conditionRule: "Scope == Production IAM",
      status: "configured"
    },
    {
      id: "wf-step-5",
      title: "Security Approval",
      type: "approval",
      description: "Security Chief clearance required for production access",
      assignee: "Security Chief",
      timeout: "12h SLA",
      status: "configured"
    },
    {
      id: "wf-step-6",
      title: "Provision Infrastructure",
      type: "action",
      description: "Trigger AWS Terraform webhook to execute provisioning job",
      status: "configured"
    },
    {
      id: "wf-step-7",
      title: "Create Audit Log",
      type: "notification",
      description: "Log record to SOC2 repository and send Slack confirmation",
      status: "configured"
    }
  ]
};

export const INITIAL_EXCEPTIONS: ExceptionItem[] = [
  {
    id: "EXC-301",
    severity: "Critical",
    title: "Stripe Webhook Payment Verification Timeout",
    owner: "Payment Gateway Service",
    timeAgo: "14 mins ago",
    status: "Open",
    impactedWorkflow: "Checkout & License Renewal Flow",
    actionRequired: "Retry failed payload or fallback to Adyen backup worker"
  },
  {
    id: "EXC-302",
    severity: "Warning",
    title: "Finance Approval SLA Approaching Threshold",
    owner: "Finance Ops Queue",
    timeAgo: "1 hour ago",
    status: "Open",
    impactedWorkflow: "Q4 Enterprise Infrastructure Budget Upgrade",
    actionRequired: "Auto-escalate to Chief Financial Officer"
  },
  {
    id: "EXC-303",
    severity: "Warning",
    title: "Okta SCIM User Sync Integration Intermittent Delay",
    owner: "Identity Provider",
    timeAgo: "3 hours ago",
    status: "Open",
    impactedWorkflow: "Employee Offboarding Sequence",
    actionRequired: "Re-authenticate token before next batch run"
  },
  {
    id: "EXC-300",
    severity: "Resolved",
    title: "AWS S3 Bucket Permission Mismatch for Audit Exports",
    owner: "Cloud Security Bot",
    timeAgo: "Yesterday",
    status: "Resolved",
    impactedWorkflow: "SOC2 Compliance Logger",
    actionRequired: "IAM policy updated automatically",
    resolutionNotes: "Automated IAM policy patch applied cleanly by Cloud Security Bot.",
    resolvedAt: "Oct 4, 2026, 04:15 PM"
  }
];

export const INITIAL_INTEGRATIONS: IntegrationItem[] = [
  {
    id: "int-slack",
    name: "Slack",
    description: "Real-time team notifications, workflow alerts, and 1-click approvals",
    category: "Communication",
    status: "Connected",
    iconName: "MessageSquare",
    workspaceUrl: "https://flowops-org.slack.com",
    permissions: ["Workflow notifications", "Approval alerts", "Exception alerts"],
    lastSync: "2 mins ago",
    webhookStatus: "Active"
  },
  {
    id: "int-teams",
    name: "Microsoft Teams",
    description: "Enterprise notification channels and manager sign-off cards",
    category: "Communication",
    status: "Not Connected",
    iconName: "MessageCircle",
    permissions: ["Workflow notifications"]
  },
  {
    id: "int-jira",
    name: "Jira Software",
    description: "Create and track engineering issues directly from exception alerts",
    category: "Project Management",
    status: "Connected",
    iconName: "Kanban",
    workspaceUrl: "https://acmeops.atlassian.net",
    permissions: ["Issue creation", "Status sync"],
    lastSync: "15 mins ago",
    webhookStatus: "Active"
  },
  {
    id: "int-github",
    name: "GitHub Enterprise",
    description: "Repository access management and automated PR deployment checks",
    category: "Developer Tools",
    status: "Connected",
    iconName: "GitBranch",
    workspaceUrl: "https://github.com/acme-corp",
    permissions: ["PR status checks", "Repo permissions"],
    lastSync: "1 hour ago",
    webhookStatus: "Active"
  },
  {
    id: "int-aws",
    name: "AWS Infrastructure",
    description: "Automated cloud resource provisioning and IAM permission gating",
    category: "Cloud Infrastructure",
    status: "Connected",
    iconName: "Cloud",
    workspaceUrl: "aws://account-84920491",
    permissions: ["Terraform triggers", "IAM role grants"],
    lastSync: "5 mins ago",
    webhookStatus: "Active"
  },
  {
    id: "int-stripe",
    name: "Stripe Gateway",
    description: "Billing exception tracking, payout approvals, and invoice webhooks",
    category: "Finance & Payments",
    status: "Connected",
    iconName: "CreditCard",
    workspaceUrl: "https://dashboard.stripe.com/acmeops",
    permissions: ["Webhook monitoring", "Payment alerts"],
    lastSync: "14 mins ago",
    webhookStatus: "Active"
  },
  {
    id: "int-okta",
    name: "Okta Identity",
    description: "SCIM user provisioning, SSO authentication, and offboarding triggers",
    category: "Identity & Security",
    status: "Connected",
    iconName: "Lock",
    workspaceUrl: "https://acmeops.okta.com",
    permissions: ["User sync", "SSO SAML 2.0"],
    lastSync: "3 hours ago",
    webhookStatus: "Active"
  },
  {
    id: "int-google",
    name: "Google Workspace",
    description: "Google Drive document attachments and Calendar SLA scheduling",
    category: "Productivity",
    status: "Not Connected",
    iconName: "FileText",
    permissions: ["Document attachments", "Calendar invites"]
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Approval Action Required",
    message: "Request REQ-8492 ($85,000 Infrastructure Upgrade) requires Finance VP sign-off.",
    timestamp: "10 mins ago",
    read: false,
    type: "approval",
    linkId: "REQ-8492"
  },
  {
    id: "notif-2",
    title: "Critical Exception Alert",
    message: "Stripe Webhook Payment Verification Timeout detected on Checkout flow.",
    timestamp: "14 mins ago",
    read: false,
    type: "exception",
    linkId: "EXC-301"
  },
  {
    id: "notif-3",
    title: "Workflow Completed",
    message: "Employee Onboarding Sequence for Priya Shah completed successfully.",
    timestamp: "1 hour ago",
    read: true,
    type: "workflow",
    linkId: "REQ-8490"
  }
];

export const INITIAL_SETTINGS: SettingsModel = {
  profile: {
    name: "Saimeen Shaikh",
    email: "saimeen.shaikh@flowops.portfolio",
    role: "UI/UX Designer & Operations Lead"
  },
  notifications: {
    email: true,
    approvals: true,
    exceptions: true,
    workflow: false
  },
  security: {
    twoFactor: true,
    sessionTimeout: "30 Minutes",
    loginActivity: "Active Session (Windows - Mumbai, IN)"
  },
  preferences: {
    approvalTimeout: "24 Hours",
    slaThreshold: "18 Hours",
    autoEscalation: true
  },
  appearance: {
    theme: "light",
    density: "comfortable"
  }
};
