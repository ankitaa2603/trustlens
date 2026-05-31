import { GoogleGenerativeAI } from "@google/generative-ai";

/** Read at call time so Next.js loads `.env.local` correctly in API routes. */
export function getGeminiApiKey(): string {
  return process.env.GEMINI_API_KEY?.trim() ?? "";
}

/**
 * Supported Gemini models (v1beta generateContent).
 * Avoid deprecated aliases like `gemini-1.5-flash-latest`.
 * Order: newest stable first, then versioned fallbacks.
 */
const GENERATION_MODELS = [
  "gemini-2.5-flash",
  "gemini-2.5-flash-preview-05-20",
  "gemini-2.0-flash-001",
  "gemini-2.0-flash",
  "gemini-1.5-flash-002",
  "gemini-1.5-flash",
] as const;

function isModelNotFoundError(error: unknown): boolean {
  const msg = error instanceof Error ? error.message : String(error);
  return msg.includes("404") || msg.includes("not found") || msg.includes("NOT_FOUND");
}

async function generateWithFallback(prompt: string): Promise<string> {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is not set. Add it to .env.local and restart the dev server."
    );
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const errors: string[] = [];

  for (const modelName of GENERATION_MODELS) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const text = result.response.text()?.trim();
      if (text) {
        console.log(`[Gemini] Success with model: ${modelName}`);
        return text;
      }
      errors.push(`${modelName}: empty response`);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      errors.push(`${modelName}: ${msg}`);
      if (isModelNotFoundError(error)) {
        console.warn(`[Gemini] Model not available, skipping: ${modelName}`);
        continue;
      }
      console.warn(`[Gemini] Model "${modelName}" failed:`, error);
    }
  }

  throw new Error(
    `All Gemini models failed. Tried: ${GENERATION_MODELS.join(", ")}. Last errors: ${errors.slice(-2).join(" | ")}`
  );
}

export async function analyzeDocument(text: string, documentType: string) {
  const prompt = `You are a legal document analysis AI. Analyze the following ${documentType} document and return ONLY valid JSON with this exact structure (no markdown fences):
{
  "trustScore": number,
  "riskSummary": "string",
  "hiddenClauses": ["string"],
  "dangerousClauses": [{"title": "string", "originalText": "string", "plainEnglish": "string", "riskLevel": "low|medium|high|critical", "category": "string"}],
  "clauseExplanations": [{"title": "string", "originalText": "string", "plainEnglish": "string", "riskLevel": "low|medium|high|critical", "category": "string"}],
  "negotiationSuggestions": [{"clause": "string", "suggestion": "string", "priority": "high|medium|low", "impact": "string"}],
  "timeline": [{"label": "string", "description": "string", "riskLevel": "low|medium|high|critical", "date": "optional string"}]
}

Document text:
${text.substring(0, 15000)}`;

  const response = await generateWithFallback(prompt);
  const jsonMatch = response.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Failed to parse AI response as JSON");
  }
  return JSON.parse(jsonMatch[0]);
}

export async function chatWithLexi(message: string, context: string): Promise<string> {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    console.error("[Lexi] GEMINI_API_KEY missing from .env.local");
    return getFallbackLexiResponse(message);
  }

  const prompt = `You are Lexi, the AI assistant for TrustLens — a legal document analysis platform.
Context: ${context}
User message: ${message}

Respond helpfully and concisely about TrustLens features, document analysis, trust scores, or legal document understanding.
Keep responses under 150 words. Be professional, friendly, and trustworthy.
If asked about legal advice, clarify that TrustLens provides analysis, not legal advice.`;

  return generateWithFallback(prompt);
}

function getFallbackLexiResponse(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("trust score")) {
    return "Your Trust Score (0-100) measures how fair and transparent a document is. Scores above 75 are generally good, 50-75 need review, and below 50 indicate significant concerns.";
  }
  if (lower.includes("upload") || lower.includes("start")) {
    return "To analyze a document, go to Upload Document in the sidebar. Drag and drop a PDF, DOCX, or TXT file.";
  }
  if (lower.includes("feature")) {
    return "TrustLens offers: Trust Score Engine, Hidden Clause Detection, Plain English Translation, Trust Timeline, Negotiation Suggestions, and Lexi assistance.";
  }

  return "I'm Lexi, your TrustLens assistant. Add GEMINI_API_KEY to .env.local and restart the dev server for live AI replies.";
}
