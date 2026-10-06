import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Saimeen Shaikh — FlowOps UI/UX Case Study | B2B SaaS Workflow Management Platform",
  description: "A comprehensive UI/UX Case Study by Saimeen Shaikh detailing the design system, product strategy, information architecture, and high-fidelity enterprise interface for FlowOps.",
  keywords: ["Saimeen Shaikh", "UI/UX Designer", "Product Design", "Enterprise SaaS", "FlowOps", "Design Systems", "User Experience"],
  authors: [{ name: "Saimeen Shaikh" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#FAFAFA] text-[#111827] antialiased selection:bg-blue-100 selection:text-blue-900">
        {children}
      </body>
    </html>
  );
}
