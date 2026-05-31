/**
 * Resilient PDF text extraction for hackathon/demo reliability.
 * Never throws — always returns an outcome the analyze API can use.
 */

import { createRequire } from "node:module";
import path from "node:path";

const nodeRequire = createRequire(path.join(process.cwd(), "package.json"));

export type PdfExtractionMethod =
  | "pdf-parse"
  | "pdf-parse-lenient"
  | "raw-stream"
  | "metadata-placeholder";

export interface PdfExtractionOutcome {
  text: string;
  method: PdfExtractionMethod;
  partial: boolean;
  usedFallback: boolean;
  debugReason?: string;
}

type PdfParseFn = (buffer: Buffer, options?: Record<string, unknown>) => Promise<{
  text: string;
  numpages?: number;
}>;

function getPdfParser(): PdfParseFn {
  const pdfParse = nodeRequire("pdf-parse") as PdfParseFn | { default: PdfParseFn };
  return typeof pdfParse === "function" ? pdfParse : pdfParse.default;
}

function isRecoverablePdfError(error: unknown): boolean {
  const msg = (error instanceof Error ? error.message : String(error)).toLowerCase();
  return (
    msg.includes("bad xref") ||
    msg.includes("xref") ||
    msg.includes("invalid pdf") ||
    msg.includes("missing pdf") ||
    msg.includes("unexpected response") ||
    msg.includes("corrupt") ||
    msg.includes("format error") ||
    msg.includes("failed to parse") ||
    msg.includes("invalid stream") ||
    msg.includes("encrypt")
  );
}

/** Scrape readable strings from PDF binary (works on some corrupt files). */
function extractRawStreamText(buffer: Buffer): string {
  const raw = buffer.toString("latin1");
  const parts: string[] = [];

  // Text in PDF literal strings: ( ... )
  const literalRegex = /\(([^()\\]{2,500}(?:\\.[^()\\]*)*)\)/g;
  let match: RegExpExecArray | null;
  while ((match = literalRegex.exec(raw)) !== null) {
    const decoded = match[1]
      .replace(/\\n/g, "\n")
      .replace(/\\r/g, "")
      .replace(/\\\(/g, "(")
      .replace(/\\\)/g, ")");
    if (/[a-zA-Z]{3,}/.test(decoded)) {
      parts.push(decoded);
    }
  }

  // Long printable ASCII runs (skip object headers)
  const asciiRuns = raw.match(/[\x20-\x7E]{25,}/g) ?? [];
  for (const run of asciiRuns) {
    if (
      !run.startsWith("%PDF") &&
      !run.includes("endobj") &&
      !run.includes("/Type") &&
      !/^\d+ \d+ obj/.test(run)
    ) {
      parts.push(run);
    }
  }

  const combined = [...new Set(parts)].join("\n").replace(/\s+/g, " ").trim();
  return combined;
}

function buildMetadataPlaceholder(fileName: string, buffer: Buffer): string {
  const docType = fileName.split(".").pop()?.toUpperCase() ?? "PDF";
  return [
    `Uploaded legal document: ${fileName}`,
    `Document type: ${docType}`,
    `File size: ${buffer.length} bytes`,
    "",
    "This document was uploaded for TrustLens analysis. The file structure could not be fully parsed,",
    "but analysis will proceed using document metadata and standard risk patterns for this document category.",
    "Review trust score, hidden clauses, and negotiation suggestions in the report.",
  ].join("\n");
}

/**
 * Multi-step PDF extraction. Does not throw.
 */
export async function extractPdfTextResilient(
  buffer: Buffer,
  fileName: string
): Promise<PdfExtractionOutcome> {
  const pdfParse = getPdfParser();

  // Step 1: Standard pdf-parse
  try {
    console.log("[PDF] Attempt 1: pdf-parse standard —", fileName);
    const result = await pdfParse(buffer);
    const text = result.text?.trim() ?? "";
    if (text.length >= 20) {
      console.log("[PDF] Success (standard), chars:", text.length);
      return { text, method: "pdf-parse", partial: false, usedFallback: false };
    }
    console.warn("[PDF] Standard parse returned insufficient text, trying lenient options");
  } catch (error) {
    console.warn(
      "[PDF] Standard parse failed:",
      error instanceof Error ? error.message : error
    );
    if (!isRecoverablePdfError(error)) {
      console.warn("[PDF] Non-recoverable error shape, continuing fallbacks anyway");
    }
  }

  // Step 2: Lenient pdf-parse (pagerender noop, higher tolerance where supported)
  try {
    console.log("[PDF] Attempt 2: pdf-parse lenient —", fileName);
    const result = await pdfParse(buffer, {
      max: 0,
    });
    const text = result.text?.trim() ?? "";
    if (text.length >= 10) {
      console.log("[PDF] Success (lenient), chars:", text.length);
      return {
        text,
        method: "pdf-parse-lenient",
        partial: true,
        usedFallback: true,
        debugReason: "lenient-parse",
      };
    }
  } catch (error) {
    console.warn(
      "[PDF] Lenient parse failed:",
      error instanceof Error ? error.message : error
    );
  }

  // Step 3: Raw stream / string scrape from binary
  try {
    console.log("[PDF] Attempt 3: raw stream extraction —", fileName);
    const rawText = extractRawStreamText(buffer);
    if (rawText.length >= 20) {
      console.log("[PDF] Success (raw stream), chars:", rawText.length);
      return {
        text: rawText.substring(0, 15000),
        method: "raw-stream",
        partial: true,
        usedFallback: true,
        debugReason: "raw-stream-scrape",
      };
    }
  } catch (error) {
    console.warn("[PDF] Raw stream scrape failed:", error);
  }

  // Step 4: Metadata placeholder (enables Gemini or demo fallback downstream)
  console.log("[PDF] Attempt 4: metadata placeholder —", fileName);
  const placeholder = buildMetadataPlaceholder(fileName, buffer);
  return {
    text: placeholder,
    method: "metadata-placeholder",
    partial: true,
    usedFallback: true,
    debugReason: "metadata-placeholder",
  };
}
