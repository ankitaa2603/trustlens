"use client";

import { motion } from "framer-motion";
import { Target, Users, Globe, Award } from "lucide-react";

const stats = [
  { value: "50K+", label: "Documents Analyzed" },
  { value: "98%", label: "User Satisfaction" },
  { value: "40+", label: "Document Types" },
  { value: "<60s", label: "Average Analysis Time" },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-card/30 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-3">Our Mission</p>
            <h2 className="text-4xl font-bold text-primary-text font-[family-name:var(--font-space-grotesk)] mb-6">
              Making Legal Documents Understandable for Everyone
            </h2>
            <p className="text-secondary-text leading-relaxed mb-4">
              Every day, millions of people sign legal documents they don&apos;t fully understand. Hidden clauses,
              complex jargon, and one-sided terms put individuals at a significant disadvantage — especially
              students, renters, and first-time employees.
            </p>
            <p className="text-secondary-text leading-relaxed mb-8">
              TrustLens AI was built to level the playing field. We combine advanced AI with legal intelligence
              to give everyone the power to understand exactly what they&apos;re agreeing to — before they sign.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Target, text: "Transparency First" },
                { icon: Users, text: "Built for Everyone" },
                { icon: Globe, text: "Global Standards" },
                { icon: Award, text: "Enterprise Quality" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-sm text-secondary-text">
                  <item.icon className="w-4 h-4 text-accent flex-shrink-0" />
                  {item.text}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-premium p-6 text-center"
              >
                <p className="text-3xl font-bold text-accent font-[family-name:var(--font-space-grotesk)] mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-secondary-text">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
