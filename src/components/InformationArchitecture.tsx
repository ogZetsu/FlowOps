'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Layers, 
  CheckSquare, 
  GitMerge, 
  AlertOctagon, 
  BarChart3, 
  Plug, 
  Settings,
  CornerDownRight
} from 'lucide-react';

export const InformationArchitecture = () => {
  const primaryDomains = [
    {
      name: 'Dashboard',
      icon: LayoutDashboard,
      desc: 'Operational summary, active bottlenecks, daily queue KPIs & AI insights',
      children: ['Overview Cards', 'Activity Feed', 'SLA Counter', 'Quick Actions']
    },
    {
      name: 'Requests',
      icon: Layers,
      desc: 'Central request inventory, search, multi-faceted filtering & detail views',
      children: ['All Requests', 'Filter by Priority', 'Request Detail Panel', 'New Request Form']
    },
    {
      name: 'Approvals',
      icon: CheckSquare,
      desc: 'Dedicated stakeholder decision inbox, pending queues & single-click actions',
      children: ['Pending Queue', 'Approval History', 'Approve Modal', 'Reject Feedback']
    },
    {
      name: 'Workflows',
      icon: GitMerge,
      desc: 'Visual drag-and-drop workflow canvas, rule definitions & automated triggers',
      children: ['Visual Canvas', 'Trigger Rules', 'Node Configurator', 'Version History']
    },
    {
      name: 'Exceptions',
      icon: AlertOctagon,
      desc: 'Real-time failure monitoring, SLA breach alerts & manual remediation triggers',
      children: ['Critical Alerts', 'SLA Warnings', 'Resolution Controls', 'Audit Logs']
    },
    {
      name: 'Analytics',
      icon: BarChart3,
      desc: 'Turnaround metrics, team capacity insights & compliance reporting exports',
      children: ['Turnaround Charts', 'Capacity Heatmap', 'Export Reports', 'Custom Ranges']
    },
    {
      name: 'Integrations',
      icon: Plug,
      desc: 'Third-party connectors (AWS, Okta, Slack, Datadog, Stripe) & API management',
      children: ['Active Webhooks', 'API Keys', 'App Marketplace', 'Health Check']
    },
    {
      name: 'Settings',
      icon: Settings,
      desc: 'Workspace RBAC permissions, notification routing preferences & organization profiles',
      children: ['User Roles', 'Notification Rules', 'SSO Security', 'Billing']
    }
  ];

  return (
    <section className="py-24 bg-[#FAFAFA] border-t border-gray-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
            INFORMATION ARCHITECTURE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
            Product Navigation & Sitemap
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Structuring the product around the decisions users need to make, rather than database schemas.
          </p>
        </div>

        {/* Root Node Container */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-editorial">
          
          {/* Top Parent Node */}
          <div className="flex justify-center mb-12">
            <div className="px-6 py-3 bg-gray-900 text-white rounded-full border border-gray-800 shadow-card flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest">
                FLOWOPS WORKSPACE (ROOT LEVEL)
              </span>
            </div>
          </div>

          {/* Sub-Domains Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {primaryDomains.map((domain) => {
              const Icon = domain.icon;
              return (
                <motion.div
                  key={domain.name}
                  whileHover={{ y: -4 }}
                  className="bg-[#FAFAFA] border border-gray-200 p-5 rounded-2xl flex flex-col justify-between hover:border-blue-400 transition-all group"
                >
                  <div>
                    {/* Domain Title */}
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="p-2 rounded-lg bg-white border border-gray-200 text-blue-600 shadow-subtle group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-900">
                        {domain.name}
                      </h3>
                    </div>

                    <p className="text-xs text-gray-500 leading-relaxed mb-4">
                      {domain.desc}
                    </p>
                  </div>

                  {/* Children Sub-nav items */}
                  <div className="pt-3 border-t border-gray-200/80 space-y-1.5">
                    {domain.children.map((child, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px] text-gray-600 font-medium">
                        <CornerDownRight className="w-3 h-3 text-gray-400" />
                        <span>{child}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Caption Footer */}
          <div className="mt-12 text-center pt-8 border-t border-gray-100">
            <blockquote className="text-sm italic font-medium text-gray-600">
              “Structuring the product around the decisions users need to make.”
            </blockquote>
          </div>

        </div>

      </div>
    </section>
  );
};
