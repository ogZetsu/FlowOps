'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Clock, AlertCircle, Check, X, RefreshCw, MessageSquare } from 'lucide-react';
import { useFlowOps } from '@/context/FlowOpsContext';
import { ApprovalItem } from '@/types/flowops';

export const ApprovalsView: React.FC = () => {
  const { approvals, approveRequest, rejectRequest, requestChanges } = useFlowOps();
  const [activeTab, setActiveTab] = useState<string>('Pending');
  const [selectedApproveId, setSelectedApproveId] = useState<string | null>(null);
  const [selectedRejectId, setSelectedRejectId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const filteredApprovals = approvals.filter((item) => {
    if (activeTab === 'All') return true;
    return item.status === activeTab;
  });

  const handleConfirmApprove = () => {
    if (!selectedApproveId) return;
    approveRequest(selectedApproveId);
    setSelectedApproveId(null);
  };

  const handleConfirmReject = () => {
    if (!selectedRejectId) return;
    rejectRequest(selectedRejectId, rejectReason);
    setSelectedRejectId(null);
    setRejectReason('');
  };

  const handleRequestChanges = (id: string) => {
    requestChanges(id, 'Documentation update required before sign-off.');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Approval Management Inbox</h2>
          <p className="text-xs text-gray-500">Action operational sign-offs, financial upgrades, and security approvals</p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl border border-gray-200 text-xs font-semibold overflow-x-auto">
          {['All', 'Pending', 'Approved', 'Rejected', 'Changes Requested'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
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

      {/* Approval Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApprovals.map((item) => (
          <motion.div
            key={item.id}
            layout
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-subtle flex flex-col justify-between hover:border-gray-300 transition-all"
          >
            <div>
              {/* Header Badge Row */}
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[11px] font-bold text-gray-400">{item.id} ({item.requestId})</span>
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                  item.priority === 'Urgent' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {item.priority}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-gray-900 leading-snug mb-3">
                {item.requestTitle}
              </h3>

              {/* Requester Info */}
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100 mb-4">
                <img src={item.requesterAvatar} alt="" className="w-7 h-7 rounded-full object-cover" />
                <div>
                  <div className="text-xs font-bold text-gray-900">{item.requesterName}</div>
                  <div className="text-[10px] text-gray-500">{item.department}</div>
                </div>
              </div>

              {/* Specs */}
              <div className="space-y-2 text-xs mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-500">Time Waiting:</span>
                  <span className="font-semibold text-amber-700 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {item.timeWaiting}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Scope / Amount:</span>
                  <span className="font-semibold text-gray-900">{item.amountOrScope}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Action Needed:</span>
                  <span className="font-semibold text-blue-600">{item.requiredAction}</span>
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="pt-4 border-t border-gray-100">
              {item.status === 'Pending' ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedApproveId(item.requestId)}
                    className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" /> Approve
                  </button>
                  
                  <button
                    onClick={() => setSelectedRejectId(item.requestId)}
                    className="flex-1 py-2 bg-white border border-gray-200 text-red-600 hover:bg-red-50 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" /> Reject
                  </button>

                  <button
                    onClick={() => handleRequestChanges(item.requestId)}
                    className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg text-xs font-semibold transition-colors"
                    title="Request Changes"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className={`text-center py-2 rounded-lg text-xs font-bold ${
                  item.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                  item.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                  'bg-amber-100 text-amber-800'
                }`}>
                  {item.status === 'Approved' ? '✓ Request Approved' :
                   item.status === 'Rejected' ? '✕ Request Rejected' :
                   '↻ Changes Requested'}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Confirmation Modal: Approve */}
      <AnimatePresence>
        {selectedApproveId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-modal border border-gray-200 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Confirm Approval</h3>
              <p className="text-xs text-gray-600 mb-6">
                Are you sure you want to approve request <span className="font-mono font-bold text-gray-900">{selectedApproveId}</span>? This will trigger automated execution downstream.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedApproveId(null)}
                  className="flex-1 py-2 bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmApprove}
                  className="flex-1 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 shadow-sm"
                >
                  Confirm Approval
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Rejection Modal with Reason Field */}
      <AnimatePresence>
        {selectedRejectId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-modal border border-gray-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-red-100 text-red-600">
                  <XCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">Reject Request ({selectedRejectId})</h3>
                  <p className="text-xs text-gray-500">Provide a mandatory reason for the requester</p>
                </div>
              </div>

              <textarea
                rows={3}
                placeholder="Specify rejection reason or missing prerequisite documentation..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 mb-4"
              />

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setSelectedRejectId(null)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmReject}
                  className="px-4 py-2 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 shadow-sm"
                >
                  Submit Rejection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
