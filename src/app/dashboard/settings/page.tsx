"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Bell, Shield, Palette, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { toast } from "sonner";

export default function SettingsPage() {
  const router = useRouter();
  const { restartTour } = useOnboarding();
  const [profile, setProfile] = useState({ name: "Demo User", email: "demo@trustlens.ai" });
  const [notifications, setNotifications] = useState({
    analysisComplete: true,
    weeklyReport: false,
    productUpdates: true,
    securityAlerts: true,
  });
  const [theme, setTheme] = useState("dark");

  const handleRestartTour = () => {
    restartTour();
    router.push("/dashboard");
    toast.success("Product tour restarted. Welcome back!");
  };

  const handleSave = () => {
    toast.success("Settings saved successfully.");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary-text font-[family-name:var(--font-space-grotesk)]">
          Settings
        </h1>
        <p className="text-secondary-text text-sm mt-1">
          Manage your account preferences and security settings.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-premium p-6 space-y-4"
      >
        <h2 className="font-semibold text-primary-text flex items-center gap-2 font-[family-name:var(--font-space-grotesk)]">
          <User className="w-4 h-4 text-accent" />
          Profile
        </h2>
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card-premium p-6 space-y-4"
      >
        <h2 className="font-semibold text-primary-text flex items-center gap-2 font-[family-name:var(--font-space-grotesk)]">
          <Bell className="w-4 h-4 text-accent" />
          Notifications
        </h2>
        {[
          { key: "analysisComplete", label: "Analysis complete notifications", desc: "Get notified when document analysis finishes" },
          { key: "weeklyReport", label: "Weekly summary report", desc: "Receive a weekly digest of your analyses" },
          { key: "productUpdates", label: "Product updates", desc: "News about new TrustLens features" },
          { key: "securityAlerts", label: "Security alerts", desc: "Important account security notifications" },
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm text-primary-text">{item.label}</p>
              <p className="text-xs text-muted">{item.desc}</p>
            </div>
            <Switch
              checked={notifications[item.key as keyof typeof notifications]}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, [item.key]: checked })
              }
            />
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="card-premium p-6 space-y-4"
      >
        <h2 className="font-semibold text-primary-text flex items-center gap-2 font-[family-name:var(--font-space-grotesk)]">
          <Map className="w-4 h-4 text-accent" />
          Product Tour
        </h2>
        <p className="text-sm text-secondary-text">
          Revisit the interactive walkthrough to learn about TrustLens features, Trust Scores, Lexi, and more.
        </p>
        <Button variant="outline" onClick={handleRestartTour} className="w-full sm:w-auto">
          <Map className="w-4 h-4" />
          Restart Product Tour
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card-premium p-6 space-y-4"
      >
        <h2 className="font-semibold text-primary-text flex items-center gap-2 font-[family-name:var(--font-space-grotesk)]">
          <Shield className="w-4 h-4 text-accent" />
          Security
        </h2>
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            Change Password
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Enable Two-Factor Authentication
          </Button>
          <Button variant="outline" className="w-full justify-start text-danger hover:text-danger border-danger/30 hover:border-danger/50">
            Delete Account
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card-premium p-6 space-y-4"
      >
        <h2 className="font-semibold text-primary-text flex items-center gap-2 font-[family-name:var(--font-space-grotesk)]">
          <Palette className="w-4 h-4 text-accent" />
          Theme Preferences
        </h2>
        <div className="flex gap-3">
          {["dark", "light", "system"].map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`px-4 py-2 rounded-lg text-sm capitalize border transition-colors cursor-pointer ${
                theme === t
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-secondary-text hover:border-accent/30"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted">Dark theme is currently active and recommended for TrustLens.</p>
      </motion.div>

      <Button onClick={handleSave} className="w-full sm:w-auto">
        Save Changes
      </Button>
    </div>
  );
}
