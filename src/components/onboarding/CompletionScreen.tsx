"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Upload, LayoutDashboard, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Confetti } from "./Confetti";
import { useOnboarding } from "@/contexts/OnboardingContext";

export function CompletionScreen() {
  const { setPhase } = useOnboarding();

  const handleClose = () => setPhase("idle");

  return (
    <>
      <Confetti />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[150] flex items-center justify-center p-4"
      >
        <div className="absolute inset-0 bg-background/90 backdrop-blur-md" />

        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
          className="relative card-premium p-8 sm:p-10 max-w-md w-full text-center shadow-2xl border-accent/30"
          role="dialog"
          aria-labelledby="complete-title"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", delay: 0.4 }}
            className="w-16 h-16 rounded-2xl bg-accent/10 border-2 border-accent/40 flex items-center justify-center mx-auto mb-6"
          >
            <Rocket className="w-8 h-8 text-accent" />
          </motion.div>

          <h2
            id="complete-title"
            className="text-2xl font-bold text-primary-text mb-3 font-[family-name:var(--font-space-grotesk)]"
          >
            You&apos;re Ready To Start 🚀
          </h2>
          <p className="text-secondary-text text-sm leading-relaxed mb-8">
            You now know how to upload documents, understand risks, use Lexi, and navigate TrustLens.
          </p>

          <div className="flex flex-col gap-3">
            <Button size="lg" asChild onClick={handleClose}>
              <Link href="/dashboard/upload">
                <Upload className="w-4 h-4" />
                Upload First Document
              </Link>
            </Button>
            <Button size="lg" variant="outline" onClick={handleClose}>
              <LayoutDashboard className="w-4 h-4" />
              Explore Dashboard
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
