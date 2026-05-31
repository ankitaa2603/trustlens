import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getTrustScoreColor(score: number): string {
  if (score >= 75) return "text-success";
  if (score >= 50) return "text-warning";
  return "text-danger";
}

export function getTrustScoreLabel(score: number): string {
  if (score >= 85) return "Excellent";
  if (score >= 75) return "Good";
  if (score >= 60) return "Moderate";
  if (score >= 40) return "Concerning";
  return "High Risk";
}
