"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { TimelineEvent, RiskLevel } from "@/types";
import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrustTimelineProps {
  events: TimelineEvent[];
}

const riskConfig: Record<
  RiskLevel,
  { color: string; bg: string; border: string; icon: ReactNode }
> = {
  low: {
    color: "text-success",
    bg: "bg-success/10",
    border: "border-success/30",
    icon: <CheckCircle className="w-4 h-4 text-success" />,
  },
  medium: {
    color: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning/30",
    icon: <Info className="w-4 h-4 text-warning" />,
  },
  high: {
    color: "text-danger",
    bg: "bg-danger/10",
    border: "border-danger/30",
    icon: <AlertTriangle className="w-4 h-4 text-danger" />,
  },
  critical: {
    color: "text-danger",
    bg: "bg-danger/20",
    border: "border-danger/50",
    icon: <XCircle className="w-4 h-4 text-danger" />,
  },
};

export function TrustTimeline({ events }: TrustTimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
      <div className="space-y-0">
        {events.map((event, index) => {
          const config = riskConfig[event.riskLevel];
          const isLast = index === events.length - 1;

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex gap-4 pb-8"
            >
              <div
                className={cn(
                  "relative z-10 flex-shrink-0 w-12 h-12 rounded-xl border-2 flex items-center justify-center",
                  config.bg,
                  config.border
                )}
              >
                {config.icon}
              </div>

              <div className={cn("flex-1 pt-1", isLast && "pb-0")}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-semibold text-primary-text text-sm font-[family-name:var(--font-space-grotesk)]">
                      {event.label}
                      {(event.riskLevel === "high" || event.riskLevel === "critical") && (
                        <span className="ml-2 text-xs text-danger font-normal">⚠</span>
                      )}
                    </h4>
                    {event.date && (
                      <p className="text-xs text-accent mt-0.5">{event.date}</p>
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-xs px-2 py-0.5 rounded-full capitalize flex-shrink-0",
                      config.bg,
                      config.color,
                      "border",
                      config.border
                    )}
                  >
                    {event.riskLevel}
                  </span>
                </div>
                <p className="text-sm text-secondary-text mt-1.5 leading-relaxed">
                  {event.description}
                </p>
              </div>

              {!isLast && (
                <div className="absolute left-[23px] top-12 w-0.5 h-8 bg-gradient-to-b from-border to-transparent" />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
