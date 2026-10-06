import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAFAFA",
        surface: "#FFFFFF",
        "surface-subtle": "#F3F4F6",
        "border-subtle": "#E5E7EB",
        primary: {
          DEFAULT: "#111827",
          hover: "#1F2937",
          subtle: "#374151",
        },
        accent: {
          DEFAULT: "#2563EB",
          light: "#3B82F6",
          subtle: "#EFF6FF",
          border: "#BFDBFE",
        },
        muted: {
          DEFAULT: "#4B5563",
          light: "#6B7280",
          subtle: "#9CA3AF",
        },
        success: {
          DEFAULT: "#059669",
          subtle: "#ECFDF5",
          border: "#A7F3D0",
        },
        warning: {
          DEFAULT: "#D97706",
          subtle: "#FFFBEB",
          border: "#FDE68A",
        },
        danger: {
          DEFAULT: "#DC2626",
          subtle: "#FEF2F2",
          border: "#FCA5A5",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.03), 0 2px 4px -1px rgba(0, 0, 0, 0.02)',
        'floating': '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
        'modal': '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
};
export default config;
