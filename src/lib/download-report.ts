import type { DocumentAnalysis } from "@/types";
import { formatDate, getTrustScoreLabel } from "@/lib/utils";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function riskBadge(level: string): string {
  const colors: Record<string, string> = {
    low: "#16A34A",
    medium: "#F59E0B",
    high: "#DC2626",
    critical: "#B91C1C",
  };
  const c = colors[level] ?? "#94A3B8";
  return `<span style="color:${c};font-weight:600;text-transform:capitalize;">${escapeHtml(level)}</span>`;
}

export function buildReportHtml(analysis: DocumentAnalysis): string {
  const title = escapeHtml(analysis.documentName);
  const scoreLabel = getTrustScoreLabel(analysis.trustScore);

  const hiddenList = analysis.hiddenClauses
    .map((c) => `<li style="margin-bottom:8px;">⚠ ${escapeHtml(c)}</li>`)
    .join("");

  const dangerous = analysis.dangerousClauses
    .map(
      (c) => `
      <div style="border:1px solid #334155;border-radius:8px;padding:16px;margin-bottom:12px;">
        <h4 style="margin:0 0 8px;color:#F8FAFC;">${escapeHtml(c.title)} ${riskBadge(c.riskLevel)}</h4>
        <p style="margin:0 0 8px;font-size:12px;color:#94A3B8;font-style:italic;">"${escapeHtml(c.originalText.substring(0, 200))}..."</p>
        <p style="margin:0;color:#CBD5E1;">${escapeHtml(c.plainEnglish)}</p>
      </div>`
    )
    .join("");

  const clauses = analysis.clauseExplanations
    .map(
      (c) => `
      <div style="border:1px solid #334155;border-radius:8px;padding:14px;margin-bottom:10px;">
        <p style="margin:0 0 4px;font-size:11px;color:#D4AF37;">${escapeHtml(c.category)} · ${riskBadge(c.riskLevel)}</p>
        <h4 style="margin:0 0 6px;color:#F8FAFC;">${escapeHtml(c.title)}</h4>
        <p style="margin:0;color:#CBD5E1;font-size:14px;">${escapeHtml(c.plainEnglish)}</p>
      </div>`
    )
    .join("");

  const negotiations = analysis.negotiationSuggestions
    .map(
      (n) => `
      <div style="border-left:3px solid #D4AF37;padding-left:12px;margin-bottom:14px;">
        <strong style="color:#F8FAFC;">${escapeHtml(n.clause)}</strong>
        <span style="color:#94A3B8;font-size:12px;"> (${escapeHtml(n.priority)} priority)</span>
        <p style="margin:6px 0;color:#CBD5E1;">${escapeHtml(n.suggestion)}</p>
        <p style="margin:0;font-size:12px;color:#D4AF37;">Impact: ${escapeHtml(n.impact)}</p>
      </div>`
    )
    .join("");

  const timeline = analysis.timeline
    .map(
      (t) => `
      <div style="display:flex;gap:12px;margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid #334155;">
        <div style="min-width:140px;font-weight:600;color:#D4AF37;">${escapeHtml(t.label)}</div>
        <div style="flex:1;color:#CBD5E1;">${escapeHtml(t.description)} ${riskBadge(t.riskLevel)}</div>
      </div>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>TrustLens Report — ${title}</title>
  <style>
    body { font-family: 'Segoe UI', system-ui, sans-serif; background: #0F172A; color: #F8FAFC; margin: 0; padding: 40px; line-height: 1.5; }
    @media print { body { background: #fff; color: #111; } .no-print { display: none; } }
  </style>
</head>
<body>
  <div style="border-bottom:2px solid #D4AF37;padding-bottom:20px;margin-bottom:28px;">
    <p style="margin:0;font-size:12px;color:#D4AF37;letter-spacing:2px;">TRUSTLENS AI</p>
    <h1 style="margin:8px 0 4px;font-size:28px;">${title}</h1>
    <p style="margin:0;color:#94A3B8;">${escapeHtml(analysis.documentType)} · ${formatDate(analysis.analyzedAt)}${analysis.fileSize ? ` · ${escapeHtml(analysis.fileSize)}` : ""}</p>
  </div>

  <div style="display:flex;align-items:center;gap:24px;margin-bottom:32px;padding:24px;background:#1E293B;border-radius:12px;border:1px solid #334155;">
    <div style="text-align:center;">
      <p style="margin:0;font-size:48px;font-weight:700;color:#D4AF37;">${analysis.trustScore}</p>
      <p style="margin:4px 0 0;color:#94A3B8;">Trust Score</p>
      <p style="margin:0;color:#CBD5E1;">${escapeHtml(scoreLabel)}</p>
    </div>
    <div style="flex:1;">
      <h2 style="margin:0 0 8px;font-size:18px;">Risk Summary</h2>
      <p style="margin:0;color:#CBD5E1;">${escapeHtml(analysis.riskSummary)}</p>
    </div>
  </div>

  <h2 style="color:#D4AF37;border-bottom:1px solid #334155;padding-bottom:8px;">Hidden Clauses Detected</h2>
  <ul style="color:#CBD5E1;padding-left:20px;">${hiddenList}</ul>

  <h2 style="color:#D4AF37;border-bottom:1px solid #334155;padding-bottom:8px;margin-top:32px;">Dangerous Clauses</h2>
  ${dangerous}

  <h2 style="color:#D4AF37;border-bottom:1px solid #334155;padding-bottom:8px;margin-top:32px;">Clause Explanations</h2>
  ${clauses}

  <h2 style="color:#D4AF37;border-bottom:1px solid #334155;padding-bottom:8px;margin-top:32px;">Negotiation Suggestions</h2>
  ${negotiations}

  <h2 style="color:#D4AF37;border-bottom:1px solid #334155;padding-bottom:8px;margin-top:32px;">Trust Timeline</h2>
  ${timeline}

  <p style="margin-top:40px;font-size:12px;color:#64748B;text-align:center;">
    Generated by TrustLens AI · Know What You're Signing · ${new Date().toLocaleString()}
  </p>
  <p class="no-print" style="text-align:center;color:#94A3B8;font-size:13px;">Open this file in a browser and use Print → Save as PDF for a PDF copy.</p>
</body>
</html>`;
}

/** Download analysis as an HTML report (print to PDF from browser). */
export function downloadAnalysisReport(analysis: DocumentAnalysis): void {
  const html = buildReportHtml(analysis);
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const safeName = analysis.documentName.replace(/[^a-z0-9.-]+/gi, "-").slice(0, 80);
  const filename = `TrustLens-Report-${safeName || "document"}.html`;

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  console.log("[Report] Downloaded:", filename);
}
