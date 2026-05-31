"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Upload,
  History,
  FileText,
  Bot,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LexiAssistant } from "@/components/lexi/LexiAssistant";
import { OnboardingProvider, useOnboarding } from "@/contexts/OnboardingContext";
import { OnboardingWalkthrough } from "@/components/onboarding/OnboardingWalkthrough";
import { LexiContext } from "@/types";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard", id: "nav-dashboard" },
  { href: "/dashboard/upload", icon: Upload, label: "Upload Document", id: "nav-upload" },
  { href: "/dashboard/history", icon: History, label: "Analysis History", id: "nav-history" },
  { href: "/dashboard/reports", icon: FileText, label: "Reports", id: "nav-reports" },
  { href: "/dashboard/lexi", icon: Bot, label: "Lexi Assistant", id: "nav-lexi" },
  { href: "/dashboard/profile", icon: User, label: "Profile", id: "nav-profile" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings", id: "nav-settings" },
];

function getLexiContext(pathname: string): LexiContext {
  if (pathname.includes("/upload")) return "upload";
  if (pathname.includes("/history")) return "history";
  if (pathname.includes("/analysis")) return "analysis";
  if (pathname.includes("/dashboard") && pathname === "/dashboard") return "dashboard";
  return "default";
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <OnboardingProvider>
      <DashboardLayoutInner>{children}</DashboardLayoutInner>
    </OnboardingProvider>
  );
}

function DashboardLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const lexiContext = getLexiContext(pathname);
  const { phase, currentStep } = useOnboarding();

  useEffect(() => {
    if (phase === "tour" && currentStep >= 6) {
      setSidebarOpen(true);
      setCollapsed(false);
    }
  }, [phase, currentStep]);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 flex flex-col bg-card border-r border-border transition-all duration-300",
          collapsed ? "w-16" : "w-64",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!collapsed && (
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center">
                <Shield className="w-3.5 h-3.5 text-accent" />
              </div>
              <span className="font-bold text-sm text-primary-text font-[family-name:var(--font-space-grotesk)]">
                TRUSTLENS <span className="text-accent">AI</span>
              </span>
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1.5 rounded-lg hover:bg-border text-secondary-text hover:text-primary-text transition-colors cursor-pointer"
            aria-label="Toggle sidebar"
          >
            <ChevronLeft className={cn("w-4 h-4 transition-transform", collapsed && "rotate-180")} />
          </button>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-border text-secondary-text cursor-pointer"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                id={item.id}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group",
                  isActive
                    ? "bg-accent/10 text-accent border border-accent/20"
                    : "text-secondary-text hover:text-primary-text hover:bg-background"
                )}
              >
                <item.icon className={cn("w-4 h-4 flex-shrink-0", isActive && "text-accent")} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-secondary-text hover:text-danger hover:bg-danger/5 transition-colors"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </Link>
        </div>
      </motion.aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 border-b border-border bg-card/50 flex items-center px-4 gap-4 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-border text-secondary-text cursor-pointer"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
              <User className="w-4 h-4 text-accent" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="p-4 sm:p-6 lg:p-8"
          >
            {children}
          </motion.div>
        </main>
      </div>

      <LexiAssistant context={lexiContext} />
      <OnboardingWalkthrough />
    </div>
  );
}
