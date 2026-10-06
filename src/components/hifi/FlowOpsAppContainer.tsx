'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Layers, 
  CheckSquare, 
  GitMerge, 
  AlertOctagon, 
  BarChart3, 
  Plug, 
  Settings,
  HelpCircle,
  Search,
  Command,
  Bell,
  Check,
  X,
  ArrowRight,
  User
} from 'lucide-react';
import { FlowOpsProvider, useFlowOps } from '@/context/FlowOpsContext';
import { ToastContainer } from '@/components/ui/ToastContainer';
import { DashboardView } from './DashboardView';
import { RequestsView } from './RequestsView';
import { RequestDetailsModal } from './RequestDetailsModal';
import { ApprovalsView } from './ApprovalsView';
import { WorkflowBuilderView } from './WorkflowBuilderView';
import { ExceptionsView } from './ExceptionsView';
import { AnalyticsView } from './AnalyticsView';
import { IntegrationsView } from './IntegrationsView';
import { SettingsView } from './SettingsView';
import { RequestItem } from '@/types/flowops';

const InnerFlowOpsApp = () => {
  const { 
    requests, 
    approvals, 
    workflow, 
    exceptions, 
    integrations, 
    notifications, 
    markNotificationRead, 
    markAllNotificationsRead 
  } = useFlowOps();

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedRequest, setSelectedRequest] = useState<RequestItem | null>(null);

  // Global Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Notification panel state
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // Counters
  const openRequestsCount = requests.filter(r => r.status === 'Pending' || r.status === 'In Review').length;
  const pendingApprovalsCount = approvals.filter(a => a.status === 'Pending').length;
  const activeExceptionsCount = exceptions.filter(e => e.status === 'Open').length;
  const unreadNotifCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'requests', label: 'Requests', icon: Layers, badge: `${openRequestsCount}` },
    { id: 'approvals', label: 'Approvals', icon: CheckSquare, badge: `${pendingApprovalsCount}` },
    { id: 'workflows', label: 'Workflows', icon: GitMerge },
    { id: 'exceptions', label: 'Exceptions', icon: AlertOctagon, badge: `${activeExceptionsCount}`, badgeBg: activeExceptionsCount > 0 ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'integrations', label: 'Integrations', icon: Plug, badge: `${integrations.filter(i => i.status === 'Connected').length} connected` },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Grouped search results
  const searchResults = searchQuery.trim() ? {
    requests: requests.filter(r => r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.id.toLowerCase().includes(searchQuery.toLowerCase())),
    approvals: approvals.filter(a => a.requestTitle.toLowerCase().includes(searchQuery.toLowerCase()) || a.id.toLowerCase().includes(searchQuery.toLowerCase())),
    exceptions: exceptions.filter(e => e.title.toLowerCase().includes(searchQuery.toLowerCase()) || e.id.toLowerCase().includes(searchQuery.toLowerCase())),
    integrations: integrations.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()))
  } : null;

  return (
    <div className="bg-white border border-gray-200 rounded-3xl shadow-2xl overflow-hidden max-w-6xl mx-auto my-12 relative">
      
      {/* Top Application Browser Frame Header */}
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-3 flex items-center justify-between relative z-30">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
          <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
          <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
        </div>

        {/* Global Search & Command Palette */}
        <div className="relative flex-1 max-w-md mx-4">
          <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-lg border border-gray-200 shadow-subtle text-xs text-gray-400 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/20 transition-all">
            <Search className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search requests, approvals, workflows, or integrations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              className="flex-1 bg-transparent text-gray-900 focus:outline-none placeholder-gray-400"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-600">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <kbd className="hidden sm:flex px-1.5 py-0.5 bg-gray-100 border border-gray-200 text-[10px] font-mono text-gray-500 rounded items-center gap-0.5">
              <Command className="w-2.5 h-2.5" /> K
            </kbd>
          </div>

          {/* Search Dropdown Panel */}
          {isSearchFocused && searchResults && (
            <div 
              className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-modal p-4 z-50 max-h-80 overflow-y-auto space-y-4 text-xs"
              onMouseLeave={() => setIsSearchFocused(false)}
            >
              {searchResults.requests.length > 0 && (
                <div>
                  <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">REQUESTS</span>
                  <div className="space-y-1">
                    {searchResults.requests.map((r) => (
                      <div
                        key={r.id}
                        onClick={() => {
                          setSelectedRequest(r);
                          setSearchQuery('');
                          setIsSearchFocused(false);
                        }}
                        className="p-2 rounded-lg hover:bg-blue-50 cursor-pointer flex justify-between items-center"
                      >
                        <span className="font-bold text-gray-900">{r.id}: {r.title}</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-gray-100">{r.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {searchResults.approvals.length > 0 && (
                <div>
                  <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">APPROVALS</span>
                  <div className="space-y-1">
                    {searchResults.approvals.map((a) => (
                      <div
                        key={a.id}
                        onClick={() => {
                          setActiveTab('approvals');
                          setSearchQuery('');
                          setIsSearchFocused(false);
                        }}
                        className="p-2 rounded-lg hover:bg-blue-50 cursor-pointer flex justify-between items-center"
                      >
                        <span className="font-bold text-gray-900">{a.id}: {a.requestTitle}</span>
                        <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">{a.requiredAction}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {searchResults.exceptions.length > 0 && (
                <div>
                  <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">EXCEPTIONS</span>
                  <div className="space-y-1">
                    {searchResults.exceptions.map((e) => (
                      <div
                        key={e.id}
                        onClick={() => {
                          setActiveTab('exceptions');
                          setSearchQuery('');
                          setIsSearchFocused(false);
                        }}
                        className="p-2 rounded-lg hover:bg-blue-50 cursor-pointer flex justify-between items-center text-red-600"
                      >
                        <span className="font-bold">{e.id}: {e.title}</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-red-100">{e.severity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Top Right Notifications & User Badge */}
        <div className="flex items-center gap-3">
          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="p-1.5 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-200/60 relative transition-colors"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white" />
              )}
            </button>

            {/* Notifications Popover */}
            <AnimatePresence>
              {isNotifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-2xl shadow-modal p-4 z-50 text-xs"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
                    <span className="font-bold text-gray-900">Notifications ({unreadNotifCount})</span>
                    {unreadNotifCount > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-[10px] font-bold text-blue-600 hover:underline"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  <div className="space-y-2.5 max-h-64 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationRead(n.id)}
                        className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                          n.read ? 'bg-gray-50 border-gray-100 text-gray-600' : 'bg-blue-50/50 border-blue-200 text-gray-900 font-semibold'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1">
                          <span className="font-bold uppercase tracking-wider text-blue-600">{n.type}</span>
                          <span>{n.timestamp}</span>
                        </div>
                        <div className="text-xs font-bold mb-0.5">{n.title}</div>
                        <div className="text-[11px] font-normal leading-relaxed">{n.message}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
              alt="Saimeen Shaikh"
              className="w-6 h-6 rounded-full object-cover border border-gray-300"
            />
            <span className="text-xs font-bold text-gray-800 hidden md:inline">Saimeen Shaikh</span>
          </div>
        </div>
      </div>

      {/* Main Layout Split: Sidebar + Canvas */}
      <div className="flex flex-col md:flex-row min-h-[720px] bg-gray-50/50">
        
        {/* Left Sidebar Navigation */}
        <aside className="w-full md:w-60 bg-white border-r border-gray-200 p-4 flex flex-col justify-between shrink-0">
          <div>
            {/* Brand Logo */}
            <div className="flex items-center gap-2.5 px-3 py-2 mb-6">
              <div className="w-7 h-7 rounded-lg bg-gray-900 text-white font-bold flex items-center justify-center text-xs">
                F
              </div>
              <span className="font-extrabold text-sm tracking-wider uppercase text-gray-900">
                FLOWOPS
              </span>
            </div>

            {/* Nav List */}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-gray-900 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/70'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : `${item.badgeBg || 'bg-gray-100'} text-gray-700`
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer */}
          <div className="pt-4 border-t border-gray-100 space-y-1">
            <button
              onClick={() => setActiveTab('settings')}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-500 hover:text-gray-900 rounded-lg"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Help & Docs</span>
            </button>
          </div>
        </aside>

        {/* Main Workspace Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-gray-50/50 overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
            >
              {activeTab === 'dashboard' && (
                <DashboardView
                  onRequestSelect={(req) => setSelectedRequest(req)}
                  onNavigateTab={(tab) => setActiveTab(tab)}
                />
              )}

              {activeTab === 'requests' && (
                <RequestsView
                  onRequestSelect={(req) => setSelectedRequest(req)}
                />
              )}

              {activeTab === 'approvals' && <ApprovalsView />}

              {activeTab === 'workflows' && <WorkflowBuilderView />}

              {activeTab === 'exceptions' && <ExceptionsView />}

              {activeTab === 'analytics' && <AnalyticsView />}

              {activeTab === 'integrations' && <IntegrationsView />}

              {activeTab === 'settings' && <SettingsView />}
            </motion.div>
          </AnimatePresence>
        </main>

      </div>

      {/* Slide-over / Modal Request Details */}
      {selectedRequest && (
        <RequestDetailsModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
        />
      )}

      {/* Non-blocking Toast Feedback */}
      <ToastContainer />

    </div>
  );
};

export const FlowOpsAppContainer = () => {
  return (
    <FlowOpsProvider>
      <InnerFlowOpsApp />
    </FlowOpsProvider>
  );
};
