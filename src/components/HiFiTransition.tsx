'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sliders, Eye, Sparkles } from 'lucide-react';

export const HiFiTransition = () => {
  const [isHiFi, setIsHiFi] = useState(true);

  return (
    <section id="hifi-interface" className="py-20 bg-gray-900 text-white border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Header Label */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 mb-6 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PRODUCTION DESIGN REVEAL</span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6">
          From Wireframe to High-Fidelity Enterprise UI
        </h2>

        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-10">
          Transforming abstract structural wireframes into a crisp, production-grade interface designed for operational clarity and speed.
        </p>

        {/* Mode Switcher Toggle */}
        <div className="inline-flex items-center gap-3 bg-gray-800/80 p-2 rounded-full border border-gray-700">
          <button
            onClick={() => setIsHiFi(false)}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
              !isHiFi
                ? 'bg-white text-gray-900 shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Grayscale Wireframe Mode
          </button>
          
          <button
            onClick={() => setIsHiFi(true)}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
              isHiFi
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            High-Fidelity Interface Mode
          </button>
        </div>

      </div>
    </section>
  );
};
