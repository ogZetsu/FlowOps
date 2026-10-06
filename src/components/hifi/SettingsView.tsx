'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Bell, 
  ShieldCheck, 
  Users, 
  SlidersHorizontal, 
  Sun, 
  Moon, 
  CheckCircle2, 
  Lock
} from 'lucide-react';
import { useFlowOps } from '@/context/FlowOpsContext';

export const SettingsView: React.FC = () => {
  const { settings, updateSettings } = useFlowOps();

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="pb-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">Workspace & Account Settings</h2>
        <p className="text-xs text-gray-500">Configure profile, notification rules, SLA preferences, and team security</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Settings Sections */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* PROFILE SECTION */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-subtle space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">User Profile</h3>
                <p className="text-xs text-gray-500">Personal information and workspace role</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  readOnly
                  value={settings.profile.name}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-900"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  readOnly
                  value={settings.profile.email}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-gray-700 mb-1">Workspace Role</label>
                <input
                  type="text"
                  readOnly
                  value={settings.profile.role}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-900"
                />
              </div>
            </div>
          </div>

          {/* NOTIFICATION PREFERENCES */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-subtle space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
              <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">Notification Routing</h3>
                <p className="text-xs text-gray-500">Configure alert rules and email digest frequencies</p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { key: 'email', label: 'Email Digest Notifications', desc: 'Send daily summary of open operational requests' },
                { key: 'approvals', label: 'Approval Sign-off Alerts', desc: 'Instant push notifications for pending approval gates' },
                { key: 'exceptions', label: 'Critical Exception Alerts', desc: 'Alert immediately when a webhook or API timeout occurs' },
                { key: 'workflow', label: 'Workflow Execution Alerts', desc: 'Notify upon completion of automated execution jobs' },
              ].map((item) => {
                const isChecked = (settings.notifications as any)[item.key];
                return (
                  <div key={item.key} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <div>
                      <div className="text-xs font-bold text-gray-900">{item.label}</div>
                      <div className="text-[11px] text-gray-500">{item.desc}</div>
                    </div>

                    <button
                      type="button"
                      onClick={() => updateSettings('notifications', item.key, !isChecked)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        isChecked ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          isChecked ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* WORKFLOW PREFERENCES */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-subtle space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
              <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">Workflow & SLA Defaults</h3>
                <p className="text-xs text-gray-500">Configure global timeout rules and auto-escalation thresholds</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Default Approval Timeout</label>
                <select
                  value={settings.preferences.approvalTimeout}
                  onChange={(e) => updateSettings('preferences', 'approvalTimeout', e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-900 focus:outline-none"
                >
                  <option value="12 Hours">12 Hours</option>
                  <option value="24 Hours">24 Hours (Default)</option>
                  <option value="48 Hours">48 Hours</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">SLA Warning Threshold</label>
                <select
                  value={settings.preferences.slaThreshold}
                  onChange={(e) => updateSettings('preferences', 'slaThreshold', e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-900 focus:outline-none"
                >
                  <option value="12 Hours">12 Hours</option>
                  <option value="18 Hours">18 Hours (Default)</option>
                  <option value="36 Hours">36 Hours</option>
                </select>
              </div>
            </div>
          </div>

        </div>

        {/* Sidebar Settings: Security & Team & Appearance */}
        <div className="space-y-8">
          
          {/* APPEARANCE */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-subtle space-y-4">
            <h3 className="text-sm font-bold text-gray-900">Appearance & Density</h3>
            
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-gray-500 mb-1.5">Theme Mode</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => updateSettings('appearance', 'theme', 'light')}
                    className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 font-bold transition-all ${
                      settings.appearance.theme === 'light'
                        ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <Sun className="w-4 h-4" /> Light
                  </button>
                  <button
                    onClick={() => updateSettings('appearance', 'theme', 'dark')}
                    className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 font-bold transition-all ${
                      settings.appearance.theme === 'dark'
                        ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <Moon className="w-4 h-4" /> Dark
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-500 mb-1.5">Layout Density</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => updateSettings('appearance', 'density', 'comfortable')}
                    className={`p-2 rounded-xl border font-semibold text-center transition-all ${
                      settings.appearance.density === 'comfortable'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-gray-50 text-gray-600 border-gray-200'
                    }`}
                  >
                    Comfortable
                  </button>
                  <button
                    onClick={() => updateSettings('appearance', 'density', 'compact')}
                    className={`p-2 rounded-xl border font-semibold text-center transition-all ${
                      settings.appearance.density === 'compact'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-gray-50 text-gray-600 border-gray-200'
                    }`}
                  >
                    Compact
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* TEAM MEMBERS */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-subtle space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">Team & RBAC Roles</h3>
              <span className="text-[10px] font-semibold text-blue-600">4 Active</span>
            </div>

            <div className="space-y-3">
              {[
                { name: 'Saimeen Shaikh', role: 'UI/UX Designer', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
                { name: 'Sarah Jenkins', role: 'Compliance Officer', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
                { name: 'Marcus Chen', role: 'Security & Risk Lead', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
                { name: 'Elena Rostova', role: 'DevOps Lead', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' },
              ].map((m, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <img src={m.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                    <div>
                      <div className="font-bold text-gray-900">{m.name}</div>
                      <div className="text-[10px] text-gray-400">{m.role}</div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-mono">Admin</span>
                </div>
              ))}
            </div>
          </div>

          {/* SECURITY */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-subtle space-y-3">
            <h3 className="text-sm font-bold text-gray-900">Security & Authentication</h3>
            <div className="text-xs space-y-2 text-gray-600">
              <div className="flex justify-between items-center bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                <span>Two-Factor Auth</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Enabled
                </span>
              </div>
              <div className="flex justify-between items-center bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                <span>Session Timeout</span>
                <span className="font-mono text-gray-900 font-semibold">30 Mins</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
