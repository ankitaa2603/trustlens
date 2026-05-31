"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Search,
  Languages,
  GitBranch,
  MessageSquare,
  Bot,
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Trust Score Engine",
    description:
      "Get an instant 0-100 fairness score based on clause analysis, hidden risks, and industry benchmarks.",
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/20",
  },
  {
    icon: Search,
    title: "Hidden Clause Detection",
    description:
      "AI scans for buried obligations, auto-renewals, and one-sided terms that most people miss.",
    color: "text-danger",
    bg: "bg-danger/10",
    border: "border-danger/20",
  },
  {
    icon: Languages,
    title: "Plain English Translation",
    description:
      "Every complex legal clause translated into clear, understandable language you can act on.",
    color: "text-success",
    bg: "bg-success/10",
    border: "border-success/20",
  },
  {
    icon: GitBranch,
    title: "Clause Relationship Mapping",
    description:
      "Visualize how clauses connect and reinforce each other — understand the full legal picture.",
    color: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning/20",
  },
  {
    icon: MessageSquare,
    title: "Negotiation Suggestions",
    description:
      "Get specific, actionable negotiation points with priority levels and expected impact.",
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/20",
  },
  {
    icon: Bot,
    title: "Lexi Smart Assistant",
    description:
      "Your AI legal guide — ask questions, get explanations, and navigate the platform with ease.",
    color: "text-success",
    bg: "bg-success/10",
    border: "border-success/20",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-3">
            Platform Features
          </p>
          <h2 className="text-4xl font-bold text-primary-text font-[family-name:var(--font-space-grotesk)] mb-4">
            Enterprise-Grade Legal Intelligence
          </h2>
          <p className="text-secondary-text max-w-2xl mx-auto">
            Every feature designed to give you complete clarity before you commit to any legal document.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="card-premium p-6 group cursor-default"
            >
              <div
                className={`w-12 h-12 rounded-xl ${feature.bg} border ${feature.border} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <feature.icon className={`w-5 h-5 ${feature.color}`} />
              </div>
              <h3 className="font-semibold text-primary-text mb-2 font-[family-name:var(--font-space-grotesk)]">
                {feature.title}
              </h3>
              <p className="text-sm text-secondary-text leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
