"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, Download, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DEMO_DOCUMENTS } from "@/data/demo-documents";
import { downloadAnalysisReport } from "@/lib/download-report";
import { formatDate, getTrustScoreColor } from "@/lib/utils";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary-text font-[family-name:var(--font-space-grotesk)]">
          Reports
        </h1>
        <p className="text-secondary-text text-sm mt-1">
          Download and manage your analysis reports.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {DEMO_DOCUMENTS.map((doc, i) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card-premium p-5 flex flex-col"
          >
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
              <FileText className="w-5 h-5 text-accent" />
            </div>
            <h3 className="font-medium text-primary-text text-sm mb-1 line-clamp-2">
              {doc.documentName}
            </h3>
            <p className="text-xs text-muted mb-3">{formatDate(doc.analyzedAt)}</p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-secondary-text">Trust Score</span>
              <span className={`text-lg font-bold font-[family-name:var(--font-space-grotesk)] ${getTrustScoreColor(doc.trustScore)}`}>
                {doc.trustScore}
              </span>
            </div>
            <div className="flex gap-2 mt-auto">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                type="button"
                onClick={() => {
                  try {
                    downloadAnalysisReport(doc);
                    toast.success("Report downloaded.");
                  } catch {
                    toast.error("Could not download report.");
                  }
                }}
              >
                <Download className="w-3 h-3" />
                Report
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/dashboard/analysis/${doc.id}`}>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
