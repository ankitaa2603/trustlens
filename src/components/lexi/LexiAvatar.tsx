"use client";

import { motion } from "framer-motion";

interface LexiAvatarProps {
  size?: "sm" | "md" | "lg";
  blinking?: boolean;
  className?: string;
}

export function LexiAvatar({ size = "md", blinking = true, className = "" }: LexiAvatarProps) {
  const sizes = {
    sm: { container: "w-10 h-10", eye: "w-1.5 h-2", pupil: "w-1 h-1" },
    md: { container: "w-14 h-14", eye: "w-2 h-2.5", pupil: "w-1.5 h-1.5" },
    lg: { container: "w-20 h-20", eye: "w-2.5 h-3", pupil: "w-2 h-2" },
  };

  const s = sizes[size];

  return (
    <div className={`relative ${s.container} ${className}`}>
      <motion.div
        className="w-full h-full rounded-2xl bg-gradient-to-br from-card to-background border-2 border-accent/40 flex flex-col items-center justify-center overflow-hidden shadow-lg shadow-accent/10"
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-accent/20 to-transparent" />
        <div className="flex gap-2 items-center mt-1">
          <div className={`${s.eye} bg-accent/20 rounded-full flex items-center justify-center overflow-hidden`}>
            <motion.div
              className={`${s.pupil} bg-accent rounded-full`}
              animate={blinking ? { scaleY: [1, 1, 0.1, 1, 1] } : {}}
              transition={{ duration: 3, repeat: Infinity, times: [0, 0.9, 0.95, 1, 1] }}
            />
          </div>
          <div className={`${s.eye} bg-accent/20 rounded-full flex items-center justify-center overflow-hidden`}>
            <motion.div
              className={`${s.pupil} bg-accent rounded-full`}
              animate={blinking ? { scaleY: [1, 1, 0.1, 1, 1] } : {}}
              transition={{ duration: 3, repeat: Infinity, times: [0, 0.9, 0.95, 1, 1] }}
            />
          </div>
        </div>
        <div className="w-4 h-0.5 bg-accent/30 rounded-full mt-1.5" />
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1 h-1 rounded-full bg-accent/50"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </div>
      </motion.div>
      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-background" />
    </div>
  );
}
