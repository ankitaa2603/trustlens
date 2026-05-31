import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <div className="prose prose-invert max-w-none space-y-4 text-secondary-text text-sm leading-relaxed">
          <p>Last updated: May 31, 2026</p>
          <p>TrustLens AI (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our platform.</p>
          <h2 className="text-lg font-semibold text-primary-text mt-6">Information We Collect</h2>
          <p>We collect information you provide directly, including account details, uploaded documents, and usage data. Documents are encrypted in transit and at rest.</p>
          <h2 className="text-lg font-semibold text-primary-text mt-6">How We Use Your Information</h2>
          <p>Your documents are processed solely for analysis purposes. We do not sell your personal data or document content to third parties.</p>
          <h2 className="text-lg font-semibold text-primary-text mt-6">Data Retention</h2>
          <p>You may delete your analyses and account at any time. Upon deletion, your data is permanently removed within 30 days.</p>
          <h2 className="text-lg font-semibold text-primary-text mt-6">Contact</h2>
          <p>For privacy inquiries, contact us at privacy@trustlens.ai</p>
        </div>
      </main>
    </div>
  );
}
