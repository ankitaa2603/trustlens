"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, Shield, Lock, Eye, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrustScoreRing } from "@/components/analysis/TrustScoreRing";

const badges = [
  { icon: Lock, label: "Privacy First" },
  { icon: Shield, label: "Secure Analysis" },
  { icon: Eye, label: "Explainable Insights" },
  { icon: Zap, label: "Instant Reports" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-accent/3 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/5 text-accent text-xs font-medium mb-6"
          >
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
            Legal Intelligence Platform
          </motion.div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-primary-text leading-tight font-[family-name:var(--font-space-grotesk)] mb-6">
            Know What
            <br />
            <span className="gold-gradient-text">You&apos;re Signing</span>
          </h1>

          <p className="text-lg text-secondary-text leading-relaxed mb-8 max-w-lg">
            Upload any contract, agreement, or policy. TrustLens AI reveals hidden risks,
            explains legal language in plain English, and gives you the confidence to
            make informed decisions before you sign.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <Button size="lg" asChild>
              <Link href="/signup">
                Analyze Document
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/demo">
                <Play className="w-4 h-4" />
                Try Demo Mode
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap gap-4">
            {badges.map((badge, i) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-2 text-sm text-secondary-text"
              >
                <badge.icon className="w-4 h-4 text-accent" />
                {badge.label}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative flex justify-center"
        >
          <div className="relative">
            <div className="card-premium p-8 w-full max-w-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs text-muted uppercase tracking-wider">Trust Score</p>
                  <p className="text-sm font-medium text-primary-text mt-0.5">Internship Offer Letter</p>
                </div>
                <div className="px-2 py-1 rounded-full bg-warning/10 border border-warning/30 text-warning text-xs">
                  Review Needed
                </div>
              </div>
              <div className="flex justify-center mb-6">
                <TrustScoreRing score={62} size="md" />
              </div>
              <div className="space-y-2">
                {[
                  { label: "IP Assignment", risk: "critical" },
                  { label: "Non-Compete Clause", risk: "high" },
                  { label: "Compensation", risk: "low" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.15 }}
                    className="flex items-center justify-between py-2 border-b border-border last:border-0"
                  >
                    <span className="text-sm text-secondary-text">{item.label}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full capitalize ${
                        item.risk === "critical"
                          ? "bg-danger/10 text-danger border border-danger/30"
                          : item.risk === "high"
                          ? "bg-warning/10 text-warning border border-warning/30"
                          : "bg-success/10 text-success border border-success/30"
                      }`}
                    >
                      {item.risk}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 card-premium px-3 py-2 text-xs text-accent border-accent/30"
            >
              ⚠ 3 Hidden Clauses Found
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
              className="absolute -bottom-4 -left-4 card-premium px-3 py-2 text-xs text-success border-success/30"
            >
              ✓ Analysis Complete
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
