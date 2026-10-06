'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Paperclip, 
  Send,
  FileText,
  ShieldAlert,
  Check,
  AlertCircle
} from 'lucide-react';
import { useFlowOps } from '@/context/FlowOpsContext';
import { RequestItem } from '@/types/flowops';

interface RequestDetailsModalProps {
  request: RequestItem | null;
  onClose: () => void;
}

export const RequestDetailsModal: React.FC<RequestDetailsModalProps> = ({ request, onClose }) => {
  const { approveRequest, rejectRequest, requestChanges, addRequestComment } = useFlowOps();
  const [activeTab, setActiveTab] = useState<'overview' | 'workflow' | 'comments' | 'attachments'>('overview');
  const [newComment, setNewComment] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectInput, setShowRejectInput] = useState(false);

  if (!request) return null;

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    addRequestComment(request.id, newComment);
    setNewComment('');
  };

  const handleApprove = () => {
    approveRequest(request.id);
  };

  const handleConfirmReject = () => {
    rejectRequest(request.id, rejectReason);
    setShowRejectInput(false);
  };

  const handleRequestChanges = () => {
    requestChanges(request.id, 'Documentation update required before sign-off.');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gray-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="bg-white border border-gray-200 rounded-3xl w-full max-w-4xl max-h-[90vh] shadow-modal overflow-hidden flex flex-col"
        >
          {/* Top Modal Header */}
          <div className="p-6 border-b border-gray-200 flex items-start justify-between bg-gray-50/50">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-xs font-bold text-gray-400">{request.id}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                  request.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                  request.status === 'In Review' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                  request.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                  'bg-red-50 text-red-700 border-red-200'
                }`}>
                  {request.status}
                </span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-red-100 text-red-800 uppercase">
                  {request.priority} PRIORITY
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                {request.title}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-200/60 text-gray-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Tabs Bar */}
          <div className="px-6 border-b border-gray-200 flex items-center justify-between bg-white text-xs font-semibold text-gray-500">
            <div className="flex items-center gap-6">
              {(['overview', 'workflow', 'comments', 'attachments'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3.5 border-b-2 capitalize transition-all ${
                    activeTab === tab
                      ? 'border-blue-600 text-blue-600 font-bold'
                      : 'border-transparent hover:text-gray-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Top Action Triggers */}
            <div className="flex items-center gap-2 py-2">
              <button
                onClick={handleApprove}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-sm transition-colors flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5" /> Approve
              </button>
              <button
                onClick={() => setShowRejectInput(!showRejectInput)}
                className="px-3 py-1.5 bg-white border border-gray-200 text-red-600 hover:bg-red-50 rounded-lg text-xs font-bold transition-colors"
              >
                Reject
              </button>
              <button
                onClick={handleRequestChanges}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-bold transition-colors"
              >
                Request Changes
              </button>
            </div>
          </div>

          {/* Inline Rejection Reason Field */}
          {showRejectInput && (
            <div className="p-4 bg-red-50 border-b border-red-200 flex items-center gap-3 text-xs">
              <textarea
                placeholder="Provide a reason for rejection..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="flex-1 p-2 bg-white border border-red-200 rounded-lg text-xs focus:outline-none"
              />
              <button
                onClick={handleConfirmReject}
                className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 shrink-0"
              >
                Confirm Rejection
              </button>
            </div>
          )}

          {/* Scrollable Body */}
          <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Main Content Column */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* AI Assisted Summary Concept Component */}
              {request.aiSummary && (
                <div className="bg-gradient-to-br from-gray-900 to-blue-950 text-white rounded-2xl p-6 shadow-card relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-blue-400">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider">
                        AI-ASSISTED SUMMARY
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 bg-white/10 px-2 py-0.5 rounded">
                      CONCEPT PROTOTYPE
                    </span>
                  </div>

                  <p className="text-sm font-medium text-gray-200 leading-relaxed mb-4">
                    “{request.aiSummary.overview}”
                  </p>

                  <div className="space-y-1.5 mb-4">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">KEY POINTS:</span>
                    {request.aiSummary.keyPoints.map((pt, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                        <span className="text-blue-400 font-bold">•</span>
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-gray-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-amber-400">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span className="font-semibold">Risk Level: {request.aiSummary.riskAssessment}</span>
                    </div>
                    <span className="text-blue-300 font-semibold">{request.aiSummary.nextAction}</span>
                  </div>
                </div>
              )}

              {/* Description Block */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  REQUEST DESCRIPTION & DETAILS
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-200/80">
                  {request.description}
                </p>
              </div>

              {/* Activity Timeline */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
                  AUDIT TIMELINE & AUDIT LOG
                </h4>
                <div className="space-y-4 relative pl-4 border-l-2 border-gray-200">
                  {request.timeline.map((item) => (
                    <div key={item.id} className="relative">
                      <div className="absolute -left-[21px] top-0 w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-white" />
                      <div className="text-xs font-bold text-gray-900">{item.event}</div>
                      <div className="text-[11px] text-gray-400 flex items-center gap-2 mt-0.5">
                        <span>{item.actor}</span>
                        <span>•</span>
                        <span>{item.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comments Section */}
              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                  COLLABORATION NOTES
                </h4>

                <form onSubmit={handleAddComment} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add an operational note..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg text-xs font-semibold hover:bg-gray-800"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>

            </div>

            {/* Right Sidebar Column */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Metadata Card */}
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-4">
                <div>
                  <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">REQUESTER</span>
                  <div className="flex items-center gap-2 mt-1">
                    <img src={request.requester.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                    <div>
                      <div className="text-xs font-bold text-gray-900">{request.requester.name}</div>
                      <div className="text-[10px] text-gray-500">{request.requester.department}</div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200/80">
                  <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">RESOURCE / AMOUNT</span>
                  <div className="text-xs font-bold text-gray-900 mt-1">{request.amount}</div>
                </div>

                <div className="pt-3 border-t border-gray-200/80">
                  <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">WORKFLOW PIPELINE</span>
                  <div className="text-xs font-bold text-blue-600 mt-1">{request.workflowName}</div>
                </div>

                <div className="pt-3 border-t border-gray-200/80">
                  <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">ASSIGNED OWNER</span>
                  <div className="flex items-center gap-2 mt-1">
                    <img src={request.owner.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                    <div>
                      <div className="text-xs font-bold text-gray-900">{request.owner.name}</div>
                      <div className="text-[10px] text-gray-500">{request.owner.role}</div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200/80">
                  <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">ESTIMATED SLA RESOLUTION</span>
                  <div className="text-xs font-bold text-gray-900 mt-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>{request.estimatedHours} Hours SLA Remaining</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
