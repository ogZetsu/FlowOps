'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, Save, Settings, X, Check, ArrowRight, Play, Layers } from 'lucide-react';
import { useFlowOps } from '@/context/FlowOpsContext';
import { WorkflowNode } from '@/types/flowops';

export const WorkflowBuilderView: React.FC = () => {
  const { workflow, addWorkflowStep, updateWorkflowStep, deleteWorkflowStep, saveWorkflow } = useFlowOps();

  const [editingStep, setEditingStep] = useState<WorkflowNode | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New step form state
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<WorkflowNode['type']>('action');
  const [newDesc, setNewDesc] = useState('');
  const [newRule, setNewRule] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addWorkflowStep({
      title: newTitle,
      type: newType,
      description: newDesc || 'Automated operational gate',
      rule: newRule || 'Execute policy rule',
      status: 'configured'
    });
    setIsAddModalOpen(false);
    setNewTitle('');
    setNewDesc('');
    setNewRule('');
  };

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStep) return;
    updateWorkflowStep(editingStep.id, editingStep);
    setEditingStep(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Visual Workflow Builder</h2>
          <p className="text-xs text-gray-500">Configure automated routing logic, approval gates, and webhook integrations</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={saveWorkflow}
            className="px-3.5 py-2 bg-white border border-gray-200 text-xs font-semibold text-gray-700 rounded-lg shadow-subtle hover:bg-gray-50 transition-colors flex items-center gap-1.5"
          >
            <Save className="w-4 h-4 text-blue-600" />
            <span>Save Workflow</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Step</span>
          </button>
        </div>
      </div>

      {/* Top Overview Summary Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-subtle grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
        <div>
          <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">PIPELINE NAME</span>
          <div className="text-sm font-bold text-gray-900 mt-0.5">{workflow.name}</div>
          <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{workflow.status} ({workflow.version})</span>
          </div>
        </div>

        <div>
          <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">PIPELINE OWNER</span>
          <div className="text-xs font-bold text-gray-800 mt-0.5">{workflow.owner}</div>
          <div className="text-[10px] text-gray-400 mt-0.5">Last saved: {workflow.lastSaved}</div>
        </div>

        <div>
          <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">TOTAL STEPS</span>
          <div className="text-xl font-extrabold text-gray-900 mt-0.5">{workflow.steps.length} Nodes</div>
        </div>

        <div>
          <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">APPROVAL GATES</span>
          <div className="text-xl font-extrabold text-amber-600 mt-0.5">{workflow.metrics.approvals} Gates</div>
        </div>

        <div>
          <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">AVG COMPLETION</span>
          <div className="text-xl font-extrabold text-blue-600 mt-0.5">{workflow.metrics.avgCompletion}</div>
        </div>
      </div>

      {/* Visual Canvas Container */}
      <div className="bg-[#FAFAFA] border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-editorial relative overflow-hidden">
        
        <div className="flex flex-col items-center space-y-4 max-w-2xl mx-auto relative z-10">
          {workflow.steps.map((node, idx) => (
            <React.Fragment key={node.id}>
              {/* Connector Line */}
              {idx > 0 && (
                <div className="w-0.5 h-6 bg-blue-500/40 relative flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                </div>
              )}

              {/* Node Card */}
              <motion.div
                layout
                whileHover={{ scale: 1.01 }}
                className="w-full bg-white border border-gray-200 rounded-2xl p-5 shadow-subtle hover:border-blue-500 transition-all group relative cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl text-xs font-bold uppercase ${
                      node.type === 'trigger' ? 'bg-blue-100 text-blue-700' :
                      node.type === 'approval' ? 'bg-amber-100 text-amber-700' :
                      node.type === 'condition' ? 'bg-purple-100 text-purple-700' :
                      node.type === 'notification' ? 'bg-indigo-100 text-indigo-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {node.type}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{node.title}</h4>
                      <p className="text-xs text-gray-500 mb-0.5">{node.description}</p>
                      {node.assignee && (
                        <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          Assignee: {node.assignee}
                        </span>
                      )}
                      {node.conditionRule && (
                        <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                          Rule: {node.conditionRule}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Node Hover Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingStep(node)}
                      className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 transition-colors"
                      title="Edit Step Settings"
                    >
                      <Settings className="w-4 h-4" />
                    </button>

                    {idx > 0 && (
                      <button
                        onClick={() => deleteWorkflowStep(node.id)}
                        className="p-1.5 rounded-md hover:bg-red-50 text-red-500 transition-colors"
                        title="Delete Step"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </React.Fragment>
          ))}

          {/* Bottom Add Step Action */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="mt-4 px-6 py-3 border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50/50 rounded-2xl text-xs font-bold text-gray-500 hover:text-blue-600 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Next Pipeline Step</span>
          </button>
        </div>

      </div>

      {/* Add Step Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-modal border border-gray-200"
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-4">
                <h3 className="text-base font-bold text-gray-900">Add Workflow Step</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Step Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-900"
                  >
                    <option value="trigger">Trigger (Event Input)</option>
                    <option value="condition">Condition (Rule Check)</option>
                    <option value="approval">Approval Gate (Human Sign-off)</option>
                    <option value="action">Action (Automated Job)</option>
                    <option value="notification">Notification (Audit Log / Alert)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Step Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Compliance Security Audit"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Description</label>
                  <input
                    type="text"
                    placeholder="e.g. Evaluates SOC2 compliance parameters"
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Rule / Assignee</label>
                  <input
                    type="text"
                    placeholder="e.g. Security Lead approval required"
                    value={newRule}
                    onChange={(e) => setNewRule(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                  />
                </div>

                <div className="pt-3 border-t flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 shadow-sm"
                  >
                    Add Step to Workflow
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Step Drawer / Modal */}
      <AnimatePresence>
        {editingStep && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-modal border border-gray-200"
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-4">
                <h3 className="text-base font-bold text-gray-900">Edit Step: {editingStep.title}</h3>
                <button onClick={() => setEditingStep(null)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleUpdateSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Step Title</label>
                  <input
                    type="text"
                    value={editingStep.title}
                    onChange={(e) => setEditingStep({ ...editingStep, title: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Description</label>
                  <input
                    type="text"
                    value={editingStep.description || ''}
                    onChange={(e) => setEditingStep({ ...editingStep, description: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>

                {editingStep.type === 'approval' && (
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Assignee Role</label>
                    <input
                      type="text"
                      value={editingStep.assignee || ''}
                      onChange={(e) => setEditingStep({ ...editingStep, assignee: e.target.value })}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                    />
                  </div>
                )}

                <div className="pt-3 border-t flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingStep(null)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 shadow-sm"
                  >
                    Save Step Changes
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
