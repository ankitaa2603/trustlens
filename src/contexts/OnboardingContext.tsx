"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type OnboardingPhase = "idle" | "welcome" | "tour" | "complete";

interface OnboardingContextValue {
  phase: OnboardingPhase;
  currentStep: number;
  totalSteps: number;
  isActive: boolean;
  startTour: () => void;
  skipTour: () => void;
  nextStep: () => void;
  prevStep: () => void;
  finishTour: () => void;
  restartTour: () => void;
  setPhase: (phase: OnboardingPhase) => void;
  setCurrentStep: (step: number) => void;
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export const ONBOARDING_TOTAL_STEPS = 8;

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<OnboardingPhase>("idle");
  const [currentStep, setCurrentStep] = useState(0);
  const [checked, setChecked] = useState(false);

  const persistCompletion = useCallback(async (completed: boolean) => {
    localStorage.setItem("trustlens_onboarding_done", completed ? "true" : "false");
    try {
      await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed }),
      });
    } catch {
      // Fallback to localStorage only
    }
  }, []);

  useEffect(() => {
    const checkStatus = async () => {
      const localDone = localStorage.getItem("trustlens_onboarding_done") === "true";
      if (localDone) {
        setChecked(true);
        return;
      }

      try {
        const res = await fetch("/api/onboarding");
        const data = await res.json();
        if (data.completed) {
          localStorage.setItem("trustlens_onboarding_done", "true");
          setChecked(true);
          return;
        }
      } catch {
        // Use localStorage fallback
      }

      setTimeout(() => setPhase("welcome"), 1200);
      setChecked(true);
    };

    checkStatus();
  }, []);

  const startTour = useCallback(() => {
    setCurrentStep(0);
    setPhase("tour");
  }, []);

  const skipTour = useCallback(async () => {
    setPhase("idle");
    await persistCompletion(true);
  }, [persistCompletion]);

  const finishTour = useCallback(async () => {
    setPhase("complete");
    await persistCompletion(true);
  }, [persistCompletion]);

  const nextStep = useCallback(() => {
    setCurrentStep((s) => Math.min(s + 1, ONBOARDING_TOTAL_STEPS - 1));
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((s) => Math.max(0, s - 1));
  }, []);

  const restartTour = useCallback(async () => {
    localStorage.removeItem("trustlens_onboarding_done");
    try {
      await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: false }),
      });
    } catch {
      // Continue with local restart
    }
    setCurrentStep(0);
    setPhase("welcome");
  }, []);

  return (
    <OnboardingContext.Provider
      value={{
        phase,
        currentStep,
        totalSteps: ONBOARDING_TOTAL_STEPS,
        isActive: phase === "welcome" || phase === "tour" || phase === "complete",
        startTour,
        skipTour,
        nextStep,
        prevStep,
        finishTour,
        restartTour,
        setPhase,
        setCurrentStep,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboarding must be used within OnboardingProvider");
  return ctx;
}
