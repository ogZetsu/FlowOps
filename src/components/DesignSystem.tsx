'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, AlertCircle, Search, SlidersHorizontal, ArrowRight, Sparkles } from 'lucide-react';

export const DesignSystem = () => {
  const [activeTab, setActiveTab] = useState<'buttons' | 'inputs' | 'badges' | 'colors'>('buttons');
  const [btnState, setBtnState] = useState<'default' | 'loading' | 'disabled'>('default');
  const [inputValue, setInputValue] = useState('Search requests, workflows, or owners...');

  const colorSwatches = [
    { name: 'Deep Navy-Black', hex: '#111827', usage: 'Primary text, dark buttons, structural headers' },
    { name: 'Page Surface', hex: '#FAFAFA', usage: 'Clean editorial background canvas' },
    { name: 'Secondary Surface', hex: '#F3F4F6', usage: 'Card surfaces & subtle hover states' },
    { name: 'Royal Blue Accent', hex: '#2563EB', usage: 'Primary CTAs, focused inputs, active tabs' },
    { name: 'Emerald Success', hex: '#059669', usage: 'Approved status badges & SLA metrics' },
    { name: 'Subtle Amber Warning', hex: '#D97706', usage: 'Pending reviews & SLA thresholds' },
    { name: 'Subtle Red Error', hex: '#DC2626', usage: 'Critical exceptions & rejection alerts' },
  ];

  return (
    <section className="py-24 bg-[#FAFAFA] border-t border-gray-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
            DESIGN SYSTEM & COMPONENT LIBRARY
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
            Systematic Design Foundations
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            A cohesive library of design tokens, accessible components, and micro-interaction states designed for scalable enterprise software.
          </p>
        </div>

        {/* Color Palette Grid */}
        <div className="mb-16">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-6">
            COLOR DIRECTION & TOKENS
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {colorSwatches.map((swatch) => (
              <div key={swatch.name} className="bg-white border border-gray-200 p-4 rounded-xl shadow-subtle">
                <div
                  className="w-full h-16 rounded-lg mb-3 border border-gray-200/60 shadow-inner"
                  style={{ backgroundColor: swatch.hex }}
                />
                <div className="flex items-center justify-between font-mono text-xs mb-1">
                  <span className="font-bold text-gray-900">{swatch.name}</span>
                  <span className="text-gray-400">{swatch.hex}</span>
                </div>
                <p className="text-[11px] text-gray-500 font-normal">
                  {swatch.usage}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mini Component Playground */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-editorial">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-gray-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                MINI COMPONENT PLAYGROUND
              </span>
              <h3 className="text-xl font-bold text-gray-900">
                Interactive Component Tokens
              </h3>
            </div>

            {/* Playground Selector Tabs */}
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl border border-gray-200 text-xs font-semibold">
              {(['buttons', 'inputs', 'badges', 'colors'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                    activeTab === tab
                      ? 'bg-white text-gray-900 shadow-subtle font-bold'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content Display */}
          <div className="min-h-[220px] flex items-center justify-center p-6 bg-[#FAFAFA] rounded-2xl border border-gray-200/80">
            
            {activeTab === 'buttons' && (
              <div className="flex flex-wrap items-center gap-4">
                <button className="px-5 py-2.5 bg-gray-900 text-white rounded-xl text-xs font-semibold shadow-sm hover:bg-gray-800 active:scale-95 transition-all flex items-center gap-2">
                  <span>Primary CTA</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-semibold shadow-sm hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-2">
                  <span>Accent Action</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </button>

                <button className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl text-xs font-semibold shadow-subtle hover:bg-gray-50 active:scale-95 transition-all">
                  Secondary Button
                </button>

                <button className="px-5 py-2.5 text-gray-600 hover:text-gray-900 rounded-xl text-xs font-semibold hover:bg-gray-200/60 transition-colors">
                  Ghost Button
                </button>
              </div>
            )}

            {activeTab === 'inputs' && (
              <div className="w-full max-w-md space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Filter Requests
                  </label>
                  <div className="relative">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 shadow-subtle transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'badges' && (
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Approved
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 animate-pulse">
                  <Clock className="w-3.5 h-3.5" /> Pending Approval
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
                  <AlertCircle className="w-3.5 h-3.5" /> Exception Triggered
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  In Review
                </span>
              </div>
            )}

            {activeTab === 'colors' && (
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gray-900 shadow-subtle flex items-center justify-center text-white text-[10px] font-mono">#111827</div>
                <div className="w-12 h-12 rounded-xl bg-blue-600 shadow-subtle flex items-center justify-center text-white text-[10px] font-mono">#2563EB</div>
                <div className="w-12 h-12 rounded-xl bg-emerald-600 shadow-subtle flex items-center justify-center text-white text-[10px] font-mono">#059669</div>
                <div className="w-12 h-12 rounded-xl bg-amber-500 shadow-subtle flex items-center justify-center text-white text-[10px] font-mono">#D97706</div>
                <div className="w-12 h-12 rounded-xl bg-red-600 shadow-subtle flex items-center justify-center text-white text-[10px] font-mono">#DC2626</div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
