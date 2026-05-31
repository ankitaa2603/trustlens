import Link from "next/link";
import { Shield } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Demo Mode", href: "/demo" },
    { label: "Pricing", href: "#faq" },
  ],
  Company: [
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
    { label: "FAQ", href: "#faq" },
    { label: "Blog", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/privacy" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center">
                <Shield className="w-4 h-4 text-accent" />
              </div>
              <span className="font-bold text-primary-text font-[family-name:var(--font-space-grotesk)]">
                TRUSTLENS <span className="text-accent">AI</span>
              </span>
            </Link>
            <p className="text-sm text-secondary-text leading-relaxed">
              Know What You&apos;re Signing. Legal document intelligence for everyone.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-primary-text text-sm mb-4 font-[family-name:var(--font-space-grotesk)]">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-secondary-text hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} TrustLens AI. All rights reserved.
          </p>
          <p className="text-sm text-muted">
            Built with precision. Designed for trust.
          </p>
        </div>
      </div>
    </footer>
  );
}
