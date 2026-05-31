"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DEMO_DOCUMENTS } from "@/data/demo-documents";
import { formatDate, getTrustScoreColor } from "@/lib/utils";
import { useState } from "react";

export default function HistoryPage() {
  const [search, setSearch] = useState("");

  const filtered = DEMO_DOCUMENTS.filter(
    (doc) =>
      doc.documentName.toLowerCase().includes(search.toLowerCase()) ||
      doc.documentType.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary-text font-[family-name:var(--font-space-grotesk)]">
            Analysis History
          </h1>
          <p className="text-secondary-text text-sm mt-1">
            View and revisit all your previous document analyses.
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <Input
            placeholder="Search analyses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((doc, i) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              href={`/dashboard/analysis/${doc.id}`}
              className="card-premium p-4 flex items-center justify-between hover:border-accent/30 transition-colors group block"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-primary-text group-hover:text-accent transition-colors">
                    {doc.documentName}
                  </p>
                  <p className="text-xs text-muted mt-0.5">
                    {doc.documentType} · {formatDate(doc.analyzedAt)} · {doc.dangerousClauses.length} risks found
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className={`text-xl font-bold font-[family-name:var(--font-space-grotesk)] ${getTrustScoreColor(doc.trustScore)}`}>
                    {doc.trustScore}
                  </p>
                  <p className="text-xs text-muted">Trust Score</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted group-hover:text-accent transition-colors" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
