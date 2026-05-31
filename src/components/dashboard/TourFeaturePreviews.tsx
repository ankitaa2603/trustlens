"use client";

import { Upload, AlertTriangle, Languages, GitBranch } from "lucide-react";
import { TrustTimeline } from "@/components/analysis/TrustTimeline";
import { DEMO_DOCUMENTS } from "@/data/demo-documents";

const demoTimeline = DEMO_DOCUMENTS[2].timeline.slice(0, 4);

export function TourFeaturePreviews() {
  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Step 1: Upload Zone */}
        <div
          id="tour-upload-zone"
          className="card-premium p-6 border-dashed border-2 border-border hover:border-accent/30 transition-colors"
        >
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
              <Upload className="w-6 h-6 text-accent" />
            </div>
            <p className="font-medium text-primary-text mb-1">Upload Zone</p>
            <p className="text-xs text-muted">PDF · DOCX · TXT · Max 10MB</p>
          </div>
        </div>

        {/* Step 3: Risk Analysis */}
        <div id="tour-risk-analysis" className="card-premium p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-warning" />
            <h3 className="font-semibold text-primary-text text-sm font-[family-name:var(--font-space-grotesk)]">
              Risk Analysis
            </h3>
          </div>
          <div className="space-y-2">
            {[
              { label: "Auto-Renewal Clause", level: "high" },
              { label: "Data Selling to Third Parties", level: "critical" },
              { label: "Broad IP Assignment", level: "critical" },
            ].map((risk) => (
              <div
                key={risk.label}
                className="flex items-center justify-between py-2 px-3 rounded-lg bg-background border border-border text-sm"
              >
                <span className="text-secondary-text">{risk.label}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full capitalize ${
                    risk.level === "critical"
                      ? "bg-danger/10 text-danger border border-danger/30"
                      : "bg-warning/10 text-warning border border-warning/30"
                  }`}
                >
                  {risk.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Step 4: Clause Explanation */}
        <div id="tour-clause-explanation" className="card-premium p-6">
          <div className="flex items-center gap-2 mb-4">
            <Languages className="w-4 h-4 text-accent" />
            <h3 className="font-semibold text-primary-text text-sm font-[family-name:var(--font-space-grotesk)]">
              Clause Explanation
            </h3>
          </div>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-background border border-border">
              <p className="text-xs text-muted mb-1">Original Clause</p>
              <p className="text-xs text-secondary-text italic">
                &ldquo;Personal data may be shared, sold, or licensed to third-party partners...&rdquo;
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-accent text-xs">↓</div>
            </div>
            <div className="p-3 rounded-lg bg-accent/5 border border-accent/20">
              <p className="text-xs text-accent mb-1">Plain English</p>
              <p className="text-xs text-primary-text">
                The company can sell your personal information to other companies for profit.
              </p>
            </div>
          </div>
        </div>

        {/* Step 5: Trust Timeline */}
        <div id="tour-trust-timeline" className="card-premium p-6">
          <div className="flex items-center gap-2 mb-4">
            <GitBranch className="w-4 h-4 text-accent" />
            <h3 className="font-semibold text-primary-text text-sm font-[family-name:var(--font-space-grotesk)]">
              Trust Timeline
            </h3>
          </div>
          <TrustTimeline events={demoTimeline} />
        </div>
      </div>
    </div>
  );
}
