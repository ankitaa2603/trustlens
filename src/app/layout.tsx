import type { Metadata } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "TrustLens AI — Know What You're Signing",
  description:
    "AI-powered legal document intelligence. Analyze contracts, agreements, and policies to discover hidden risks before you sign.",
  keywords: ["legal document analysis", "contract review", "trust score", "AI legal"],
  openGraph: {
    title: "TrustLens AI — Know What You're Signing",
    description: "Discover hidden risks in legal documents before you sign.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${manrope.variable} h-full`}>
      <body className="min-h-full bg-background text-primary-text antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1E293B",
              border: "1px solid #334155",
              color: "#F8FAFC",
            },
          }}
        />
      </body>
    </html>
  );
}
