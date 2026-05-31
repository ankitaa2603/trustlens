export type RiskLevel = "low" | "medium" | "high" | "critical";

export interface TimelineEvent {
  id: string;
  label: string;
  description: string;
  riskLevel: RiskLevel;
  date?: string;
  icon?: string;
}

export interface ClauseExplanation {
  id: string;
  title: string;
  originalText: string;
  plainEnglish: string;
  riskLevel: RiskLevel;
  category: string;
}

export interface NegotiationSuggestion {
  id: string;
  clause: string;
  suggestion: string;
  priority: "high" | "medium" | "low";
  impact: string;
}

export interface DocumentAnalysis {
  id: string;
  documentName: string;
  documentType: string;
  trustScore: number;
  riskSummary: string;
  hiddenClauses: string[];
  dangerousClauses: ClauseExplanation[];
  clauseExplanations: ClauseExplanation[];
  negotiationSuggestions: NegotiationSuggestion[];
  timeline: TimelineEvent[];
  clauseRelationships: { from: string; to: string; relationship: string }[];
  analyzedAt: string;
  fileSize?: string;
  pageCount?: number;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  documents_analyzed: number;
  reports_generated: number;
  created_at: string;
}

export interface AnalysisRecord {
  id: string;
  user_id: string;
  document_name: string;
  document_type: string;
  trust_score: number;
  analysis_data: DocumentAnalysis;
  created_at: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type LexiContext =
  | "default"
  | "dashboard"
  | "upload"
  | "analysis"
  | "history"
  | "walkthrough"
  | "demo";
