"use client";

import { ReactNode, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  AlertTriangle,
  ArrowDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LexiAvatar } from "@/components/lexi/LexiAvatar";
import { cn } from "@/lib/utils";

export interface TourStep {
  id: number;
  targetId: string;
  title: string;
  description: string;
  content?: ReactNode;
  tooltipPosition?: "top" | "bottom" | "left" | "right" | "center";
  padding?: number;
}

export const TOUR_STEPS: TourStep[] = [
  {
    id: 1,
    targetId: "tour-upload-zone",
    title: "Upload Your First Document",
    description:
      "Upload contracts, internship offers, rental agreements, privacy policies, or terms and conditions.",
    tooltipPosition: "right",
    content: (
      <div className="mt-3 space-y-2">
        <p className="text-xs text-muted font-medium uppercase tracking-wider">Accepted Formats</p>
        <div className="flex gap-2">
          {["PDF", "DOCX", "TXT"].map((fmt) => (
            <span
              key={fmt}
              className="text-xs px-2.5 py-1 rounded-md bg-accent/10 text-accent border border-accent/20"
            >
              {fmt}
            </span>
          ))}
        </div>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex items-center gap-1 text-accent text-xs mt-2"
        >
          <ArrowDown className="w-3.5 h-3.5" />
          Drag & drop or click to upload
        </motion.div>
      </div>
    ),
  },
  {
    id: 2,
    targetId: "tour-trust-score",
    title: "Understand Your Trust Score",
    description:
      "Every document receives a Trust Score based on risk factors, obligations, hidden clauses, and legal complexity.",
    tooltipPosition: "right",
    content: (
      <div className="mt-3 space-y-1.5">
        <p className="text-xs text-muted font-medium uppercase tracking-wider">Color Guide</p>
        {[
          { color: "bg-success", label: "Green = Low Risk" },
          { color: "bg-warning", label: "Yellow = Review Carefully" },
          { color: "bg-danger", label: "Red = High Risk" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-xs text-secondary-text">
            <span className={cn("w-2.5 h-2.5 rounded-full", item.color)} />
            {item.label}
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 3,
    targetId: "tour-risk-analysis",
    title: "Identify Hidden Risks",
    description: "TrustLens automatically detects:",
    tooltipPosition: "top",
    content: (
      <ul className="mt-2 space-y-1.5">
        {[
          "Hidden Charges",
          "Auto Renewals",
          "Data Sharing Clauses",
          "One-Sided Obligations",
          "Termination Risks",
        ].map((item) => (
          <li key={item} className="flex items-center gap-2 text-xs text-secondary-text">
            <AlertTriangle className="w-3 h-3 text-warning flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: 4,
    targetId: "tour-clause-explanation",
    title: "Legal Language Made Simple",
    description:
      "Complex legal clauses are translated into plain English so you can understand exactly what you are agreeing to.",
    tooltipPosition: "top",
    content: (
      <div className="mt-3 p-3 rounded-lg bg-background border border-border text-xs">
        <p className="text-muted italic mb-2">&ldquo;Employee assigns all inventions conceived during employment...&rdquo;</p>
        <div className="flex justify-center my-1">
          <ChevronRight className="w-4 h-4 text-accent rotate-90" />
        </div>
        <p className="text-secondary-text">
          The company owns everything you create — even personal projects during evenings and weekends.
        </p>
      </div>
    ),
  },
  {
    id: 5,
    targetId: "tour-trust-timeline",
    title: "Visual Contract Journey",
    description:
      "Instead of reading hundreds of lines, view the entire contract flow visually.",
    tooltipPosition: "top",
    content: (
      <div className="mt-3 space-y-1">
        {[
          { label: "Contract Start", warn: false },
          { label: "Data Collection", warn: false },
          { label: "Data Sharing", warn: true },
          { label: "Auto Renewal", warn: true },
          { label: "Termination Rights", warn: true },
          { label: "Contract End", warn: false },
        ].map((item, i, arr) => (
          <div key={item.label} className="flex flex-col items-center">
            <span
              className={cn(
                "text-xs px-2 py-0.5 rounded-md border",
                item.warn
                  ? "text-danger border-danger/30 bg-danger/10"
                  : "text-secondary-text border-border bg-background"
              )}
            >
              {item.label} {item.warn && "⚠"}
            </span>
            {i < arr.length - 1 && (
              <ChevronRight className="w-3 h-3 text-muted rotate-90 my-0.5" />
            )}
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 6,
    targetId: "tour-lexi",
    title: "Meet Lexi",
    description: "Lexi is your personal guide throughout the platform. Lexi can:",
    tooltipPosition: "left",
    padding: 12,
    content: (
      <div className="mt-3 space-y-3">
        <ul className="space-y-1">
          {[
            "Explain Clauses",
            "Answer Questions",
            "Help Upload Documents",
            "Explain Trust Scores",
            "Navigate Features",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2 text-xs text-secondary-text">
              <span className="text-success">✓</span>
              {item}
            </li>
          ))}
        </ul>
        <div className="flex items-start gap-2 p-2.5 rounded-xl bg-background border border-border">
          <LexiAvatar size="sm" />
          <div className="text-xs">
            <p className="text-accent font-medium">Hello 👋</p>
            <p className="text-primary-text">I&apos;m Lexi.</p>
            <p className="text-secondary-text">How can I help you today?</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 7,
    targetId: "nav-history",
    title: "Access Past Reports",
    description:
      "Every analysis is saved so you can revisit documents and compare results later.",
    tooltipPosition: "right",
    content: (
      <div className="mt-3 space-y-1.5">
        {["Recent Reports", "Saved Documents", "Generated Insights"].map((item) => (
          <div key={item} className="flex items-center gap-2 text-xs text-secondary-text">
            <FileText className="w-3 h-3 text-accent" />
            {item}
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 8,
    targetId: "nav-profile",
    title: "Your Personal Workspace",
    description:
      "Manage your account, preferences, activity history, and future analyses from here.",
    tooltipPosition: "right",
  },
];

interface TourTooltipProps {
  step: TourStep;
  currentStep: number;
  totalSteps: number;
  onPrev: () => void;
  onNext: () => void;
  onSkip: () => void;
}

export function TourTooltip({
  step,
  currentStep,
  totalSteps,
  onPrev,
  onNext,
  onSkip,
}: TourTooltipProps) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const isFirst = currentStep === 0;
  const isLast = currentStep === totalSteps - 1;

  useEffect(() => {
    const updatePosition = () => {
      const el = document.getElementById(step.targetId);
      if (!el) {
        setPosition({ top: window.innerHeight / 2 - 150, left: window.innerWidth / 2 - 180 });
        return;
      }

      const rect = el.getBoundingClientRect();
      const tooltipWidth = 360;
      const tooltipHeight = 320;
      const gap = 16;
      let top = 0;
      let left = 0;

      switch (step.tooltipPosition) {
        case "right":
          top = rect.top + rect.height / 2 - tooltipHeight / 2;
          left = rect.right + gap;
          break;
        case "left":
          top = rect.top + rect.height / 2 - tooltipHeight / 2;
          left = rect.left - tooltipWidth - gap;
          break;
        case "top":
          top = rect.top - tooltipHeight - gap;
          left = rect.left + rect.width / 2 - tooltipWidth / 2;
          break;
        case "bottom":
          top = rect.bottom + gap;
          left = rect.left + rect.width / 2 - tooltipWidth / 2;
          break;
        default:
          top = rect.bottom + gap;
          left = rect.left + rect.width / 2 - tooltipWidth / 2;
      }

      top = Math.max(80, Math.min(top, window.innerHeight - tooltipHeight - 16));
      left = Math.max(16, Math.min(left, window.innerWidth - tooltipWidth - 16));

      setPosition({ top, left });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    const interval = setInterval(updatePosition, 300);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
      clearInterval(interval);
    };
  }, [step]);

  return (
    <motion.div
      key={step.id}
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      className="fixed z-[120] w-[360px] max-w-[calc(100vw-2rem)] card-premium shadow-2xl shadow-black/60 border-accent/20"
      style={{ top: position.top, left: position.left }}
      role="dialog"
      aria-labelledby="tour-title"
      aria-describedby="tour-desc"
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-accent">
            Step {currentStep + 1} of {totalSteps}
          </span>
          <button
            onClick={onSkip}
            className="text-xs text-muted hover:text-primary-text transition-colors cursor-pointer"
          >
            Skip Tour
          </button>
        </div>

        <h3
          id="tour-title"
          className="font-semibold text-primary-text text-base mb-2 font-[family-name:var(--font-space-grotesk)]"
        >
          {step.title}
        </h3>
        <p id="tour-desc" className="text-sm text-secondary-text leading-relaxed">
          {step.description}
        </p>
        {step.content}

        <div className="flex items-center gap-1.5 mt-5 mb-4">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1 flex-1 rounded-full transition-all duration-300",
                i <= currentStep ? "bg-accent" : "bg-border"
              )}
            />
          ))}
        </div>

        <div className="flex gap-2">
          {!isFirst && (
            <Button variant="outline" size="sm" onClick={onPrev} className="flex-1">
              <ChevronLeft className="w-3.5 h-3.5" />
              Previous
            </Button>
          )}
          <Button size="sm" onClick={onNext} className={cn("flex-1", isFirst && "w-full")}>
            {isLast ? "Finish Tour" : "Next"}
            {!isLast && <ChevronRight className="w-3.5 h-3.5" />}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
