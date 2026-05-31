"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, ArrowLeft, FileText, ArrowRight } from "lucide-react";
import { DEMO_DOCUMENTS } from "@/data/demo-documents";
import { getTrustScoreColor, getTrustScoreLabel } from "@/lib/utils";
import { LexiAssistant } from "@/components/lexi/LexiAssistant";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center">
              <Shield className="w-3.5 h-3.5 text-accent" />
            </div>
            <span className="font-bold text-sm font-[family-name:var(--font-space-grotesk)]">
              TRUSTLENS <span className="text-accent">AI</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent border border-accent/30">
              Demo Mode
            </span>
            <Link
              href="/signup"
              className="text-sm text-accent hover:underline"
            >
              Create Account
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-secondary-text hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-primary-text font-[family-name:var(--font-space-grotesk)] mb-4">
            Explore Demo Analyses
          </h1>
          <p className="text-secondary-text max-w-2xl mx-auto">
            No account required. Browse three fully analyzed sample documents with trust scores,
            risk summaries, Trust Timelines, and negotiation suggestions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {DEMO_DOCUMENTS.map((doc, i) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -4 }}
              className="card-premium p-6 flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-accent" />
              </div>

              <span className="text-xs text-accent mb-2">{doc.documentType}</span>
              <h2 className="font-semibold text-primary-text mb-3 font-[family-name:var(--font-space-grotesk)] leading-snug">
                {doc.documentName}
              </h2>

              <div className="flex items-center gap-3 mb-4">
                <div className="text-center">
                  <p className={`text-3xl font-bold font-[family-name:var(--font-space-grotesk)] ${getTrustScoreColor(doc.trustScore)}`}>
                    {doc.trustScore}
                  </p>
                  <p className="text-xs text-muted">Trust Score</p>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-xs text-secondary-text">
                    {getTrustScoreLabel(doc.trustScore)}
                  </p>
                  <p className="text-xs text-muted">
                    {doc.dangerousClauses.length} dangerous clauses
                  </p>
                  <p className="text-xs text-muted">
                    {doc.hiddenClauses.length} hidden clauses
                  </p>
                </div>
              </div>

              <p className="text-sm text-secondary-text leading-relaxed mb-6 flex-1">
                {doc.riskSummary.substring(0, 120)}...
              </p>

              <Link
                href={`/demo/analysis/${doc.id}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-accent/10 border border-accent/30 text-accent text-sm font-medium hover:bg-accent/20 transition-colors"
              >
                View Full Analysis
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </main>

      <LexiAssistant context="demo" />
    </div>
  );
}
