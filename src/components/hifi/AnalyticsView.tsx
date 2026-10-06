'use client';

import React, { useState } from 'react';
import { Download, Calendar, Clock, CheckCircle2, TrendingUp, AlertOctagon } from 'lucide-react';
import { useFlowOps } from '@/context/FlowOpsContext';

export const AnalyticsView: React.FC = () => {
  const { requests, approvals, exceptions, addToast } = useFlowOps();
  const [dateRange, setDateRange] = useState('Last 30 Days');

  const pendingApprovalsCount = approvals.filter(a => a.status === 'Pending').length;
  const approvedRequestsCount = requests.filter(r => r.status === 'Approved' || r.status === 'Completed').length;
  const activeExceptionsCount = exceptions.filter(e => e.status === 'Open').length;

  const handleExport = () => {
    addToast(`Analytics report (${dateRange}) exported as CSV`, 'success');
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Operational Analytics & Reports</h2>
          <p className="text-xs text-gray-500">Measure turnaround velocity, SLA compliance, and team throughput</p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => {
              setDateRange(e.target.value);
              addToast(`Date range updated to ${e.target.value}`, 'info');
            }}
            className="px-3.5 py-1.5 bg-white border border-gray-200 text-xs font-semibold text-gray-700 rounded-lg shadow-subtle focus:outline-none"
          >
            <option value="Last 7 Days">Last 7 Days</option>
            <option value="Last 30 Days">Last 30 Days</option>
            <option value="Last 90 Days">Last 90 Days</option>
          </select>

          <button
            onClick={handleExport}
            className="px-3.5 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-lg shadow-sm hover:bg-gray-800 transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Metric Highlights Derived From Context */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Avg Turnaround', val: '4.2 Hours', note: '-1.8h vs last month', icon: Clock, color: 'text-blue-600' },
          { label: 'Completed Requests', val: `${approvedRequestsCount} / ${requests.length}`, note: 'Approved & Completed', icon: CheckCircle2, color: 'text-emerald-600' },
          { label: 'Pending Approvals', val: `${pendingApprovalsCount} Pending`, note: 'In approval queues', icon: TrendingUp, color: 'text-amber-600' },
          { label: 'Open Exceptions', val: `${activeExceptionsCount} Active`, note: 'Action required', icon: AlertOctagon, color: activeExceptionsCount > 0 ? 'text-red-600' : 'text-emerald-600' },
        ].map((m, i) => {
          const Icon = m.icon;
          return (
            <div key={i} className="bg-white border border-gray-200 p-5 rounded-xl shadow-subtle">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-500">{m.label}</span>
                <Icon className={`w-4 h-4 ${m.color}`} />
              </div>
              <div className="text-2xl font-extrabold text-gray-900 mb-1">{m.val}</div>
              <div className="text-[11px] font-medium text-gray-500">{m.note}</div>
            </div>
          );
        })}
      </div>

      {/* Visual Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Turnaround Time Distribution */}
        <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-subtle">
          <h3 className="text-sm font-bold text-gray-900 mb-1">Approval Turnaround Velocity</h3>
          <p className="text-xs text-gray-500 mb-6">Average hours taken per department gate</p>

          <div className="space-y-4">
            {[
              { dept: 'DevOps Infrastructure', hrs: '1.4h', pct: '20%', bg: 'bg-emerald-500' },
              { dept: 'Security & Compliance', hrs: '4.2h', pct: '50%', bg: 'bg-blue-500' },
              { dept: 'Finance Approval Gate', hrs: '12.8h', pct: '85%', bg: 'bg-amber-500' },
              { dept: 'Legal & Procurement', hrs: '18.2h', pct: '95%', bg: 'bg-purple-500' },
            ].map((row, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-gray-700">
                  <span>{row.dept}</span>
                  <span className="text-gray-900 font-bold">{row.hrs}</span>
                </div>
                <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${row.bg}`} style={{ width: row.pct }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workflow Completion Rates */}
        <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-subtle">
          <h3 className="text-sm font-bold text-gray-900 mb-1">Workflow Success Rates</h3>
          <p className="text-xs text-gray-500 mb-6">Percentage of requests completed without manual intervention</p>

          <div className="space-y-4">
            {[
              { wf: 'Enterprise Infrastructure Approval', rate: '99.2%', pct: '99%' },
              { wf: 'Security Audit Clearance', rate: '96.8%', pct: '96%' },
              { wf: 'Employee Onboarding Sequence', rate: '94.5%', pct: '94%' },
              { wf: 'Production Access Gate', rate: '88.5%', pct: '88%' },
            ].map((row, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-gray-700">
                  <span>{row.wf}</span>
                  <span className="text-emerald-700 font-bold">{row.rate}</span>
                </div>
                <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gray-900" style={{ width: row.pct }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
