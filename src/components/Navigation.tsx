'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Menu, X } from 'lucide-react';

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress(totalHeight > 0 ? (currentScroll / totalHeight) * 100 : 0);
      setScrolled(currentScroll > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Overview', href: '#overview' },
    { name: 'Process', href: '#process' },
    { name: 'UX', href: '#ux-thinking' },
    { name: 'UI', href: '#hifi-interface' },
    { name: 'Outcome', href: '#outcome' },
  ];

  return (
    <>
      {/* Top Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-gray-100 z-[100]">
        <motion.div
          className="h-full bg-blue-600"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Floating Header */}
      <header
        className="fixed top-4 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-8"
      >
        <div
          className={`max-w-6xl mx-auto flex items-center justify-between transition-all duration-300 rounded-full px-5 py-3 ${
            scrolled
              ? 'glass-nav border border-gray-200/80 shadow-card py-2.5'
              : 'bg-white/60 backdrop-blur-md border border-gray-200/40'
          }`}
        >
          {/* Logo & Portfolio Owner Credit */}
          <a
            href="#"
            className="flex items-center gap-2.5 group font-bold tracking-tight text-gray-900 text-sm sm:text-base"
          >
            <div className="w-7 h-7 rounded-lg bg-gray-900 text-white flex items-center justify-center font-bold text-xs group-hover:bg-blue-600 transition-colors">
              S
            </div>
            <div className="flex flex-col">
              <span className="tracking-wider text-xs font-extrabold uppercase text-gray-900">
                SAIMEEN SHAIKH
              </span>
              <span className="text-[10px] text-gray-500 font-medium tracking-normal -mt-0.5">
                FLOWOPS UI/UX CASE STUDY
              </span>
            </div>
          </a>

          {/* Nav Links Desktop */}
          <nav className="hidden md:flex items-center gap-1 bg-gray-100/70 p-1 rounded-full border border-gray-200/50">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-white rounded-full transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200/70 rounded-full transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 text-gray-700"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden mt-2 max-w-6xl mx-auto glass-nav border border-gray-200 rounded-2xl p-4 shadow-card flex flex-col gap-2"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100/70 rounded-lg transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <hr className="my-1 border-gray-200" />
              <a
                href="#"
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Top</span>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
