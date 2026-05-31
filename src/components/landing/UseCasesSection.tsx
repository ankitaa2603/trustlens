"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Building2, Laptop, Home, ShieldCheck, ShoppingBag } from "lucide-react";

const useCases = [
  {
    icon: GraduationCap,
    title: "Students",
    description: "Review scholarship agreements, university policies, and enrollment contracts before committing.",
    tag: "Education",
  },
  {
    icon: Briefcase,
    title: "Interns",
    description: "Understand internship offers, IP assignments, and non-compete clauses before accepting.",
    tag: "Career",
  },
  {
    icon: Building2,
    title: "Employees",
    description: "Analyze employment contracts, NDAs, and severance agreements with full clarity.",
    tag: "Employment",
  },
  {
    icon: Laptop,
    title: "Freelancers",
    description: "Review client contracts, SOWs, and payment terms to protect your business interests.",
    tag: "Business",
  },
  {
    icon: Home,
    title: "Renters",
    description: "Decode lease agreements, identify unfair clauses, and understand your tenant rights.",
    tag: "Housing",
  },
  {
    icon: ShieldCheck,
    title: "Insurance Customers",
    description: "Understand policy exclusions, coverage limits, and claim procedures before signing.",
    tag: "Insurance",
  },
  {
    icon: ShoppingBag,
    title: "Consumers",
    description: "Review terms of service, privacy policies, and subscription agreements before agreeing.",
    tag: "Consumer",
  },
];

export function UseCasesSection() {
  return (
    <section id="use-cases" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-3">Use Cases</p>
          <h2 className="text-4xl font-bold text-primary-text font-[family-name:var(--font-space-grotesk)] mb-4">
            Built for Everyone
          </h2>
          <p className="text-secondary-text max-w-2xl mx-auto">
            Whether you&apos;re signing your first internship or reviewing a complex insurance policy, TrustLens has you covered.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {useCases.map((useCase, i) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -3 }}
              className="card-premium p-5 group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:border-accent/40 transition-colors">
                  <useCase.icon className="w-5 h-5 text-accent" />
                </div>
                <span className="text-xs text-muted px-2 py-0.5 rounded-full border border-border">
                  {useCase.tag}
                </span>
              </div>
              <h3 className="font-semibold text-primary-text mb-1.5 font-[family-name:var(--font-space-grotesk)]">
                {useCase.title}
              </h3>
              <p className="text-sm text-secondary-text leading-relaxed">{useCase.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
