'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Layout, ListFilter, FileText, CheckCircle2, GitBranch, BarChart2 } from 'lucide-react';

export const WireframeGallery = () => {
  const wireframes = [
    {
      number: '01',
      title: 'Dashboard Wireframe',
      icon: Layout,
      desc: 'High-density metric summary, activity feed, and pending queue priority splits.'
    },
    {
      number: '02',
      title: 'Request List Wireframe',
      icon: ListFilter,
      desc: 'Tabbed filtering, column hierarchy, priority tags & quick status badges.'
    },
    {
      number: '03',
      title: 'Request Details Wireframe',
      icon: FileText,
      desc: 'Slide-over contextual layout with AI Summary block & activity timeline.'
    },
    {
      number: '04',
      title: 'Approval Inbox Wireframe',
      icon: CheckCircle2,
      desc: 'Focused decision cards with explicit SLA countdown timers & action buttons.'
    },
    {
      number: '05',
      title: 'Workflow Builder Wireframe',
      icon: GitBranch,
      desc: 'Visual flowchart canvas with trigger conditions, approval gates & node controls.'
    },
    {
      number: '06',
      title: 'Analytics Screen Wireframe',
      icon: BarChart2,
      desc: 'Aggregated turnaround charts, capacity heatmaps & export filter controls.'
    },
  ];

  return (
    <section className="py-24 bg-white border-t border-gray-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="block text-xs font-bold uppercase tracking-wider text-blue-600 mb-3">
            LO-FI EXPLORATION
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
            Wireframe Gallery
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Exploring information density, visual hierarchy, and structural placement before applying high-fidelity design tokens.
          </p>
        </div>

        {/* Gallery Grid (Horizontal Swipe on Mobile) */}
        <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto pb-6 md:pb-0 scrollbar-none snap-x snap-mandatory">
          {wireframes.map((wf) => {
            const Icon = wf.icon;
            return (
              <motion.div
                key={wf.number}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="min-w-[280px] sm:min-w-[320px] md:min-w-0 snap-center bg-gray-50 border border-gray-200 rounded-2xl p-5 group flex flex-col justify-between hover:bg-white hover:border-gray-300 hover:shadow-card transition-all cursor-pointer"
              >
                {/* Simulated Wireframe Screen Canvas */}
                <div className="relative aspect-[4/3] bg-gray-100 border border-gray-200 rounded-xl p-4 overflow-hidden mb-5 flex flex-col justify-between group-hover:border-gray-400 transition-colors">
                  {/* Top Bar Skeleton */}
                  <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gray-300" />
                      <div className="w-12 h-2.5 bg-gray-300 rounded" />
                    </div>
                    <div className="w-16 h-4 bg-gray-200 rounded" />
                  </div>

                  {/* Wireframe Body Skeleton Mockup */}
                  <div className="space-y-2.5 my-auto">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-8 bg-gray-200 rounded" />
                      <div className="h-8 bg-gray-200 rounded" />
                      <div className="h-8 bg-gray-200 rounded" />
                    </div>
                    <div className="h-12 bg-gray-200/80 rounded" />
                    <div className="space-y-1.5">
                      <div className="h-2 bg-gray-300 rounded w-full" />
                      <div className="h-2 bg-gray-300 rounded w-4/5" />
                      <div className="h-2 bg-gray-200 rounded w-2/3" />
                    </div>
                  </div>

                  {/* Wireframe Badge Overlay */}
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-gray-800 text-white font-mono text-[10px] font-bold">
                    SCREEN #{wf.number}
                  </div>
                </div>

                {/* Wireframe Info Label */}
                <div>
                  <div className="flex items-center gap-2 text-gray-700 font-bold text-sm mb-1 group-hover:text-blue-600 transition-colors">
                    <Icon className="w-4 h-4" />
                    <span>{wf.title}</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {wf.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Caption */}
        <div className="mt-12 text-center">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            “Exploring hierarchy and information density before visual styling.”
          </p>
        </div>

      </div>
    </section>
  );
};
