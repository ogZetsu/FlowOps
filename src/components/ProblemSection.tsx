'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  FileSpreadsheet, 
  CheckSquare, 
  MessageSquare, 
  FileText, 
  BellRing, 
  Inbox,
  ArrowRight,
  Sparkles,
  Layers,
  Zap,
  RotateCcw
} from 'lucide-react';

export const ProblemSection = () => {
  const [isCentralized, setIsCentralized] = useState(false);

  const disconnectedItems = [
    { name: 'Requests', icon: Inbox, color: 'text-amber-600 border-amber-200 bg-amber-50', posBefore: 'translate-x-[-120px] translate-y-[-80px]' },
    { name: 'Email', icon: Mail, color: 'text-blue-600 border-blue-200 bg-blue-50', posBefore: 'translate-x-[140px] translate-y-[-90px]' },
    { name: 'Spreadsheets', icon: FileSpreadsheet, color: 'text-emerald-600 border-emerald-200 bg-emerald-50', posBefore: 'translate-x-[-150px] translate-y-[40px]' },
    { name: 'Approvals', icon: CheckSquare, color: 'text-purple-600 border-purple-200 bg-purple-50', posBefore: 'translate-x-[160px] translate-y-[50px]' },
    { name: 'Messages', icon: MessageSquare, color: 'text-pink-600 border-pink-200 bg-pink-50', posBefore: 'translate-x-[0px] translate-y-[-130px]' },
    { name: 'Documents', icon: FileText, color: 'text-indigo-600 border-indigo-200 bg-indigo-50', posBefore: 'translate-x-[-60px] translate-y-[110px]' },
    { name: 'Notifications', icon: BellRing, color: 'text-red-600 border-red-200 bg-red-50', posBefore: 'translate-x-[80px] translate-y-[120px]' },
  ];

  return (
    <section id="process" className="py-24 bg-[#FAFAFA] border-t border-gray-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
            01 / PROBLEM
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Operations become complicated when information lives everywhere.
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Modern operations teams spend up to 40% of their workday searching for context across email threads, detached spreadsheets, ticketing channels, and disconnected approval tools. Critical requests get delayed, ownership becomes unclear, and exceptions trigger chaos.
          </p>
        </div>

        {/* Interactive Before vs After Interactive Showcase Container */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-12 shadow-editorial relative overflow-hidden">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-gray-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                INTERACTIVE VISUALIZATION
              </span>
              <h3 className="text-xl font-bold text-gray-900">
                {isCentralized ? 'Centralized FlowOps Workspace' : 'Disconnected Legacy Operations'}
              </h3>
            </div>

            <div className="flex items-center gap-3 bg-gray-100 p-1.5 rounded-full border border-gray-200">
              <button
                onClick={() => setIsCentralized(false)}
                className={`px-4 py-2 text-xs font-semibold rounded-full transition-all ${
                  !isCentralized
                    ? 'bg-white text-gray-900 shadow-subtle border border-gray-200'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                BEFORE: Disconnected Chaos
              </button>
              <button
                onClick={() => setIsCentralized(true)}
                className={`px-4 py-2 text-xs font-semibold rounded-full transition-all ${
                  isCentralized
                    ? 'bg-gray-900 text-white shadow-subtle'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                AFTER: FLOWOPS Centralized
              </button>
            </div>
          </div>

          {/* Interactive Graphic Canvas */}
          <div className="relative min-h-[420px] flex items-center justify-center bg-gray-50/70 rounded-2xl border border-gray-200/80 p-8 overflow-hidden">
            
            {/* Background grid */}
            <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />

            {/* Central FlowOps Hub Node */}
            <motion.div
              animate={{
                scale: isCentralized ? 1.05 : 0.9,
                borderColor: isCentralized ? '#2563EB' : '#E5E7EB',
                boxShadow: isCentralized
                  ? '0 20px 40px -15px rgba(37, 99, 235, 0.25)'
                  : '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
              }}
              className="z-20 w-48 h-48 sm:w-56 sm:h-56 bg-white rounded-3xl border-2 flex flex-col items-center justify-center p-6 text-center shadow-card transition-all"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-colors ${
                isCentralized ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'
              }`}>
                <Layers className="w-6 h-6" />
              </div>
              
              <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">PLATFORM</span>
              <h4 className="text-xl font-extrabold text-gray-900 tracking-tight">FLOWOPS</h4>
              
              <span className={`text-[11px] font-medium mt-1 transition-colors ${
                isCentralized ? 'text-blue-600 font-semibold' : 'text-gray-400'
              }`}>
                {isCentralized ? 'Single Source of Truth' : 'Click AFTER to unify'}
              </span>
            </motion.div>

            {/* Orbiting Disconnected vs Unified Nodes */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {disconnectedItems.map((item, idx) => {
                const Icon = item.icon;
                
                // Angle position when centralized in a clean circle around hub
                const angle = (idx * (360 / disconnectedItems.length)) * (Math.PI / 180);
                const radius = 170; // radius in px
                const destX = Math.cos(angle) * radius;
                const destY = Math.sin(angle) * radius;

                return (
                  <motion.div
                    key={item.name}
                    animate={
                      isCentralized
                        ? { x: destX, y: destY, scale: 1, opacity: 1 }
                        : {
                            x: [
                              idx === 0 ? -160 : idx === 1 ? 160 : idx === 2 ? -180 : idx === 3 ? 180 : idx === 4 ? 0 : idx === 5 ? -100 : 100,
                              (idx === 0 ? -160 : idx === 1 ? 160 : idx === 2 ? -180 : idx === 3 ? 180 : idx === 4 ? 0 : idx === 5 ? -100 : 100) + (idx % 2 === 0 ? 8 : -8)
                            ],
                            y: [
                              idx === 0 ? -90 : idx === 1 ? -100 : idx === 2 ? 40 : idx === 3 ? 50 : idx === 4 ? -140 : idx === 5 ? 120 : 130,
                              (idx === 0 ? -90 : idx === 1 ? -100 : idx === 2 ? 40 : idx === 3 ? 50 : idx === 4 ? -140 : idx === 5 ? 120 : 130) + (idx % 2 === 0 ? -8 : 8)
                            ],
                            scale: 0.95,
                            opacity: 0.85
                          }
                    }
                    transition={{
                      duration: isCentralized ? 0.6 : 3,
                      repeat: isCentralized ? 0 : Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                    className={`absolute z-10 flex items-center gap-2 px-3.5 py-2 rounded-xl border shadow-subtle ${item.color} bg-white pointer-events-auto cursor-pointer`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-xs font-semibold text-gray-800">{item.name}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* Connecting lines SVG overlay when Centralized */}
            {isCentralized && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                {disconnectedItems.map((_, idx) => {
                  const angle = (idx * (360 / disconnectedItems.length)) * (Math.PI / 180);
                  const radius = 170;
                  return (
                    <line
                      key={idx}
                      x1="50%"
                      y1="50%"
                      x2={`calc(50% + ${Math.cos(angle) * radius}px)`}
                      y2={`calc(50% + ${Math.sin(angle) * radius}px)`}
                      stroke="#3B82F6"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      className="opacity-40"
                    />
                  );
                })}
              </svg>
            )}

          </div>

          {/* Bottom Explanation Banner */}
          <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
                <Zap className="w-4 h-4" />
              </div>
              <p className="text-xs sm:text-sm text-gray-700 font-medium">
                {isCentralized
                  ? 'Result: Operations teams now experience a unified source of truth with zero app context switching.'
                  : 'Problem: Operational signals are fragmented across 7+ disconnected communication siloes.'}
              </p>
            </div>
            
            <button
              onClick={() => setIsCentralized(!isCentralized)}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 shrink-0"
            >
              <span>{isCentralized ? 'View Disconnected State' : 'Unify Workspace'}</span>
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
