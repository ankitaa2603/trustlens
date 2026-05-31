"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, X, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UploadZoneProps {
  onUpload?: (file: File) => void;
  isProcessing?: boolean;
}

export function UploadZone({ onUpload, isProcessing = false }: UploadZoneProps) {
  const [file, setFile] = useState<File | null>(null);
  const [processingStep, setProcessingStep] = useState(0);

  const processingSteps = [
    "Uploading document...",
    "Extracting text content...",
    "Analyzing clauses with AI...",
    "Detecting hidden risks...",
    "Generating Trust Score...",
    "Building Trust Timeline...",
    "Finalizing report...",
  ];

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "text/plain": [".txt"],
    },
    maxSize: 10 * 1024 * 1024,
    disabled: isProcessing,
  });

  const simulateProcessing = () => {
    setProcessingStep(0);
    const interval = setInterval(() => {
      setProcessingStep((s) => {
        if (s >= processingSteps.length - 1) {
          clearInterval(interval);
          return s;
        }
        return s + 1;
      });
    }, 800);
  };

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {!isProcessing ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              {...getRootProps()}
              className={cn(
                "relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300",
                isDragActive
                  ? "border-accent bg-accent/5 scale-[1.01]"
                  : "border-border hover:border-accent/40 hover:bg-card/50",
                file && "border-success/40 bg-success/5"
              )}
            >
              <input {...getInputProps()} aria-label="Upload document" />

              {file ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-success/10 border border-success/30 flex items-center justify-center">
                    <FileText className="w-7 h-7 text-success" />
                  </div>
                  <div>
                    <p className="font-medium text-primary-text">{file.name}</p>
                    <p className="text-sm text-muted mt-0.5">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                    }}
                    className="flex items-center gap-1 text-xs text-muted hover:text-danger transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3" /> Remove
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <motion.div
                    animate={{ y: isDragActive ? -4 : 0 }}
                    className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center"
                  >
                    <Upload className="w-7 h-7 text-accent" />
                  </motion.div>
                  <div>
                    <p className="font-medium text-primary-text mb-1">
                      {isDragActive ? "Drop your document here" : "Drag & drop your document"}
                    </p>
                    <p className="text-sm text-muted">
                      or click to browse · PDF, DOCX, TXT · Max 10MB
                    </p>
                  </div>
                </div>
              )}
            </div>

            {file && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center mt-4"
              >
                <Button
                  onClick={() => {
                    simulateProcessing();
                    onUpload?.(file);
                  }}
                  size="lg"
                >
                  Analyze Document
                </Button>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card-premium p-8 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-6">
              <Loader2 className="w-8 h-8 text-accent animate-spin" />
            </div>
            <h3 className="font-semibold text-primary-text mb-2 font-[family-name:var(--font-space-grotesk)]">
              Analyzing Your Document
            </h3>
            <p className="text-sm text-secondary-text mb-6">
              {processingSteps[processingStep]}
            </p>
            <div className="space-y-2 max-w-xs mx-auto">
              {processingSteps.map((step, i) => (
                <div
                  key={step}
                  className={cn(
                    "flex items-center gap-2 text-xs transition-all duration-300",
                    i < processingStep
                      ? "text-success"
                      : i === processingStep
                      ? "text-accent"
                      : "text-muted"
                  )}
                >
                  {i < processingStep ? (
                    <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  ) : i === processingStep ? (
                    <Loader2 className="w-3.5 h-3.5 flex-shrink-0 animate-spin" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border border-border flex-shrink-0" />
                  )}
                  {step}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
