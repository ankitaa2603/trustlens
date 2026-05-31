"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { AnalysisResults } from "@/components/analysis/AnalysisResults";
import { getDemoDocument } from "@/data/demo-documents";
import { getAnalysisFromSession } from "@/lib/analysis-session";
import type { DocumentAnalysis } from "@/types";
import { Loader2 } from "lucide-react";

export function AnalysisPageClient({ id }: { id: string }) {
  const [analysis, setAnalysis] = useState<DocumentAnalysis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const demo = getDemoDocument(id);
    if (demo) {
      setAnalysis(demo);
      setLoading(false);
      return;
    }

    const stored = getAnalysisFromSession(id);
    if (stored) {
      setAnalysis(stored);
      setLoading(false);
      return;
    }

    setLoading(false);
  }, [id]);

  if (!loading && !analysis) {
    notFound();
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    );
  }

  if (!analysis) return null;

  return <AnalysisResults analysis={analysis} isDemo={id.startsWith("demo-")} />;
}
