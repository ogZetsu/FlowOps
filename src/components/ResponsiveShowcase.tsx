'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Tablet, Smartphone, Layers, CheckCircle2, AlertCircle } from 'lucide-react';

export const ResponsiveShowcase = () => {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  return (
    <section className="py-24 bg-white border-t border-gray-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 pb-8 border-b border-gray-200">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
              MULTI-DEVICE ADAPTATION
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
              Responsive Design System
            </h2>
          </div>

          {/* Device Switcher Controls */}
          <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-full border border-gray-200 text-xs font-semibold">
            {[
              { id: 'desktop', label: 'Desktop (1440px)', icon: Monitor },
              { id: 'tablet', label: 'Tablet (768px)', icon: Tablet },
              { id: 'mobile', label: 'Mobile (390px)', icon: Smartphone },
            ].map((d) => {
              const Icon = d.icon;
              return (
                <button
                  key={d.id}
                  onClick={() => setDevice(d.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    device === d.id
                      ? 'bg-gray-900 text-white shadow-subtle'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{d.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Responsive Frame Container */}
        <div className="bg-[#FAFAFA] border border-gray-200 rounded-3xl p-6 sm:p-12 shadow-editorial flex justify-center overflow-hidden">
          
          <motion.div
            layout
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={`bg-white border border-gray-300 rounded-2xl shadow-card overflow-hidden transition-all ${
              device === 'desktop' ? 'w-full max-w-5xl' :
              device === 'tablet' ? 'w-[680px]' :
              'w-[360px]'
            }`}
          >
            {/* Viewport Bar */}
            <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex items-center justify-between text-[11px] font-mono text-gray-500">
              <span className="font-bold uppercase text-gray-700">VIEWPORT: {device.toUpperCase()}</span>
              <span>{device === 'desktop' ? '1440 x 900' : device === 'tablet' ? '768 x 1024' : '390 x 844'}</span>
            </div>

            {/* Simulated Responsive FlowOps Screen */}
            <div className="p-4 sm:p-6 space-y-4">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-gray-900 text-white font-bold text-[10px] flex items-center justify-center">F</div>
                  <span className="font-extrabold text-xs tracking-wider">FLOWOPS</span>
                </div>
                <span className="text-[10px] font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                  {device === 'mobile' ? 'Mobile Card Layout' : 'Dense Multi-Column'}
                </span>
              </div>

              {/* Grid Adaptation */}
              <div className={`grid gap-3 ${
                device === 'desktop' ? 'grid-cols-4' :
                device === 'tablet' ? 'grid-cols-2' :
                'grid-cols-1'
              }`}>
                {[
                  { title: 'Open Requests', val: '28' },
                  { title: 'Pending Approvals', val: '7' },
                  { title: 'Active Workflows', val: '14' },
                  { title: 'Exceptions', val: '2' },
                ].map((c, i) => (
                  <div key={i} className="p-3 bg-gray-50 rounded-xl border border-gray-200/80">
                    <div className="text-[10px] text-gray-500 font-medium">{c.title}</div>
                    <div className="text-xl font-bold text-gray-900 mt-0.5">{c.val}</div>
                  </div>
                ))}
              </div>

              {/* Table to Card Responsive Transformation */}
              <div className="pt-2">
                <div className="text-xs font-bold text-gray-900 mb-2">High Priority Requests</div>
                
                {device === 'mobile' ? (
                  /* Mobile Card View */
                  <div className="space-y-2">
                    {[
                      { title: 'Q4 Infrastructure Upgrade', status: 'Pending', priority: 'Urgent' },
                      { title: 'SOC2 Log Integration', status: 'In Review', priority: 'High' }
                    ].map((row, i) => (
                      <div key={i} className="p-3 rounded-xl border border-gray-200 bg-gray-50 space-y-1">
                        <div className="text-xs font-bold text-gray-900">{row.title}</div>
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold">{row.status}</span>
                          <span className="text-red-600 font-bold">{row.priority}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Table View */
                  <div className="border border-gray-200 rounded-xl overflow-hidden text-xs">
                    <div className="bg-gray-50 p-2 font-bold text-gray-500 grid grid-cols-4">
                      <span>ID</span>
                      <span>Request</span>
                      <span>Priority</span>
                      <span>Status</span>
                    </div>
                    <div className="p-2 border-t grid grid-cols-4 text-gray-800 font-medium">
                      <span>REQ-8492</span>
                      <span className="truncate">Q4 Infrastructure Upgrade</span>
                      <span className="text-red-600 font-bold">Urgent</span>
                      <span className="text-amber-700 font-semibold">Pending</span>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
