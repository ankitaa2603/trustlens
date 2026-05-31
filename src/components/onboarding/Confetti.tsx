"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

const COLORS = ["#D4AF37", "#16A34A", "#F59E0B", "#F8FAFC", "#CBD5E1"];

export function Confetti() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    setPieces(
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 2,
        size: 4 + Math.random() * 6,
        rotation: Math.random() * 360,
      }))
    );
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute rounded-sm"
          style={{
            left: `${piece.x}%`,
            top: -20,
            width: piece.size,
            height: piece.size * 1.4,
            backgroundColor: piece.color,
          }}
          initial={{ y: -20, opacity: 1, rotate: piece.rotation }}
          animate={{
            y: "110vh",
            opacity: [1, 1, 0],
            rotate: piece.rotation + 720,
            x: [0, (Math.random() - 0.5) * 100],
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  );
}
