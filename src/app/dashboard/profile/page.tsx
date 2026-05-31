"use client";

import { motion } from "framer-motion";
import { User, Mail, FileText, TrendingUp, Clock, Shield } from "lucide-react";
import { DEMO_DOCUMENTS } from "@/data/demo-documents";
import { formatDate } from "@/lib/utils";

const recentActivity = [
  { action: "Analyzed Internship Offer Letter", time: "2 days ago", score: 62 },
  { action: "Downloaded Rental Agreement Report", time: "5 days ago", score: 48 },
  { action: "Analyzed Privacy Policy", time: "1 week ago", score: 35 },
  { action: "Updated notification preferences", time: "2 weeks ago", score: null },
];

export default function ProfilePage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-primary-text font-[family-name:var(--font-space-grotesk)]">
        Profile
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-premium p-6"
      >
        <div className="flex items-center gap-5 mb-6">
          <div className="w-20 h-20 rounded-2xl bg-accent/10 border-2 border-accent/30 flex items-center justify-center">
            <User className="w-10 h-10 text-accent" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-primary-text font-[family-name:var(--font-space-grotesk)]">
              Demo User
            </h2>
            <p className="text-secondary-text text-sm flex items-center gap-1.5 mt-1">
              <Mail className="w-3.5 h-3.5" />
              demo@trustlens.ai
            </p>
            <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-success/10 text-success border border-success/30">
              Pro Plan
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
          {[
            { label: "Documents Analyzed", value: DEMO_DOCUMENTS.length, icon: FileText },
            { label: "Reports Generated", value: 3, icon: TrendingUp },
            { label: "Member Since", value: "May 2026", icon: Shield },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="w-4 h-4 text-accent mx-auto mb-2" />
              <p className="text-lg font-bold text-primary-text font-[family-name:var(--font-space-grotesk)]">
                {stat.value}
              </p>
              <p className="text-xs text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card-premium p-6"
      >
        <h3 className="font-semibold text-primary-text mb-4 font-[family-name:var(--font-space-grotesk)] flex items-center gap-2">
          <Clock className="w-4 h-4 text-accent" />
          Recent Activity
        </h3>
        <div className="space-y-3">
          {recentActivity.map((activity, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div>
                <p className="text-sm text-primary-text">{activity.action}</p>
                <p className="text-xs text-muted">{activity.time}</p>
              </div>
              {activity.score && (
                <span className="text-sm font-bold text-warning">{activity.score}</span>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card-premium p-6"
      >
        <h3 className="font-semibold text-primary-text mb-4 font-[family-name:var(--font-space-grotesk)]">
          Account Overview
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { label: "Plan", value: "Pro (Free Trial)" },
            { label: "Analyses Remaining", value: "Unlimited" },
            { label: "Storage Used", value: "2.4 MB / 100 MB" },
            { label: "Last Login", value: formatDate(new Date().toISOString()) },
          ].map((item) => (
            <div key={item.label} className="flex justify-between py-2 border-b border-border">
              <span className="text-sm text-muted">{item.label}</span>
              <span className="text-sm text-primary-text">{item.value}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
