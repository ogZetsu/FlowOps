'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Gauge, Eye, Sparkles } from 'lucide-react';

export const DesignGoals = () => {
  const goals = [
    {
      title: 'CLARITY',
      subtitle: 'Make complex workflows understandable.',
      description: 'Break down multi-departmental pipelines into clear visual steps so re-routing or exceptions can be audited instantly.',
      icon: Compass
    },
    {
      title: 'EFFICIENCY',
      subtitle: 'Reduce unnecessary steps.',
      description: 'Eliminate duplicate sign-offs and fragmented chat threads by introducing unified action triggers directly within notification contexts.',
      icon: Gauge
    },
    {
      title: 'VISIBILITY',
      subtitle: 'Make ownership and status obvious.',
      description: 'Ensure every active request has an explicit assigned owner, real-time status badge, and clear escalation timeframe.',
      icon: Eye
    },
    {
      title: 'DECISION SUPPORT',
      subtitle: 'Surface relevant information at the right moment.',
      description: 'Synthesize financial impacts, security risks, and SLA deadlines with AI-assisted contextual request summaries.',
      icon: Sparkles
    }
  ];

  return (
    <section className="py-24 bg-[#FAFAFA] border-t border-gray-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-gray-200">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
              CORE PILLARS
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
              Design Goals & Principles
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-500 max-w-md">
            Guiding framework used to establish a consistent, enterprise-grade UX design system across FlowOps.
          </p>
        </div>

        {/* Large Horizontal Editorial Layout */}
        <div className="space-y-4">
          {goals.map((goal, idx) => {
            const Icon = goal.icon;
            return (
              <motion.div
                key={goal.title}
                whileHover={{ x: 6 }}
                transition={{ duration: 0.2 }}
                className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-subtle hover:border-gray-300 transition-all"
              >
                {/* Left Tag & Icon */}
                <div className="flex items-center gap-6 md:w-1/3">
                  <div className="w-12 h-12 rounded-xl bg-gray-900 text-white flex items-center justify-center shrink-0 font-bold text-sm">
                    0{idx + 1}
                  </div>
                  <div>
                    <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">
                      {goal.title}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 tracking-tight">
                      {goal.subtitle}
                    </h3>
                  </div>
                </div>

                {/* Right Description */}
                <div className="md:w-2/3 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-8 flex items-center justify-between gap-4">
                  <p className="text-sm text-gray-600 leading-relaxed font-normal">
                    {goal.description}
                  </p>
                  <div className="hidden sm:flex p-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-400 shrink-0">
                    <Icon className="w-5 h-5 text-gray-700" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
