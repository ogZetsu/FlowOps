'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlusCircle, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Play, 
  AlertTriangle, 
  BarChart3,
  ChevronRight,
  Info
} from 'lucide-react';

export const UserFlow = () => {
  const [activeNodeIndex, setActiveNodeIndex] = useState<number>(0);

  const flowNodes = [
    {
      id: 'step-1',
      title: 'Request Created',
      icon: PlusCircle,
      type: 'Input Trigger',
      description: 'Operations team or external system submits a new operational request via web UI, API webhook, or Slack integration.',
      uxInsight: 'Smart form defaults autofill requester credentials and metadata to minimize time-to-submit to under 30 seconds.'
    },
    {
      id: 'step-2',
      title: 'Request Review',
      icon: Search,
      type: 'Contextual Evaluation',
      description: 'Automated rules evaluate request parameters (budget size, security scope, urgency) and assign an operational owner.',
      uxInsight: 'AI Summary extracts key risks and highlights blockers directly in the owner inbox view.'
    },
    {
      id: 'step-3',
      title: 'Approval Required',
      icon: CheckCircle2,
      type: 'Stakeholder Gate',
      description: 'Multi-party approval triggers send notification cards to designated managers or department leads.',
      uxInsight: 'Single-click approving via email or Slack without requiring full app navigation.'
    },
    {
      id: 'step-4',
      title: 'Approval Decision',
      icon: CheckCircle2,
      type: 'Decision Node',
      description: 'Manager approves request with mandatory notes or rejects with actionable feedback and alternative choices.',
      uxInsight: 'Rejection requires specific feedback category to prevent infinite communication ping-pong.'
    },
    {
      id: 'step-5',
      title: 'Workflow Execution',
      icon: Play,
      type: 'Automated Execution',
      description: 'Approved parameters trigger automated provisioning jobs (AWS, Okta, Stripe) or manual handoff tasks.',
      uxInsight: 'Real-time progress status bar keeps requester updated without sending manual status inquiry emails.'
    },
    {
      id: 'step-6',
      title: 'Completed / Exception',
      icon: AlertTriangle,
      type: 'State Resolution',
      description: 'Successful completion logs audit records; timeouts or API errors flag an Exception for immediate remediation.',
      uxInsight: 'Restrained alert colors prevent operator panic while providing immediate resolution controls.'
    },
    {
      id: 'step-7',
      title: 'Analytics',
      icon: BarChart3,
      type: 'Continuous Improvement',
      description: 'Turnaround time metrics, bottleneck alerts, and team capacity trends feed into operational analytics dashboard.',
      uxInsight: 'Aggregation charts help department heads identify workflow friction and SLA compliance.'
    }
  ];

  return (
    <section id="ux-thinking" className="py-24 bg-white border-t border-gray-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="block text-xs font-bold uppercase tracking-wider text-blue-600 mb-3">
            USER FLOW & UX ARCHITECTURE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
            End-to-End Operational Flow
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Hover over or click any node to explore the UX design decisions and information architecture at each lifecycle stage.
          </p>
        </div>

        {/* Connected Node Visualization Container */}
        <div className="bg-[#FAFAFA] border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-editorial">
          
          {/* Horizontal / Grid Flow Nodes */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-10 relative">
            {flowNodes.map((node, idx) => {
              const Icon = node.icon;
              const isActive = activeNodeIndex === idx;

              return (
                <div key={node.id} className="relative flex flex-col items-center">
                  
                  {/* Connector Arrow for Desktop */}
                  {idx < flowNodes.length - 1 && (
                    <div className="hidden lg:block absolute top-6 -right-3 z-10 text-gray-300">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  )}

                  {/* Node Button */}
                  <motion.button
                    onClick={() => setActiveNodeIndex(idx)}
                    onMouseEnter={() => setActiveNodeIndex(idx)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full p-4 rounded-2xl border flex flex-col items-center text-center transition-all ${
                      isActive
                        ? 'bg-gray-900 text-white border-gray-900 shadow-card'
                        : 'bg-white text-gray-700 border-gray-200/80 hover:border-blue-400'
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl mb-2.5 ${
                      isActive ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-60 mb-0.5">
                      STEP 0{idx + 1}
                    </span>
                    <span className="text-xs font-bold leading-tight">
                      {node.title}
                    </span>
                  </motion.button>
                </div>
              );
            })}
          </div>

          {/* Active Node Detail Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNodeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-subtle grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
            >
              <div className="md:col-span-7">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-blue-800 text-[10px] font-semibold uppercase tracking-wider">
                    {flowNodes[activeNodeIndex].type}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    Node 0{activeNodeIndex + 1} of 07
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {flowNodes[activeNodeIndex].title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {flowNodes[activeNodeIndex].description}
                </p>
              </div>

              <div className="md:col-span-5 bg-gray-50 border border-gray-200/80 p-5 rounded-xl">
                <div className="flex items-center gap-2 text-blue-600 mb-2">
                  <Info className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">UX DESIGN RATIONALE</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                  “{flowNodes[activeNodeIndex].uxInsight}”
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
};
