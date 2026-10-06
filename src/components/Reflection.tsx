'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, CheckCircle2 } from 'lucide-react';

export const Reflection = () => {
  const learnings = [
    'Information Architecture for Multi-Party Approvals',
    'Complex Workflow Node Visualization',
    'Enterprise UX & Information Density',
    'Design Systems & Accessible Tokenization',
    'Progressive Disclosure UI Patterns',
    'High-Precision Interaction & Micro-Animations'
  ];

  return (
    <section className="py-24 bg-[#FAFAFA] border-t border-gray-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-12 shadow-editorial grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7">
            <span className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
              DESIGNER REFLECTION
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
              “What I learned”
            </h2>
            <p className="text-base text-gray-600 leading-relaxed font-normal mb-6">
              Designing enterprise products requires balancing information density with simplicity. Operators need comprehensive metadata to make decisions, but clutter creates cognitive fatigue. FlowOps demonstrated how thoughtful progressive disclosure can make high-stakes operational tools intuitive.
            </p>
          </div>

          <div className="lg:col-span-5 bg-gray-50 border border-gray-200 p-6 rounded-2xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-4 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              <span>KEY UX TAKEAWAYS</span>
            </h3>

            <div className="space-y-2.5">
              {learnings.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-gray-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
