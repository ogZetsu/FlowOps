'use client';

import React from 'react';
import { ArrowLeft } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-24 pb-16 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Full Width Showcase Card */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-950 border border-gray-800 rounded-3xl p-8 sm:p-16 text-center relative overflow-hidden mb-16 shadow-2xl">
          <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white mx-auto flex items-center justify-center font-bold text-lg mb-6 shadow-card">
              S
            </div>

            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block mb-2">
              PORTFOLIO OF SAIMEEN SHAIKH
            </span>

            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-4">
              FLOWOPS
            </h2>

            <p className="text-lg sm:text-xl font-medium text-gray-300 tracking-tight">
              “Designed to make complex operations feel simple.”
            </p>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-gray-800 text-xs font-semibold text-gray-400">
          {/* Left */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Top</span>
          </a>

          {/* Center */}
          <div className="text-gray-400 font-mono text-[11px] text-center">
            SAIMEEN SHAIKH · FLOWOPS UI/UX CASE STUDY · 2026
          </div>

          {/* Right */}
          <div className="text-gray-500 text-[11px]">
            UI/UX & Product Design
          </div>
        </div>

      </div>
    </footer>
  );
};
