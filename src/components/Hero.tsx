'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Sparkles, 
  Layers, 
  Clock, 
  AlertCircle,
  TrendingUp,
} from 'lucide-react';

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const dashboardScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.94]);
  const dashboardOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.8]);

  return (
    <section ref={containerRef} className="relative pt-32 pb-20 overflow-hidden bg-[#FAFAFA]">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Header Content */}
        <motion.div style={{ y: textY }} className="max-w-4xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-900">
              SAIMEEN SHAIKH — CASE STUDY / 01
            </span>
          </div>

          {/* Title */}
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold text-gray-900 tracking-tight leading-[0.95] mb-4">
            FLOWOPS
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl font-medium text-gray-600 mb-6 tracking-tight">
            B2B SaaS Workflow Management Platform
          </p>

          {/* Statement */}
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 tracking-tight leading-snug mb-6 max-w-3xl">
            “Designing clarity for complex operational workflows.”
          </h2>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-10 max-w-2xl font-normal">
            FlowOps brings requests, approvals, workflows and operational insights into one centralized, enterprise-grade workspace.
          </p>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 py-6 border-y border-gray-200/80 mb-16">
            <div>
              <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                DESIGNER
              </span>
              <span className="text-sm font-bold text-gray-900">
                Saimeen Shaikh
              </span>
            </div>

            <div>
              <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                ROLE
              </span>
              <span className="text-sm font-semibold text-gray-900">
                UI/UX Designer
              </span>
            </div>

            <div>
              <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                FOCUS
              </span>
              <span className="text-sm font-semibold text-gray-900">
                Product Design · UX · UI
              </span>
            </div>

            <div>
              <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                TOOLS
              </span>
              <span className="text-sm font-semibold text-gray-900">
                Figma · Prototyping
              </span>
            </div>

            <div>
              <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                YEAR
              </span>
              <span className="text-sm font-semibold text-gray-900">
                2026
              </span>
            </div>
          </div>
        </motion.div>

        {/* Dashboard Visual Frame */}
        <motion.div
          style={{ scale: dashboardScale, opacity: dashboardOpacity }}
          className="relative rounded-2xl border border-gray-200 shadow-2xl bg-white overflow-hidden"
        >
          {/* Browser Top Window Bar */}
          <div className="bg-gray-100/90 border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
            </div>

            <div className="bg-white px-6 py-1 rounded-md text-xs font-mono text-gray-500 border border-gray-200 shadow-subtle flex items-center gap-2">
              <span className="text-gray-400">https://</span>app.flowops.internal/dashboard
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
              <span className="hidden sm:inline px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-semibold">
                SYSTEM ONLINE
              </span>
            </div>
          </div>

          {/* Main Simulated Hero Product UI Screen */}
          <div className="p-4 sm:p-6 lg:p-8 bg-gray-50/50">
            {/* Top Workspace Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
              <div>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  OPERATIONS WORKSPACE
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Operations Overview
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  Here&apos;s what&apos;s happening across your business operations today.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button className="px-3.5 py-1.5 bg-white border border-gray-200 text-xs font-medium text-gray-700 rounded-lg shadow-subtle hover:bg-gray-50">
                  Export Report
                </button>
                <button className="px-3.5 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg shadow-sm hover:bg-gray-800">
                  + New Request
                </button>
              </div>
            </div>

            {/* KPI Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-6">
              {[
                { title: 'Open Requests', value: '28', change: '+12% this week', icon: Layers, color: 'blue' },
                { title: 'Pending Approvals', value: '7', change: '3 urgent', icon: Clock, color: 'amber' },
                { title: 'Active Workflows', value: '14', change: '99.4% uptime', icon: TrendingUp, color: 'emerald' },
                { title: 'Exceptions', value: '2', change: 'Requires attention', icon: AlertCircle, color: 'red' },
              ].map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div key={idx} className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-subtle">
                    <div className="flex items-center justify-between text-gray-400 mb-2">
                      <span className="text-xs font-medium text-gray-500">{card.title}</span>
                      <Icon className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 tracking-tight mb-1">
                      {card.value}
                    </div>
                    <div className="text-[11px] font-medium text-gray-500">
                      {card.change}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Content Split: Request Activity Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Requests List */}
              <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5 shadow-subtle">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold text-gray-900">Recent High-Priority Requests</h4>
                  <span className="text-xs text-blue-600 font-medium cursor-pointer hover:underline">View All</span>
                </div>

                <div className="space-y-3">
                  {[
                    { title: 'Q4 Enterprise Cloud Infrastructure Budget Upgrade', dept: 'DevOps', priority: 'Urgent', status: 'Pending Approval', statusBg: 'bg-amber-50 text-amber-700 border-amber-200' },
                    { title: 'SOC2 Compliance Automated Audit Log Integration', dept: 'Security', priority: 'High', status: 'In Review', statusBg: 'bg-blue-50 text-blue-700 border-blue-200' },
                    { title: 'New Vendor Onboarding: Databricks Enterprise Tier', dept: 'Data Eng', priority: 'Medium', status: 'Approved', statusBg: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
                  ].map((row, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-gray-200 bg-gray-50/50 hover:bg-gray-50 transition-all gap-2">
                      <div>
                        <div className="text-xs font-semibold text-gray-900">{row.title}</div>
                        <div className="text-[11px] text-gray-500 flex items-center gap-2 mt-0.5">
                          <span>{row.dept}</span>
                          <span>•</span>
                          <span className="text-red-600 font-medium">{row.priority}</span>
                        </div>
                      </div>
                      <span className={`inline-flex px-2.5 py-1 text-[11px] font-medium rounded-full border ${row.statusBg}`}>
                        {row.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Summary Sidebar Detail */}
              <div className="bg-gradient-to-br from-blue-900 to-gray-900 rounded-xl p-5 text-white shadow-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-blue-400 mb-3">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">AI ASSISTED SUMMARY</span>
                  </div>
                  <h5 className="text-sm font-semibold text-white mb-2">
                    Request #REQ-8492 Requires Sign-Off
                  </h5>
                  <p className="text-xs text-gray-300 leading-relaxed mb-4">
                    “Q4 Cloud Infrastructure Upgrade ($45,000) has been pending for 18h in Finance queue. Critical path for SOC2 compliance.”
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-800 flex items-center justify-between text-xs">
                  <span className="text-gray-400 font-medium">Owner: Operations Lead</span>
                  <span className="px-2 py-1 bg-blue-600 text-white rounded font-medium text-[10px]">Action Required</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
