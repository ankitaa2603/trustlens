export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const FAQS: FAQ[] = [
  {
    id: "faq1",
    question: "What is TrustLens AI and how does it work?",
    answer:
      "TrustLens AI is a legal document intelligence platform that uses advanced AI to analyze contracts, agreements, and policies. Simply upload your document, and our AI engine extracts clauses, identifies risks, generates a trust score, and explains everything in plain English — so you know exactly what you're signing.",
    category: "General",
  },
  {
    id: "faq2",
    question: "What types of documents can I analyze?",
    answer:
      "TrustLens supports internship offers, employment contracts, rental agreements, privacy policies, insurance documents, terms & conditions, NDAs, service agreements, and most other legal documents in PDF, DOCX, or TXT format.",
    category: "General",
  },
  {
    id: "faq3",
    question: "How is the Trust Score calculated?",
    answer:
      "Our Trust Score (0-100) evaluates document fairness based on clause analysis, hidden risk detection, one-sided terms, legal enforceability, and industry standards. Scores above 75 indicate generally fair documents, while scores below 50 suggest significant concerns requiring careful review.",
    category: "Features",
  },
  {
    id: "faq4",
    question: "Is my document data secure and private?",
    answer:
      "Absolutely. We use enterprise-grade encryption for all uploads and storage. Documents are processed securely and never shared with third parties. You can delete your analysis history at any time from your account settings.",
    category: "Security",
  },
  {
    id: "faq5",
    question: "Can I use TrustLens without creating an account?",
    answer:
      "Yes! Our Demo Mode lets you explore the full platform with pre-analyzed sample documents — no signup required. For analyzing your own documents, a free account gives you access to upload, analysis, and report features.",
    category: "General",
  },
  {
    id: "faq6",
    question: "Does TrustLens provide legal advice?",
    answer:
      "TrustLens AI provides document analysis and educational insights, not legal advice. Our analysis helps you understand documents better, but we always recommend consulting a qualified attorney for important legal decisions.",
    category: "Legal",
  },
  {
    id: "faq7",
    question: "What is the Trust Timeline feature?",
    answer:
      "Trust Timeline is our unique visualization that maps key events and obligations throughout your document's lifecycle — from contract start to termination. It highlights risky milestones so you can see when specific clauses take effect.",
    category: "Features",
  },
  {
    id: "faq8",
    question: "Who is Lexi and what can she help with?",
    answer:
      "Lexi is your AI-powered assistant built into TrustLens. She can explain trust scores, clarify legal clauses, guide you through the platform, answer FAQs, help with document uploads, and provide negotiation suggestions — all through natural conversation.",
    category: "Features",
  },
  {
    id: "faq9",
    question: "How accurate is the AI analysis?",
    answer:
      "Our AI achieves high accuracy on standard legal document types, trained on thousands of contract patterns. However, complex or highly specialized documents may require human review. We continuously improve our models based on user feedback.",
    category: "Features",
  },
  {
    id: "faq10",
    question: "Can I download analysis reports?",
    answer:
      "Yes. Every analysis generates a comprehensive report you can download as PDF. Reports include trust scores, risk summaries, clause explanations, negotiation suggestions, and the Trust Timeline visualization.",
    category: "Features",
  },
  {
    id: "faq11",
    question: "What are negotiation suggestions?",
    answer:
      "When TrustLens identifies unfavorable clauses, it generates specific, actionable negotiation points you can use when discussing terms with the other party. Each suggestion includes priority level and expected impact.",
    category: "Features",
  },
  {
    id: "faq12",
    question: "Is there a file size limit for uploads?",
    answer:
      "Free accounts can upload documents up to 10MB. Supported formats are PDF, DOCX, and TXT. For larger documents or batch processing, contact us about enterprise plans.",
    category: "General",
  },
  {
    id: "faq13",
    question: "How do I sign up with Google?",
    answer:
      "Click 'Sign Up' or 'Log In' and select 'Continue with Google'. Your account, profile, and workspace are created automatically. No separate verification needed — you'll land on your dashboard immediately.",
    category: "Account",
  },
  {
    id: "faq14",
    question: "Can I analyze documents in languages other than English?",
    answer:
      "Currently, TrustLens is optimized for English-language documents. Support for Spanish, French, and German is on our roadmap for Q3 2026.",
    category: "General",
  },
  {
    id: "faq15",
    question: "What happens to my data if I delete my account?",
    answer:
      "When you delete your account, all personal data, uploaded documents, and analysis history are permanently removed from our servers within 30 days, in compliance with GDPR and CCPA requirements.",
    category: "Security",
  },
  {
    id: "faq16",
    question: "How much does TrustLens cost?",
    answer:
      "TrustLens offers a free tier with 5 document analyses per month. Pro plans starting at $19/month include unlimited analyses, priority processing, advanced reports, and API access for teams.",
    category: "Pricing",
  },
  {
    id: "faq17",
    question: "Can teams or organizations use TrustLens?",
    answer:
      "Yes. Our Enterprise plan supports team workspaces, shared analysis libraries, role-based access, SSO integration, and dedicated support. Contact our sales team for custom pricing.",
    category: "Pricing",
  },
];
