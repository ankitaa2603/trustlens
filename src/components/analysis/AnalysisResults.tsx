"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Download, ChevronRight, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { DocumentAnalysis } from "@/types";
import { TrustScoreRing } from "@/components/analysis/TrustScoreRing";
import { TrustTimeline } from "@/components/analysis/TrustTimeline";
import { Button } from "@/components/ui/button";
import { downloadAnalysisReport } from "@/lib/download-report";
import { formatDate, cn } from "@/lib/utils";

interface AnalysisResultsProps {
  analysis: DocumentAnalysis;
  isDemo?: boolean;
}

const riskColors = {
  low: "bg-success/10 text-success border-success/30",
  medium: "bg-warning/10 text-warning border-warning/30",
  high: "bg-danger/10 text-danger border-danger/30",
  critical: "bg-danger/20 text-danger border-danger/50",
};

export function AnalysisResults({ analysis, isDemo = false }: AnalysisResultsProps) {
  const handleDownload = () => {
    try {
      downloadAnalysisReport(analysis);
      toast.success("Report downloaded. Open the file and use Print → Save as PDF if needed.");
    } catch (error) {
      console.error("[Report] Download failed:", error);
      toast.error("Could not download report. Please try again.");
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          {isDemo && (
            <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/30 mb-2">
              Demo Analysis
            </span>
          )}
          <h1 className="text-2xl font-bold text-primary-text font-[family-name:var(--font-space-grotesk)]">
            {analysis.documentName}
          </h1>
          <p className="text-sm text-muted mt-1">
            {analysis.documentType} · Analyzed {formatDate(analysis.analyzedAt)}
            {analysis.pageCount && ` · ${analysis.pageCount} pages`}
          </p>
        </div>
        <Button variant="outline" size="sm" type="button" onClick={handleDownload}>
          <Download className="w-4 h-4" />
          Download Report
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-premium p-6 flex flex-col items-center"
        >
          <p className="text-xs text-muted uppercase tracking-wider mb-4 self-start">Trust Score</p>
          <TrustScoreRing score={analysis.trustScore} />
          <p className="text-sm text-secondary-text text-center mt-4 leading-relaxed">
            {analysis.riskSummary.substring(0, 120)}...
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 card-premium p-6"
        >
          <h2 className="font-semibold text-primary-text mb-3 font-[family-name:var(--font-space-grotesk)] flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-warning" />
            Risk Summary
          </h2>
          <p className="text-sm text-secondary-text leading-relaxed">{analysis.riskSummary}</p>

          <div className="mt-4 pt-4 border-t border-border">
            <h3 className="text-sm font-medium text-primary-text mb-3 flex items-center gap-2">
              <EyeOff className="w-4 h-4 text-danger" />
              Hidden Clauses Detected ({analysis.hiddenClauses.length})
            </h3>
            <ul className="space-y-2">
              {analysis.hiddenClauses.map((clause, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-secondary-text">
                  <span className="text-danger mt-0.5 flex-shrink-0">⚠</span>
                  {clause}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card-premium p-6"
      >
        <h2 className="font-semibold text-primary-text mb-6 font-[family-name:var(--font-space-grotesk)]">
          Trust Timeline
        </h2>
        <TrustTimeline events={analysis.timeline} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card-premium p-6"
      >
        <h2 className="font-semibold text-primary-text mb-4 font-[family-name:var(--font-space-grotesk)] flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-danger" />
          Dangerous Clauses
        </h2>
        <div className="space-y-4">
          {analysis.dangerousClauses.map((clause) => (
            <div key={clause.id} className="border border-border rounded-xl p-4 hover:border-danger/30 transition-colors">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-medium text-primary-text text-sm">{clause.title}</h3>
                <span className={cn("text-xs px-2 py-0.5 rounded-full capitalize border flex-shrink-0", riskColors[clause.riskLevel])}>
                  {clause.riskLevel}
                </span>
              </div>
              <p className="text-xs text-muted italic mb-2 border-l-2 border-border pl-3">
                &ldquo;{clause.originalText.substring(0, 120)}...&rdquo;
              </p>
              <p className="text-sm text-secondary-text">{clause.plainEnglish}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card-premium p-6"
      >
        <h2 className="font-semibold text-primary-text mb-4 font-[family-name:var(--font-space-grotesk)] flex items-center gap-2">
          <Eye className="w-4 h-4 text-accent" />
          Clause Explanations
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {analysis.clauseExplanations.map((clause) => (
            <div key={clause.id} className="border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-accent">{clause.category}</span>
                <span className={cn("text-xs px-2 py-0.5 rounded-full capitalize border", riskColors[clause.riskLevel])}>
                  {clause.riskLevel}
                </span>
              </div>
              <h3 className="font-medium text-primary-text text-sm mb-2">{clause.title}</h3>
              <p className="text-sm text-secondary-text">{clause.plainEnglish}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card-premium p-6"
      >
        <h2 className="font-semibold text-primary-text mb-4 font-[family-name:var(--font-space-grotesk)]">
          Negotiation Suggestions
        </h2>
        <div className="space-y-3">
          {analysis.negotiationSuggestions.map((suggestion) => (
            <div key={suggestion.id} className="flex gap-4 p-4 border border-border rounded-xl hover:border-accent/20 transition-colors">
              <div className={cn(
                "w-1 rounded-full flex-shrink-0",
                suggestion.priority === "high" ? "bg-danger" : suggestion.priority === "medium" ? "bg-warning" : "bg-success"
              )} />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-primary-text text-sm">{suggestion.clause}</h3>
                  <span className="text-xs text-muted capitalize">{suggestion.priority} priority</span>
                </div>
                <p className="text-sm text-secondary-text mb-1">{suggestion.suggestion}</p>
                <p className="text-xs text-accent">Impact: {suggestion.impact}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {analysis.clauseRelationships.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card-premium p-6"
        >
          <h2 className="font-semibold text-primary-text mb-4 font-[family-name:var(--font-space-grotesk)]">
            Clause Relationships
          </h2>
          <div className="flex flex-wrap gap-3">
            {analysis.clauseRelationships.map((rel, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span className="px-3 py-1.5 rounded-lg bg-accent/10 text-accent border border-accent/20">
                  {rel.from}
                </span>
                <ChevronRight className="w-4 h-4 text-muted" />
                <span className="text-secondary-text">{rel.relationship}</span>
                <ChevronRight className="w-4 h-4 text-muted" />
                <span className="px-3 py-1.5 rounded-lg bg-card text-primary-text border border-border">
                  {rel.to}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
