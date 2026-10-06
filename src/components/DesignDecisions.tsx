'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const DesignDecisions = () => {
  const decisions = [
    {
      num: '01',
      title: 'STATUS FIRST',
      principle: 'Keep status, priority and ownership visible.',
      rationale: 'Operators should never have to open 3 sub-menus to identify who currently owns a bottleneck. Status badges use clear semantic color coding and SLA timers.'
    },
    {
      num: '02',
      title: 'PROGRESSIVE DISCLOSURE',
      principle: 'Show essential information first and deeper details when needed.',
      rationale: 'Instead of overwhelming operators with 30 database fields at once, summary cards display key triggers, while slide-over drawers present full timelines and AI summaries.'
    },
    {
      num: '03',
      title: 'CONTEXTUAL ACTIONS',
      principle: 'Place actions close to the information needed to make decisions.',
      rationale: 'Approval buttons live directly next to cost impact breakdowns and SLA timers, eliminating context switching between email and internal admin tools.'
    },
    {
      num: '04',
      title: 'CONSISTENT SYSTEM',
      principle: 'Use reusable patterns to make the product scalable.',
      rationale: 'A shared tokenized design system ensures that adding new operational workflows (e.g. legal clearance or procurement) requires zero custom component rebuilding.'
    }
  ];

  return (
    <section className="py-24 bg-[#FAFAFA] border-t border-gray-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
            DESIGN THINKING & TRADE-OFFS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
            “Small decisions that shaped the product.”
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {decisions.map((item) => (
            <motion.div
              key={item.num}
              whileHover={{ y: -4 }}
              className="bg-white border border-gray-200 rounded-2xl p-8 shadow-subtle hover:shadow-card transition-all"
            >
              <div className="text-2xl font-extrabold text-blue-600 font-mono mb-4">
                DECISION {item.num}
              </div>

              <h3 className="text-xl font-extrabold text-gray-900 tracking-tight mb-2">
                {item.title}
              </h3>

              <p className="text-sm font-bold text-gray-800 mb-4">
                “{item.principle}”
              </p>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                {item.rationale}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
