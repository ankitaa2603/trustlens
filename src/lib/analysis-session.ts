import type { DocumentAnalysis } from "@/types";

const STORAGE_PREFIX = "trustlens_analysis_";

export function saveAnalysisToSession(analysis: DocumentAnalysis): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(`${STORAGE_PREFIX}${analysis.id}`, JSON.stringify(analysis));
  } catch (e) {
    console.warn("[Analysis] sessionStorage save failed:", e);
  }
}

export function getAnalysisFromSession(id: string): DocumentAnalysis | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(`${STORAGE_PREFIX}${id}`);
    if (!raw) return null;
    return JSON.parse(raw) as DocumentAnalysis;
  } catch {
    return null;
  }
}
