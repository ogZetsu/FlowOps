'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, AlertOctagon, CheckCircle2, ShieldAlert, X } from 'lucide-react';
import { useFlowOps } from '@/context/FlowOpsContext';
import { ExceptionItem } from '@/types/flowops';

export const ExceptionsView: React.FC = () => {
  const { exceptions, resolveException } = useFlowOps();
  const [activeTab, setActiveTab] = useState<'All' | 'Critical' | 'Warning' | 'Resolved'>('All');
  const [resolvingItem, setResolvingItem] = useState<ExceptionItem | null>(null);
  const [notes, setNotes] = useState('');

  const filteredExceptions = exceptions.filter((item) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Resolved') return item.status === 'Resolved';
    return item.severity === activeTab && item.status === 'Open';
  });

  const handleConfirmResolve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resolvingItem) return;
    resolveException(resolvingItem.id, notes || 'Manual resolution applied by Operations Lead.');
    setResolvingItem(null);
    setNotes('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Exception & Alert Monitoring</h2>
          <p className="text-xs text-gray-500">Real-time resolution desk for pipeline timeouts, API errors, and SLA breaches</p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl border border-gray-200 text-xs font-semibold">
          {(['All', 'Critical', 'Warning', 'Resolved'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === tab
                  ? 'bg-white text-gray-900 shadow-subtle font-bold'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Exception Cards */}
      <div className="space-y-4">
        {filteredExceptions.length === 0 ? (
          <div className="p-12 text-center bg-white border border-gray-200 rounded-2xl">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-gray-900">No {activeTab} Exceptions Found</h3>
            <p className="text-xs text-gray-500 mt-1">All pipeline gates and webhooks operating within parameters.</p>
          </div>
        ) : (
          filteredExceptions.map((item) => (
            <motion.div
              key={item.id}
              layout
              className="bg-white border border-gray-200 rounded-2xl p-5 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-gray-300 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                  item.severity === 'Critical' ? 'bg-red-50 text-red-600 border border-red-200' :
                  item.severity === 'Warning' ? 'bg-amber-50 text-amber-600 border border-amber-200' :
                  'bg-emerald-50 text-emerald-600 border border-emerald-200'
                }`}>
                  {item.severity === 'Critical' ? <AlertOctagon className="w-5 h-5" /> :
                   item.severity === 'Warning' ? <AlertTriangle className="w-5 h-5" /> :
                   <CheckCircle2 className="w-5 h-5" />}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[11px] font-bold text-gray-400">{item.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                      item.severity === 'Warning' ? 'bg-amber-100 text-amber-800' :
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      {item.severity}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">• {item.timeAgo}</span>
                  </div>

                  <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Impact: <span className="font-semibold text-gray-700">{item.impactedWorkflow}</span>
                  </p>

                  {item.resolutionNotes && (
                    <div className="mt-2 text-[11px] text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                      Resolution Note: {item.resolutionNotes} ({item.resolvedAt})
                    </div>
                  )}
                </div>
              </div>

              <div className="flex sm:flex-col items-end justify-between gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100 shrink-0">
                <span className="text-xs font-semibold text-gray-500">Owner: {item.owner}</span>
                
                {item.status === 'Open' ? (
                  <button
                    onClick={() => setResolvingItem(item)}
                    className="px-3 py-1.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
                  >
                    Resolve Exception
                  </button>
                ) : (
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg">
                    ✓ Resolved
                  </span>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Resolve Exception Modal */}
      <AnimatePresence>
        {resolvingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-modal border border-gray-200"
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-4">
                <h3 className="text-base font-bold text-gray-900">Resolve Exception ({resolvingItem.id})</h3>
                <button onClick={() => setResolvingItem(null)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleConfirmResolve} className="space-y-4 text-xs">
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 space-y-1">
                  <div className="font-bold text-gray-900">{resolvingItem.title}</div>
                  <div className="text-gray-500">Affected Workflow: {resolvingItem.impactedWorkflow}</div>
                  <div className="text-gray-500">Service Owner: {resolvingItem.owner}</div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Resolution Notes & Audit Summary</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Specify remediation steps taken (e.g. payload retried or secondary worker triggered)..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                  />
                </div>

                <div className="pt-3 border-t flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setResolvingItem(null)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 shadow-sm"
                  >
                    Mark as Resolved
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
