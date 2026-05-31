"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface SpotlightOverlayProps {
  targetId: string;
  padding?: number;
  borderRadius?: number;
}

export function SpotlightOverlay({
  targetId,
  padding = 8,
  borderRadius = 12,
}: SpotlightOverlayProps) {
  const [rect, setRect] = useState<DOMRect | null>(null);

  const updateRect = useCallback(() => {
    const el = document.getElementById(targetId);
    if (el) {
      setRect(el.getBoundingClientRect());
      el.classList.add("tour-spotlight-target");
    }
    return () => {
      el?.classList.remove("tour-spotlight-target");
    };
  }, [targetId]);

  useEffect(() => {
    const cleanup = updateRect();
    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect, true);

    const observer = new MutationObserver(updateRect);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });

    const interval = setInterval(updateRect, 300);

    return () => {
      cleanup?.();
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect, true);
      observer.disconnect();
      clearInterval(interval);
      document.getElementById(targetId)?.classList.remove("tour-spotlight-target");
    };
  }, [targetId, updateRect]);

  if (!rect) return null;

  const x = rect.left - padding;
  const y = rect.top - padding;
  const w = rect.width + padding * 2;
  const h = rect.height + padding * 2;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[110]"
        style={{ pointerEvents: "auto" }}
        aria-hidden="true"
      >
        <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }}>
          <defs>
            <mask id={`spotlight-mask-${targetId}`}>
              <rect width="100%" height="100%" fill="white" />
              <rect
                x={x}
                y={y}
                width={w}
                height={h}
                rx={borderRadius}
                ry={borderRadius}
                fill="black"
              />
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="rgba(15, 23, 42, 0.82)"
            mask={`url(#spotlight-mask-${targetId})`}
          />
        </svg>

        <div
          className="fixed inset-0 backdrop-blur-[2px]"
          style={{
            WebkitMaskImage: `url("data:image/svg+xml,${encodeURIComponent(
              `<svg xmlns='http://www.w3.org/2000/svg'><rect width='100%' height='100%' fill='white'/><rect x='${x}' y='${y}' width='${w}' height='${h}' rx='${borderRadius}' fill='black'/></svg>`
            )}")`,
            maskImage: `url("data:image/svg+xml,${encodeURIComponent(
              `<svg xmlns='http://www.w3.org/2000/svg'><rect width='100%' height='100%' fill='white'/><rect x='${x}' y='${y}' width='${w}' height='${h}' rx='${borderRadius}' fill='black'/></svg>`
            )}")`,
            pointerEvents: "none",
          }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed z-[111] pointer-events-none"
        style={{ left: x, top: y, width: w, height: h }}
      >
        <motion.div
          className="absolute inset-0 rounded-xl border-2 border-accent"
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(212, 175, 55, 0.4)",
              "0 0 0 8px rgba(212, 175, 55, 0)",
              "0 0 0 0 rgba(212, 175, 55, 0.4)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ borderRadius }}
        />
        <div
          className="absolute inset-0 rounded-xl ring-2 ring-accent/60 ring-offset-2 ring-offset-transparent"
          style={{ borderRadius }}
        />
      </motion.div>
    </>
  );
}
