"use client";

import { motion } from "framer-motion";
import { Upload, Brain, Gauge, AlertTriangle, Lightbulb, Bot } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Document",
    description: "Drag and drop your PDF, DOCX, or TXT file. We support all standard legal document formats.",
  },
  {
    icon: Brain,
    title: "AI Clause Analysis",
    description: "Our AI engine extracts and categorizes every clause, identifying patterns and obligations.",
  },
  {
    icon: Gauge,
    title: "Trust Score Generation",
    description: "Receive a comprehensive 0-100 fairness score with detailed breakdown by category.",
  },
  {
    icon: AlertTriangle,
    title: "Risk Detection",
    description: "Hidden clauses, dangerous terms, and one-sided provisions are flagged with severity levels.",
  },
  {
    icon: Lightbulb,
    title: "Recommendations",
    description: "Get specific negotiation points and actionable suggestions to improve document fairness.",
  },
  {
    icon: Bot,
    title: "Ask Lexi",
    description: "Chat with Lexi to understand any clause, trust score factor, or platform feature in detail.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-card/30 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-3">
            Simple Process
          </p>
          <h2 className="text-4xl font-bold text-primary-text font-[family-name:var(--font-space-grotesk)] mb-4">
            How TrustLens Works
          </h2>
          <p className="text-secondary-text max-w-2xl mx-auto">
            From upload to insights in under 60 seconds. No legal expertise required.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-8 left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative text-center"
              >
                <div className="relative inline-flex mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-card border-2 border-accent/30 flex items-center justify-center relative z-10">
                    <step.icon className="w-7 h-7 text-accent" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent text-background text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-semibold text-primary-text mb-2 font-[family-name:var(--font-space-grotesk)]">
                  {step.title}
                </h3>
                <p className="text-sm text-secondary-text leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
