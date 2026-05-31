import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-accent" />
            <span className="font-bold font-[family-name:var(--font-space-grotesk)]">
              TRUSTLENS <span className="text-accent">AI</span>
            </span>
          </Link>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-secondary-text hover:text-accent mb-8">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <h1 className="text-3xl font-bold text-primary-text mb-6 font-[family-name:var(--font-space-grotesk)]">
          Terms of Service
        </h1>
        <div className="space-y-4 text-secondary-text text-sm leading-relaxed">
          <p>Last updated: May 31, 2026</p>
          <p>By using TrustLens AI, you agree to these Terms of Service. Please read them carefully.</p>
          <h2 className="text-lg font-semibold text-primary-text mt-6">Service Description</h2>
          <p>TrustLens AI provides AI-powered document analysis for informational purposes. Our service does not constitute legal advice.</p>
          <h2 className="text-lg font-semibold text-primary-text mt-6">User Responsibilities</h2>
          <p>You are responsible for the accuracy of documents you upload and for seeking professional legal counsel for important decisions.</p>
          <h2 className="text-lg font-semibold text-primary-text mt-6">Limitation of Liability</h2>
          <p>TrustLens AI is provided &quot;as is&quot; without warranties. We are not liable for decisions made based on our analysis.</p>
          <h2 className="text-lg font-semibold text-primary-text mt-6">Contact</h2>
          <p>For questions about these terms, contact legal@trustlens.ai</p>
        </div>
      </main>
    </div>
  );
}
