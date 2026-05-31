"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UploadZone } from "@/components/dashboard/UploadZone";
import { saveAnalysisToSession } from "@/lib/analysis-session";
import type { DocumentAnalysis } from "@/types";

export default function UploadPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpload = async (file: File) => {
    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      console.log("[Upload] Sending to /api/analyze:", file.name, file.type);

      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("[Upload] API error:", res.status, data);
        // Only show user-facing errors for missing file / bad request — not PDF parse internals
        if (res.status === 400) {
          toast.error("Please upload a valid PDF, DOCX, or TXT file.");
        } else {
          console.warn("[Upload] Non-400 error — attempting graceful handling");
        }
        setIsProcessing(false);
        if (res.status === 400) return;
      }

      if (!data?.id) {
        console.error("[Upload] Missing analysis id in response:", data);
        setIsProcessing(false);
        return;
      }

      saveAnalysisToSession(data as DocumentAnalysis);
      console.log("[Upload] Analysis saved, navigating to:", data.id);
      toast.success(data.message || "Document processed successfully");
      router.push(`/dashboard/analysis/${data.id}`);
    } catch (error) {
      console.error("[Upload] Request failed:", error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary-text font-[family-name:var(--font-space-grotesk)]">
          Upload Document
        </h1>
        <p className="text-secondary-text text-sm mt-1">
          Upload a legal document for AI-powered analysis. Supported formats: PDF, DOCX, TXT.
        </p>
      </div>

      <UploadZone onUpload={handleUpload} isProcessing={isProcessing} />

      <div className="card-premium p-4">
        <h3 className="text-sm font-medium text-primary-text mb-2">Supported Documents</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            "Internship Offers",
            "Employment Contracts",
            "Rental Agreements",
            "Privacy Policies",
            "Insurance Documents",
            "Terms & Conditions",
          ].map((type) => (
            <span key={type} className="text-xs text-secondary-text px-2 py-1 rounded-lg bg-background border border-border">
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
