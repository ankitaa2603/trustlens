"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FileText, Shield, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";

export function WelcomeScreen() {
  const { startTour, skipTour } = useOnboarding();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-background/90 backdrop-blur-md" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="relative card-premium p-8 sm:p-10 max-w-md w-full text-center shadow-2xl border-accent/20"
        role="dialog"
        aria-labelledby="welcome-title"
      >
        <div className="flex justify-center items-end gap-3 mb-8 h-20">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-14 h-16 rounded-lg bg-card border border-border flex items-center justify-center"
          >
            <FileText className="w-7 h-7 text-secondary-text" />
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.35, type: "spring" }}
            className="w-16 h-16 rounded-2xl bg-accent/10 border-2 border-accent/40 flex items-center justify-center -mb-2"
          >
            <Shield className="w-8 h-8 text-accent" />
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-14 h-16 rounded-lg bg-card border border-accent/30 flex items-center justify-center"
          >
            <Bot className="w-7 h-7 text-accent" />
          </motion.div>
        </div>

        <h2
          id="welcome-title"
          className="text-2xl font-bold text-primary-text mb-3 font-[family-name:var(--font-space-grotesk)]"
        >
          Welcome to TrustLens 👋
        </h2>
        <p className="text-secondary-text text-sm leading-relaxed mb-8">
          Let&apos;s take a quick tour and show you how to understand any contract before signing it.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button size="lg" onClick={startTour} className="flex-1">
            Start Tour
          </Button>
          <Button size="lg" variant="outline" onClick={skipTour} className="flex-1">
            Skip
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
