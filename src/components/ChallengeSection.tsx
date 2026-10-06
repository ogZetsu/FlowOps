'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Eye, ShieldCheck, Zap, Layers, ArrowUpRight } from 'lucide-react';

export const ChallengeSection = () => {
  const challenges = [
    {
      number: '01',
      title: 'REDUCE COGNITIVE LOAD',
      explanation: 'Transform dense multi-step enterprise workflows into structured progressive views, surfacing only critical operational decisions when needed.',
      icon: Layers,
      visualType: 'cognitive'
    },
    {
      number: '02',
      title: 'MAKE STATUS VISIBLE',
      explanation: 'Eliminate ambiguity by making request ownership, approval SLA countdowns, and workflow execution states instantly readable at a glance.',
      icon: Eye,
      visualType: 'status'
    },
    {
      number: '03',
      title: 'HELP TEAMS ACT FASTER',
      explanation: 'Embed direct contextual actions, automated routing triggers, and AI-driven summary insights into approval streams for instant resolution.',
      icon: Zap,
      visualType: 'speed'
    },
  ];

  return (
    <section className="py-24 bg-white border-t border-gray-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="block text-xs font-bold uppercase tracking-wider text-blue-600 mb-3">
            DESIGN CHALLENGE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            “How might we make complex workflows feel simple?”
          </h2>
        </div>

        {/* 3 Large Editorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {challenges.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.number}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className="bg-[#FAFAFA] border border-gray-200 p-8 rounded-2xl flex flex-col justify-between hover:shadow-card hover:border-gray-300 transition-all group"
              >
                <div>
                  {/* Top Row: Number & Icon */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-3xl font-extrabold text-gray-300 font-mono group-hover:text-blue-600 transition-colors">
                      {item.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-700 shadow-subtle group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight mb-4 group-hover:text-blue-900">
                    {item.title}
                  </h3>

                  {/* Explanation */}
                  <p className="text-sm text-gray-600 leading-relaxed font-normal mb-8">
                    {item.explanation}
                  </p>
                </div>

                {/* Minimal Visual Element */}
                <div className="pt-6 border-t border-gray-200/60 bg-white p-4 rounded-xl border">
                  {item.visualType === 'cognitive' && (
                    <div className="space-y-2">
                      <div className="h-2 w-3/4 bg-blue-600 rounded-full" />
                      <div className="h-2 w-1/2 bg-gray-200 rounded-full" />
                      <div className="h-2 w-5/6 bg-gray-100 rounded-full" />
                    </div>
                  )}

                  {item.visualType === 'status' && (
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-semibold text-gray-800">Approved (100% SLA)</span>
                    </div>
                  )}

                  {item.visualType === 'speed' && (
                    <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
                      <span>One-Click Approve</span>
                      <ArrowUpRight className="w-4 h-4 text-blue-600" />
                    </div>
                  )}
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
