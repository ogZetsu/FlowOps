'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Target, Cpu, Layers, User } from 'lucide-react';

export const ProjectOverview = () => {
  return (
    <section id="overview" className="py-24 bg-white border-t border-gray-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Headline & Description */}
          <div className="lg:col-span-7">
            <span className="block text-xs font-bold uppercase tracking-wider text-blue-600 mb-3">
              PROJECT OVERVIEW
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
              One workspace for every operational decision.
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed font-normal">
              FlowOps centralizes requests, approvals, workflows and exceptions so operations teams can understand what needs attention and act without switching between disconnected tools.
            </p>
          </div>

          {/* Right Column: Metadata Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {[
              { label: 'DESIGNER', value: 'Saimeen Shaikh', icon: User, detail: 'UI/UX Portfolio Owner' },
              { label: 'ROLE', value: 'UI/UX Designer', icon: Briefcase, detail: 'Lead End-to-End UX' },
              { label: 'PROJECT', value: 'B2B SaaS', icon: Target, detail: 'Enterprise Operations' },
              { label: 'FOCUS', value: 'Enterprise UX', icon: Layers, detail: 'Systems & Architecture' },
              { label: 'TOOLS', value: 'Figma · Prototyping', icon: Cpu, detail: 'Framer & Design Tokens' },
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -3 }}
                  className="bg-[#FAFAFA] border border-gray-200/80 p-5 rounded-xl transition-all"
                >
                  <div className="p-2 w-8 h-8 rounded-lg bg-white border border-gray-200 text-gray-700 mb-3 flex items-center justify-center shadow-subtle">
                    <Icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                    {card.label}
                  </span>
                  <div className="text-sm font-bold text-gray-900 mb-0.5">
                    {card.value}
                  </div>
                  <div className="text-[11px] font-medium text-gray-500">
                    {card.detail}
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
