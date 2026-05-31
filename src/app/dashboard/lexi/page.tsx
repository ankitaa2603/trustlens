"use client";

import { LexiAvatar } from "@/components/lexi/LexiAvatar";

const capabilities = [
  "Product guide & platform navigation",
  "Onboarding assistant",
  "FAQ assistant",
  "Document upload guide",
  "Trust score explainer",
  "Clause explainer & interpreter",
  "Report interpreter",
  "General support assistant",
];

const suggestedQuestions = [
  "How do I start?",
  "What documents can I upload?",
  "Explain Trust Score",
  "Show me platform features",
  "Help me analyze a contract",
  "How does TrustLens work?",
];

export default function LexiPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <LexiAvatar size="lg" />
        </div>
        <h1 className="text-2xl font-bold text-primary-text font-[family-name:var(--font-space-grotesk)]">
          Lexi Assistant
        </h1>
        <p className="text-secondary-text text-sm mt-2">
          Your AI-powered legal document guide. Ask anything about TrustLens or your analyses.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="card-premium p-5">
          <h2 className="font-semibold text-primary-text mb-3 font-[family-name:var(--font-space-grotesk)]">
            Capabilities
          </h2>
          <ul className="space-y-2">
            {capabilities.map((cap) => (
              <li key={cap} className="flex items-center gap-2 text-sm text-secondary-text">
                <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                {cap}
              </li>
            ))}
          </ul>
        </div>

        <div className="card-premium p-5">
          <h2 className="font-semibold text-primary-text mb-3 font-[family-name:var(--font-space-grotesk)]">
            Try asking
          </h2>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q) => (
              <span
                key={q}
                className="text-xs px-3 py-1.5 rounded-full border border-border text-secondary-text"
              >
                {q}
              </span>
            ))}
          </div>
          <p className="text-xs text-muted mt-4">
            Click the Lexi button in the bottom-right corner to start chatting.
          </p>
        </div>
      </div>

    </div>
  );
}
