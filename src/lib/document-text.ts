/**
 * Server-side text extraction for uploaded documents.
 * PDFs use resilient multi-step extraction (never throws).
 */

import { extractPdfTextResilient, type PdfExtractionOutcome } from "@/lib/pdf-extract";
import { createRequire } from "node:module";
import path from "node:path";

const nodeRequire = createRequire(path.join(process.cwd(), "package.json"));

export interface ExtractionResult {
  text: string;
  /** True when PDF used fallback path (partial/corrupt file). */
  usedPdfFallback: boolean;
  pdfOutcome?: PdfExtractionOutcome;
}

export async function extractTextFromBuffer(
  buffer: Buffer,
  fileName: string,
  mimeType: string
): Promise<ExtractionResult> {
  const ext = fileName.split(".").pop()?.toLowerCase() ?? "";
  const mime = mimeType.toLowerCase();

  console.log("[Document] Extracting text:", { fileName, ext, mime, bytes: buffer.length });

  if (ext === "txt" || mime === "text/plain") {
    return { text: buffer.toString("utf-8"), usedPdfFallback: false };
  }

  if (ext === "pdf" || mime === "application/pdf") {
    const outcome = await extractPdfTextResilient(buffer, fileName);
    return {
      text: outcome.text,
      usedPdfFallback: outcome.usedFallback,
      pdfOutcome: outcome,
    };
  }

  if (
    ext === "docx" ||
    mime === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const text = await extractDocxText(buffer);
    return { text, usedPdfFallback: false };
  }

  throw new Error(`Unsupported file type: .${ext || "unknown"}. Use PDF, DOCX, or TXT.`);
}

async function extractDocxText(buffer: Buffer): Promise<string> {
  try {
    const mammoth = await import("mammoth");
    const result = await mammoth.extractRawText({ buffer });
    const text = result.value?.trim() ?? "";
    if (!text || text.length < 20) {
      throw new Error("Could not extract readable text from this DOCX file.");
    }
    console.log("[Document] DOCX text extracted, length:", text.length);
    return text;
  } catch (error) {
    console.error("[Document] DOCX extraction failed:", error);
    throw error instanceof Error
      ? error
      : new Error("Failed to extract text from DOCX.");
  }
}
