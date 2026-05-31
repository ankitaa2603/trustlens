import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { UseCasesSection } from "@/components/landing/UseCasesSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { Footer } from "@/components/landing/Footer";
import { LexiAssistant } from "@/components/lexi/LexiAssistant";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <UseCasesSection />
        <AboutSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
      <LexiAssistant context="default" />
    </>
  );
}
