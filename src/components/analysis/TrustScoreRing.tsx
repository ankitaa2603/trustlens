"use client";

import { motion } from "framer-motion";
import { getTrustScoreColor, getTrustScoreLabel, cn } from "@/lib/utils";

interface TrustScoreRingProps {
  score: number;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

export function TrustScoreRing({ score, size = "lg", animated = true }: TrustScoreRingProps) {
  const sizes = {
    sm: { container: "w-24 h-24", text: "text-2xl", label: "text-xs", stroke: 6, radius: 40 },
    md: { container: "w-36 h-36", text: "text-4xl", label: "text-sm", stroke: 8, radius: 58 },
    lg: { container: "w-48 h-48", text: "text-5xl", label: "text-base", stroke: 10, radius: 78 },
  };

  const s = sizes[size];
  const circumference = 2 * Math.PI * s.radius;
  const offset = circumference - (score / 100) * circumference;

  const getStrokeColor = () => {
    if (score >= 75) return "#16A34A";
    if (score >= 50) return "#F59E0B";
    return "#DC2626";
  };

  return (
    <div className={cn("relative flex items-center justify-center", s.container)}>
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 180 180">
        <circle
          cx="90"
          cy="90"
          r={s.radius}
          fill="none"
          stroke="#334155"
          strokeWidth={s.stroke}
        />
        <motion.circle
          cx="90"
          cy="90"
          r={s.radius}
          fill="none"
          stroke={getStrokeColor()}
          strokeWidth={s.stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={animated ? { strokeDashoffset: circumference } : { strokeDashoffset: offset }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        />
      </svg>
      <div className="text-center z-10">
        <motion.p
          className={cn("font-bold font-[family-name:var(--font-space-grotesk)]", s.text, getTrustScoreColor(score))}
          initial={animated ? { opacity: 0, scale: 0.5 } : {}}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {score}
        </motion.p>
        <p className={cn("text-secondary-text mt-0.5", s.label)}>
          {getTrustScoreLabel(score)}
        </p>
      </div>
    </div>
  );
}
