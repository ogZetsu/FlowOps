'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  MessageCircle, 
  Kanban, 
  GitBranch, 
  Cloud, 
  CreditCard, 
  Lock, 
  FileText, 
  CheckCircle2, 
  X, 
  RefreshCw, 
  Unplug, 
  SlidersHorizontal,
  ExternalLink
} from 'lucide-react';
import { useFlowOps } from '@/context/FlowOpsContext';
import { IntegrationItem } from '@/types/flowops';

export const IntegrationsView: React.FC = () => {
  const { integrations, connectIntegration, disconnectIntegration, testIntegrationConnection } = useFlowOps();

  const [connectingItem, setConnectingItem] = useState<IntegrationItem | null>(null);
  const [managingItem, setManagingItem] = useState<IntegrationItem | null>(null);

  const [workspaceUrl, setWorkspaceUrl] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  // Icon map
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageSquare': return MessageSquare;
      case 'MessageCircle': return MessageCircle;
      case 'Kanban': return Kanban;
      case 'GitBranch': return GitBranch;
      case 'Cloud': return Cloud;
      case 'CreditCard': return CreditCard;
      case 'Lock': return Lock;
      default: return FileText;
    }
  };

  const handleOpenConnectModal = (item: IntegrationItem) => {
    setConnectingItem(item);
    setWorkspaceUrl(item.workspaceUrl || `https://${item.id}.acmeops.io`);
    setSelectedPermissions(item.permissions || []);
  };

  const handleConfirmConnect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!connectingItem) return;
    connectIntegration(connectingItem.id, workspaceUrl, selectedPermissions);
    setConnectingItem(null);
  };

  const handleConfirmDisconnect = (id: string) => {
    disconnectIntegration(id);
    setManagingItem(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Enterprise Integrations Hub</h2>
          <p className="text-xs text-gray-500">Connect cloud infrastructure, communication tools, and identity providers</p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{integrations.filter(i => i.status === 'Connected').length} Active Connections</span>
        </div>
      </div>

      {/* Integration Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((item) => {
          const Icon = getIcon(item.iconName);
          const isConnected = item.status === 'Connected';

          return (
            <motion.div
              key={item.id}
              whileHover={{ y: -3 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-subtle flex flex-col justify-between hover:border-gray-300 transition-all"
            >
              <div>
                {/* Top Row: Icon & Status */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl border ${
                    isConnected ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-gray-50 text-gray-400 border-gray-200'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase border ${
                    isConnected
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-gray-100 text-gray-600 border-gray-200'
                  }`}>
                    {item.status}
                  </span>
                </div>

                {/* Title & Desc */}
                <h3 className="text-base font-bold text-gray-900 mb-1">{item.name}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">{item.description}</p>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-4">
                  CATEGORY: {item.category}
                </span>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-gray-100">
                {isConnected ? (
                  <button
                    onClick={() => setManagingItem(item)}
                    className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Manage Connection</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleOpenConnectModal(item)}
                    className="w-full py-2 bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Connect {item.name}</span>
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Connect Modal */}
      <AnimatePresence>
        {connectingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-modal border border-gray-200"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-4">
                <h3 className="text-base font-bold text-gray-900">Connect {connectingItem.name}</h3>
                <button onClick={() => setConnectingItem(null)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleConfirmConnect} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Organization Workspace URL</label>
                  <input
                    type="text"
                    required
                    value={workspaceUrl}
                    onChange={(e) => setWorkspaceUrl(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-2">Granted OAuth Permissions</label>
                  <div className="space-y-2 bg-gray-50 p-3 rounded-xl border border-gray-200">
                    {['Workflow notifications', 'Approval alerts', 'Exception alerts', 'Audit log sync'].map((perm) => (
                      <label key={perm} className="flex items-center gap-2 text-gray-700 cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedPermissions([...selectedPermissions, perm]);
                            } else {
                              setSelectedPermissions(selectedPermissions.filter(p => p !== perm));
                            }
                          }}
                          className="rounded text-blue-600 focus:ring-blue-500"
                        />
                        <span>{perm}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setConnectingItem(null)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 shadow-sm"
                  >
                    Connect Integration
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Manage Drawer */}
      <AnimatePresence>
        {managingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-end bg-gray-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.2 }}
              className="bg-white w-full max-w-md h-full shadow-modal p-6 overflow-y-auto flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{managingItem.name} Connection</h3>
                    <p className="text-xs text-gray-500">{managingItem.category} Integration</p>
                  </div>
                  <button onClick={() => setManagingItem(null)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-semibold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Status: Active & Synced</span>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-mono">{managingItem.lastSync}</span>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2">
                    <div className="font-bold text-gray-700">WORKSPACE URL</div>
                    <div className="font-mono text-gray-900">{managingItem.workspaceUrl}</div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2">
                    <div className="font-bold text-gray-700">ACTIVE PERMISSIONS</div>
                    <ul className="list-disc pl-4 text-gray-600 space-y-1">
                      {managingItem.permissions.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200 space-y-2">
                <button
                  onClick={() => testIntegrationConnection(managingItem.id)}
                  className="w-full py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 flex items-center justify-center gap-2 text-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Test Connection</span>
                </button>

                <button
                  onClick={() => handleConfirmDisconnect(managingItem.id)}
                  className="w-full py-2.5 bg-red-50 text-red-600 border border-red-200 rounded-xl font-semibold hover:bg-red-100 flex items-center justify-center gap-2 text-xs"
                >
                  <Unplug className="w-3.5 h-3.5" />
                  <span>Disconnect Integration</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
