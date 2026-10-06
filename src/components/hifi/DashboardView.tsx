'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Layers, 
  Clock, 
  TrendingUp, 
  AlertCircle, 
  ArrowUpRight, 
  Plus, 
} from 'lucide-react';
import { useFlowOps } from '@/context/FlowOpsContext';
import { RequestItem } from '@/types/flowops';

interface DashboardViewProps {
  onRequestSelect?: (request: RequestItem) => void;
  onNavigateTab?: (tab: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onRequestSelect, onNavigateTab }) => {
  const { requests, approvals, workflow, exceptions, createNewRequest } = useFlowOps();

  const openRequestsCount = requests.filter(r => r.status === 'Pending' || r.status === 'In Review').length;
  const pendingApprovalsCount = approvals.filter(a => a.status === 'Pending').length;
  const activeWorkflowsCount = workflow.steps.length;
  const activeExceptionsCount = exceptions.filter(e => e.status === 'Open').length;

  const handleQuickCreate = () => {
    createNewRequest({
      title: 'Q4 Enterprise Cloud Infrastructure Budget Upgrade',
      department: 'Infrastructure',
      priority: 'Urgent',
      amount: '$85,000'
    });
    onNavigateTab?.('requests');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Operations Workspace Overview
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Real-time dashboard synchronized across operational queues and exception gates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateTab?.('requests')}
            className="px-3.5 py-2 bg-white border border-gray-200 text-xs font-semibold text-gray-700 rounded-lg shadow-subtle hover:bg-gray-50 transition-colors"
          >
            View All Requests
          </button>
          <button
            onClick={handleQuickCreate}
            className="px-3.5 py-2 bg-gray-900 text-white text-xs font-semibold rounded-lg shadow-sm hover:bg-gray-800 transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>New Request</span>
          </button>
        </div>
      </div>

      {/* Dynamic KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Open Requests', value: openRequestsCount, trend: `${requests.length} total tracked`, color: 'text-blue-600', icon: Layers, tab: 'requests' },
          { label: 'Pending Approvals', value: pendingApprovalsCount, trend: pendingApprovalsCount > 0 ? 'Requires sign-off' : 'Queue clear', color: 'text-amber-600', icon: Clock, tab: 'approvals' },
          { label: 'Active Workflows', value: activeWorkflowsCount, trend: `${workflow.version} active`, color: 'text-emerald-600', icon: TrendingUp, tab: 'workflows' },
          { label: 'Exceptions', value: activeExceptionsCount, trend: activeExceptionsCount > 0 ? 'Action required' : 'All resolved', color: 'text-red-600', icon: AlertCircle, tab: 'exceptions' },
        ].map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -2 }}
              onClick={() => onNavigateTab?.(card.tab)}
              className="bg-white border border-gray-200 p-5 rounded-xl shadow-subtle hover:shadow-card hover:border-gray-300 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between text-gray-400 mb-2">
                <span className="text-xs font-medium text-gray-500">{card.label}</span>
                <Icon className={`w-4 h-4 ${card.color}`} />
              </div>
              <div className="text-3xl font-extrabold text-gray-900 tracking-tight mb-1">
                {card.value}
              </div>
              <div className="text-[11px] font-medium text-gray-500">
                {card.trend}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Analytics & Performance Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Request Activity Bar Chart */}
        <div className="lg:col-span-2 bg-white border border-gray-200 p-6 rounded-xl shadow-subtle">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-gray-900">Request Activity (Last 7 Days)</h3>
              <p className="text-xs text-gray-500">Volume of incoming vs resolved requests</p>
            </div>
            <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2.5 py-1 rounded">
              Weekly View
            </span>
          </div>

          {/* Bar Chart Visual Simulation */}
          <div className="h-44 flex items-end gap-3 sm:gap-6 pt-4 border-b border-gray-100 pb-2">
            {[
              { day: 'Mon', in: 14, out: 12 },
              { day: 'Tue', in: 22, out: 18 },
              { day: 'Wed', in: 28, out: 25 },
              { day: 'Thu', in: 19, out: 20 },
              { day: 'Fri', in: 31, out: 27 },
              { day: 'Sat', in: 8, out: 10 },
              { day: 'Sun', in: 5, out: 6 },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <div className="w-full flex items-end justify-center gap-1 h-full">
                  <div
                    style={{ height: `${(bar.in / 35) * 100}%` }}
                    className="w-1/2 bg-gray-900 rounded-t-sm"
                  />
                  <div
                    style={{ height: `${(bar.out / 35) * 100}%` }}
                    className="w-1/2 bg-blue-500 rounded-t-sm"
                  />
                </div>
                <span className="text-[10px] text-gray-400 font-medium">{bar.day}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 mt-4 text-xs font-medium text-gray-500">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-gray-900 rounded-sm" />
              <span>Incoming Requests</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-blue-500 rounded-sm" />
              <span>Completed Requests</span>
            </div>
          </div>
        </div>

        {/* Workflow Health Panel */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-900">Workflow Health</h3>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Optimal
              </span>
            </div>

            <div className="space-y-4 my-2">
              {[
                { name: 'Finance Approval Gate', SLA: '18h (SLA: 24h)', status: 'Warning', pct: '75%' },
                { name: 'DevOps Cloud Provisioning', SLA: '1.2h (SLA: 4h)', status: 'Healthy', pct: '30%' },
                { name: 'Security & Legal Clearance', SLA: '4.5h (SLA: 12h)', status: 'Healthy', pct: '38%' },
              ].map((wf, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-gray-700">
                    <span>{wf.name}</span>
                    <span className="text-gray-500">{wf.SLA}</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${wf.status === 'Warning' ? 'bg-amber-500' : 'bg-emerald-500'}`}
                      style={{ width: wf.pct }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigateTab?.('workflows')}
            className="w-full mt-4 py-2 bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Configure Workflows
          </button>
        </div>

      </div>

      {/* Recent Requests Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-subtle overflow-hidden">
        <div className="p-5 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-900">Recent Operational Requests</h3>
            <p className="text-xs text-gray-500">Click any request row to open detailed context and AI summary</p>
          </div>

          <button
            onClick={() => onNavigateTab?.('requests')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-200">
                <th className="py-3.5 px-5">Request ID</th>
                <th className="py-3.5 px-5">Title</th>
                <th className="py-3.5 px-5">Requester</th>
                <th className="py-3.5 px-5">Priority</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-700">
              {requests.slice(0, 4).map((req) => (
                <tr
                  key={req.id}
                  onClick={() => onRequestSelect?.(req)}
                  className="hover:bg-blue-50/40 cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-5 font-mono text-gray-500 font-semibold">{req.id}</td>
                  <td className="py-3.5 px-5 font-semibold text-gray-900">{req.title}</td>
                  <td className="py-3.5 px-5 flex items-center gap-2">
                    <img src={req.requester.avatar} alt="" className="w-5 h-5 rounded-full object-cover" />
                    <span>{req.requester.name}</span>
                  </td>
                  <td className="py-3.5 px-5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      req.priority === 'Urgent' ? 'bg-red-100 text-red-800' :
                      req.priority === 'High' ? 'bg-amber-100 text-amber-800' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {req.priority}
                    </span>
                  </td>
                  <td className="py-3.5 px-5">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                      req.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      req.status === 'In Review' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      req.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      'bg-gray-100 text-gray-700 border-gray-200'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-gray-400">{req.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
