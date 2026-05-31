import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";
import { getDemoDocument } from "@/data/demo-documents";
import { AnalysisResults } from "@/components/analysis/AnalysisResults";
import { LexiAssistant } from "@/components/lexi/LexiAssistant";
import { notFound } from "next/navigation";

interface DemoAnalysisPageProps {
  params: Promise<{ id: string }>;
}

export default async function DemoAnalysisPage({ params }: DemoAnalysisPageProps) {
  const { id } = await params;
  const analysis = getDemoDocument(id);

  if (!analysis) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link href="/demo" className="flex items-center gap-2 text-sm text-secondary-text hover:text-accent">
            <ArrowLeft className="w-4 h-4" />
            Back to Demo
          </Link>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-accent" />
            <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent border border-accent/30">
              Demo Mode
            </span>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnalysisResults analysis={analysis} isDemo />
      </main>
      <LexiAssistant context="analysis" />
    </div>
  );
}
