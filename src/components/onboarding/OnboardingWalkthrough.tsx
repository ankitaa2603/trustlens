"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { WelcomeScreen } from "./WelcomeScreen";
import { CompletionScreen } from "./CompletionScreen";
import { TOUR_STEPS } from "./TourTooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Lightweight tour: dim overlay + centered step card.
 * No MutationObserver / polling — avoids UI freeze from render loops.
 */
export function OnboardingWalkthrough() {
  const router = useRouter();
  const pathname = usePathname();
  const highlightRef = useRef<HTMLElement | null>(null);
  const {
    phase,
    currentStep,
    totalSteps,
    skipTour,
    nextStep,
    prevStep,
    finishTour,
  } = useOnboarding();

  const step = TOUR_STEPS[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === totalSteps - 1;

  useEffect(() => {
    if (phase === "tour" && pathname !== "/dashboard") {
      router.push("/dashboard");
    }
  }, [phase, pathname, router]);

  useEffect(() => {
    if (phase !== "tour" || !step) return;

    highlightRef.current?.classList.remove("tour-highlight-active");

    const timer = window.setTimeout(() => {
      const el = document.getElementById(step.targetId);
      if (!el) return;
      highlightRef.current = el;
      el.classList.add("tour-highlight-active");
      el.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 100);

    return () => {
      window.clearTimeout(timer);
      highlightRef.current?.classList.remove("tour-highlight-active");
      highlightRef.current = null;
    };
  }, [phase, currentStep, step?.targetId]);

  const handleNext = () => {
    if (isLast) finishTour();
    else nextStep();
  };

  useEffect(() => {
    if (phase !== "tour") return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") skipTour();
      else if (e.key === "ArrowRight") {
        if (currentStep >= totalSteps - 1) finishTour();
        else nextStep();
      } else if (e.key === "ArrowLeft" && currentStep > 0) prevStep();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [phase, currentStep, totalSteps, skipTour, nextStep, prevStep, finishTour]);

  if (phase === "idle") return null;

  return (
    <AnimatePresence mode="wait">
      {phase === "welcome" && <WelcomeScreen key="welcome" />}

      {phase === "tour" && step && (
        <div key="tour" className="fixed inset-0 z-[150]">
          <div
            className="absolute inset-0 bg-background/80"
            aria-hidden="true"
            onClick={skipTour}
          />

          <div className="absolute top-0 left-0 right-0 h-1 bg-border z-[151]">
            <div
              className="h-full bg-accent transition-all duration-300 ease-out"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            />
          </div>

          <div className="absolute inset-0 flex items-end sm:items-center justify-center p-4 pointer-events-none">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto w-full max-w-md card-premium p-5 shadow-2xl border-accent/20"
              role="dialog"
              aria-labelledby="tour-title"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-accent">
                  Step {currentStep + 1} of {totalSteps}
                </span>
                <button
                  type="button"
                  onClick={skipTour}
                  className="text-xs text-muted hover:text-primary-text cursor-pointer"
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
              <p className="text-sm text-secondary-text leading-relaxed">{step.description}</p>
              {step.content}

              <div className="flex items-center gap-1.5 mt-5 mb-4">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-1 flex-1 rounded-full transition-colors",
                      i <= currentStep ? "bg-accent" : "bg-border"
                    )}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                {!isFirst && (
                  <Button variant="outline" size="sm" onClick={prevStep} className="flex-1">
                    <ChevronLeft className="w-3.5 h-3.5" />
                    Previous
                  </Button>
                )}
                <Button size="sm" onClick={handleNext} className={cn("flex-1", isFirst && "w-full")}>
                  {isLast ? "Finish Tour" : "Next"}
                  {!isLast && <ChevronRight className="w-3.5 h-3.5" />}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {phase === "complete" && <CompletionScreen key="complete" />}
    </AnimatePresence>
  );
}
