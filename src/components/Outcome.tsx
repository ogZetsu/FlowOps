'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Layers, Eye, Zap } from 'lucide-react';

export const Outcome = () => {
  const qualitativeImpacts = [
    {
      title: 'Clearer Workflows',
      desc: 'Multi-party approval sequences are visualized as connected node flows, eliminating hidden bottlenecks across departments.',
      icon: Layers
    },
    {
      title: 'Better Status Visibility',
      desc: 'Real-time ownership tags, SLA countdown indicators, and priority badges give operators immediate context without manual status checks.',
      icon: Eye
    },
    {
      title: 'Structured Decision Making',
      desc: 'AI-assisted request summaries highlight key risks, budget impacts, and recommended next actions prior to manager sign-off.',
      icon: Zap
    },
    {
      title: 'Centralized Information Hub',
      desc: 'Replaces fragmented email threads, detached spreadsheets, and disconnected chat alerts with a single source of truth.',
      icon: CheckCircle2
    },
    {
      title: 'Scalable Interface System',
      desc: 'Reusable component tokens allow engineering and design teams to launch new operational workflows effortlessly.',
      icon: ShieldCheck
    }
  ];

  return (
    <section id="outcome" className="py-24 bg-white border-t border-gray-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="block text-xs font-bold uppercase tracking-wider text-blue-600 mb-3">
            QUALITATIVE OUTCOME & IMPACT
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            “From operational complexity to clarity.”
          </h2>
        </div>

        {/* Qualitative Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {qualitativeImpacts.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className="bg-[#FAFAFA] border border-gray-200 p-6 rounded-2xl flex flex-col justify-between hover:border-blue-400 transition-all"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 text-blue-600 flex items-center justify-center mb-4 shadow-subtle">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
