"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Upload, FileText, TrendingUp, AlertTriangle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrustScoreRing } from "@/components/analysis/TrustScoreRing";
import { TourFeaturePreviews } from "@/components/dashboard/TourFeaturePreviews";
import { DEMO_DOCUMENTS } from "@/data/demo-documents";
import { formatDate, getTrustScoreColor } from "@/lib/utils";

const stats = [
  { label: "Documents Analyzed", value: "12", icon: FileText, change: "+3 this month" },
  { label: "Reports Generated", value: "8", icon: TrendingUp, change: "+2 this week" },
  { label: "Risks Detected", value: "24", icon: AlertTriangle, change: "Across all docs" },
  { label: "Avg Trust Score", value: "58", icon: TrendingUp, change: "Needs attention" },
];

export default function DashboardPage() {
  const recentDocs = DEMO_DOCUMENTS.slice(0, 3);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary-text font-[family-name:var(--font-space-grotesk)]">
            Dashboard
          </h1>
          <p className="text-secondary-text text-sm mt-1">
            Welcome back. Here&apos;s your document analysis overview.
          </p>
        </div>
        <Button asChild id="tour-upload-btn">
          <Link href="/dashboard/upload">
            <Upload className="w-4 h-4" />
            Upload Document
          </Link>
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card-premium p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                <stat.icon className="w-4 h-4 text-accent" />
              </div>
            </div>
            <p className="text-2xl font-bold text-primary-text font-[family-name:var(--font-space-grotesk)]">
              {stat.value}
            </p>
            <p className="text-sm text-secondary-text mt-0.5">{stat.label}</p>
            <p className="text-xs text-muted mt-1">{stat.change}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div
          id="tour-trust-score"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-premium p-6 flex flex-col items-center"
        >
          <h2 className="font-semibold text-primary-text mb-4 self-start font-[family-name:var(--font-space-grotesk)]">
            Latest Trust Score
          </h2>
          <TrustScoreRing score={62} size="md" />
          <p className="text-sm text-secondary-text text-center mt-4">
            Internship Offer Letter — Review recommended before signing
          </p>
          <Button variant="outline" size="sm" className="mt-4" asChild>
            <Link href="/dashboard/analysis/demo-internship">
              View Analysis <ArrowRight className="w-3 h-3" />
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 card-premium p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-primary-text font-[family-name:var(--font-space-grotesk)]">
              Recent Analyses
            </h2>
            <Link href="/dashboard/history" className="text-xs text-accent hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {recentDocs.map((doc) => (
              <Link
                key={doc.id}
                href={`/dashboard/analysis/${doc.id}`}
                className="flex items-center justify-between p-3 rounded-xl border border-border hover:border-accent/30 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center">
                    <FileText className="w-4 h-4 text-muted" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primary-text group-hover:text-accent transition-colors">
                      {doc.documentName}
                    </p>
                    <p className="text-xs text-muted">{formatDate(doc.analyzedAt)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-lg font-bold font-[family-name:var(--font-space-grotesk)] ${getTrustScoreColor(doc.trustScore)}`}>
                    {doc.trustScore}
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted group-hover:text-accent transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      <TourFeaturePreviews />
    </div>
  );
}
