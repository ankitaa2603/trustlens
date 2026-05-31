import { DocumentAnalysis } from "@/types";

export const DEMO_DOCUMENTS: DocumentAnalysis[] = [
  {
    id: "demo-internship",
    documentName: "TechNova Solutions — Internship Offer Letter",
    documentType: "Internship Offer",
    trustScore: 62,
    riskSummary:
      "This internship offer contains several concerning clauses including broad intellectual property assignment, non-compete restrictions lasting 12 months post-internship, and ambiguous termination terms. While compensation and role details are clearly stated, the IP and confidentiality sections heavily favor the employer. We recommend negotiating IP carve-outs for personal projects and clarifying termination notice requirements before accepting.",
    hiddenClauses: [
      "Automatic conversion to full-time employment without additional negotiation",
      "Employer retains rights to all work product created during and after internship hours",
      "Non-disclosure obligations extend indefinitely beyond employment termination",
      "Mandatory arbitration clause waiving right to class action lawsuits",
      "Social media monitoring clause allowing employer review of personal accounts",
    ],
    dangerousClauses: [
      {
        id: "dc1",
        title: "Broad Intellectual Property Assignment",
        originalText:
          "Employee assigns to Company all right, title, and interest in any and all inventions, discoveries, improvements, and works of authorship conceived or developed during the term of employment, whether during or outside working hours.",
        plainEnglish:
          "The company owns everything you create — even personal projects worked on during evenings and weekends — for the entire duration of your internship.",
        riskLevel: "critical",
        category: "Intellectual Property",
      },
      {
        id: "dc2",
        title: "Post-Internship Non-Compete",
        originalText:
          "For a period of twelve (12) months following termination, Intern shall not directly or indirectly engage in any business that competes with Company within a 50-mile radius.",
        plainEnglish:
          "You cannot work for any competing company within 50 miles for a full year after your internship ends — this could severely limit your career options.",
        riskLevel: "high",
        category: "Non-Compete",
      },
      {
        id: "dc3",
        title: "At-Will Termination Without Cause",
        originalText:
          "Either party may terminate this agreement at any time, with or without cause, upon 24 hours written notice.",
        plainEnglish:
          "The company can let you go with just 24 hours notice and no reason required. You have almost no job security as an intern.",
        riskLevel: "high",
        category: "Termination",
      },
    ],
    clauseExplanations: [
      {
        id: "ce1",
        title: "Compensation Structure",
        originalText: "Intern shall receive a stipend of $3,500 per month, paid bi-weekly.",
        plainEnglish:
          "You'll be paid $3,500 monthly, split into two payments every two weeks. This is clearly defined and fair for an internship role.",
        riskLevel: "low",
        category: "Compensation",
      },
      {
        id: "ce2",
        title: "Work Schedule & Hours",
        originalText: "Standard work hours are 9:00 AM to 5:00 PM, Monday through Friday, with flexibility as approved by supervisor.",
        plainEnglish:
          "Regular 40-hour work week with potential flexibility if your supervisor approves. Standard and reasonable for an internship.",
        riskLevel: "low",
        category: "Schedule",
      },
      {
        id: "ce3",
        title: "Confidentiality Obligations",
        originalText:
          "Intern agrees to maintain strict confidentiality of all proprietary information indefinitely, even after termination of this agreement.",
        plainEnglish:
          "You must keep company secrets forever, even after leaving. While some confidentiality is normal, 'indefinitely' is unusually broad.",
        riskLevel: "medium",
        category: "Confidentiality",
      },
      {
        id: "ce4",
        title: "Mandatory Arbitration",
        originalText:
          "Any dispute arising from this agreement shall be resolved exclusively through binding arbitration in accordance with AAA rules.",
        plainEnglish:
          "You cannot sue the company in court. All disputes go to private arbitration, which typically favors employers and limits your legal options.",
        riskLevel: "high",
        category: "Legal",
      },
    ],
    negotiationSuggestions: [
      {
        id: "ns1",
        clause: "Intellectual Property Assignment",
        suggestion:
          "Request a carve-out for personal projects developed outside work hours using personal equipment, unrelated to company business.",
        priority: "high",
        impact: "Protects your side projects and portfolio work from company ownership claims.",
      },
      {
        id: "ns2",
        clause: "Non-Compete Restriction",
        suggestion:
          "Negotiate to reduce the non-compete period to 3 months or remove the geographic radius restriction entirely.",
        priority: "high",
        impact: "Ensures you can pursue career opportunities after your internship without legal risk.",
      },
      {
        id: "ns3",
        clause: "Termination Notice",
        suggestion:
          "Request a minimum 2-week notice period for termination without cause, with pro-rated stipend for the notice period.",
        priority: "medium",
        impact: "Provides financial stability and time to find alternative opportunities.",
      },
      {
        id: "ns4",
        clause: "Confidentiality Duration",
        suggestion:
          "Propose limiting confidentiality obligations to 2 years post-internship for general business information.",
        priority: "medium",
        impact: "Prevents indefinite restrictions on discussing your work experience.",
      },
    ],
    timeline: [
      {
        id: "t1",
        label: "Internship Start",
        description: "Program begins — all IP assignment clauses take effect immediately",
        riskLevel: "low",
        date: "June 1, 2026",
      },
      {
        id: "t2",
        label: "Probation Period",
        description: "First 30 days — company can terminate with 24-hour notice",
        riskLevel: "medium",
        date: "June 1 – July 1, 2026",
      },
      {
        id: "t3",
        label: "IP Assignment Active",
        description: "All work product belongs to company — including side projects",
        riskLevel: "critical",
      },
      {
        id: "t4",
        label: "Confidentiality Lock-in",
        description: "NDA obligations become permanent and indefinite",
        riskLevel: "high",
      },
      {
        id: "t5",
        label: "Internship End",
        description: "Program concludes — non-compete period begins",
        riskLevel: "medium",
        date: "August 31, 2026",
      },
      {
        id: "t6",
        label: "Non-Compete Period",
        description: "12-month restriction on working with competitors within 50 miles",
        riskLevel: "high",
        date: "Sep 2026 – Aug 2027",
      },
    ],
    clauseRelationships: [
      { from: "IP Assignment", to: "Confidentiality", relationship: "Reinforces" },
      { from: "Non-Compete", to: "Termination", relationship: "Triggered by" },
      { from: "Arbitration", to: "All Clauses", relationship: "Governs disputes for" },
    ],
    analyzedAt: "2026-05-28T10:30:00Z",
    fileSize: "245 KB",
    pageCount: 4,
  },
  {
    id: "demo-rental",
    documentName: "Metro Properties — Residential Lease Agreement",
    documentType: "Rental Agreement",
    trustScore: 48,
    riskSummary:
      "This rental agreement contains multiple tenant-unfavorable provisions including automatic rent increases of 8% annually, limited maintenance response windows, and broad landlord entry rights. The security deposit terms are vague, and early termination penalties are disproportionately high. Several clauses appear designed to limit tenant rights beyond standard lease protections.",
    hiddenClauses: [
      "Automatic 8% annual rent increase without tenant consent or negotiation",
      "Landlord may enter premises with 4-hour notice for 'inspection purposes'",
      "Tenant responsible for all appliance repairs regardless of age or condition",
      "Lease automatically renews unless 90-day written notice is provided",
      "Guest policy limits visitors to 7 consecutive days per month",
    ],
    dangerousClauses: [
      {
        id: "rd1",
        title: "Automatic Rent Escalation",
        originalText:
          "Landlord reserves the right to increase monthly rent by up to 8% annually upon lease renewal without prior tenant approval.",
        plainEnglish:
          "Your rent can go up 8% every year automatically when the lease renews — you have no say in this increase.",
        riskLevel: "critical",
        category: "Financial",
      },
      {
        id: "rd2",
        title: "Excessive Early Termination Penalty",
        originalText:
          "Early termination shall result in forfeiture of security deposit plus payment of three months' rent as liquidated damages.",
        plainEnglish:
          "If you need to break the lease early, you lose your entire security deposit AND must pay 3 extra months of rent as a penalty.",
        riskLevel: "critical",
        category: "Termination",
      },
      {
        id: "rd3",
        title: "Broad Landlord Entry Rights",
        originalText:
          "Landlord or agents may enter the premises with four (4) hours notice for inspection, showing, or maintenance at any reasonable time.",
        plainEnglish:
          "Your landlord can enter your home with just 4 hours notice for almost any reason — much less notice than most states require.",
        riskLevel: "high",
        category: "Privacy",
      },
    ],
    clauseExplanations: [
      {
        id: "re1",
        title: "Security Deposit Terms",
        originalText:
          "Tenant shall pay a security deposit of $2,400, refundable within 30 days of lease termination minus deductions for damages.",
        plainEnglish:
          "You pay $2,400 upfront as a deposit. You'll get it back within 30 days after moving out, minus any damage charges the landlord claims.",
        riskLevel: "medium",
        category: "Financial",
      },
      {
        id: "re2",
        title: "Maintenance Responsibilities",
        originalText:
          "Tenant is responsible for all minor repairs under $200 and all appliance maintenance regardless of age or condition.",
        plainEnglish:
          "You pay for any repair under $200 and ALL appliance fixes — even if the appliances are old and breaking down from normal wear.",
        riskLevel: "high",
        category: "Maintenance",
      },
      {
        id: "re3",
        title: "Auto-Renewal Clause",
        originalText:
          "This lease shall automatically renew for successive 12-month terms unless either party provides 90 days written notice.",
        plainEnglish:
          "The lease renews itself every year unless you remember to give 90 days notice. Easy to get locked in unintentionally.",
        riskLevel: "medium",
        category: "Renewal",
      },
    ],
    negotiationSuggestions: [
      {
        id: "rns1",
        clause: "Rent Increase Cap",
        suggestion:
          "Negotiate a rent increase cap tied to CPI (Consumer Price Index) instead of a flat 8% annual increase.",
        priority: "high",
        impact: "Protects you from above-market rent hikes that could make the apartment unaffordable.",
      },
      {
        id: "rns2",
        clause: "Early Termination",
        suggestion:
          "Request a reasonable early termination clause: 60-day notice plus one month's rent penalty instead of three months.",
        priority: "high",
        impact: "Provides flexibility if you need to relocate for work or personal reasons.",
      },
      {
        id: "rns3",
        clause: "Landlord Entry",
        suggestion:
          "Ask for 24-hour minimum notice for non-emergency entry, consistent with most tenant protection laws.",
        priority: "medium",
        impact: "Protects your privacy and right to quiet enjoyment of your home.",
      },
    ],
    timeline: [
      {
        id: "rt1",
        label: "Lease Signing",
        description: "Agreement executed — security deposit and first month due",
        riskLevel: "low",
        date: "July 1, 2026",
      },
      {
        id: "rt2",
        label: "Move-In Period",
        description: "Tenant assumes all maintenance responsibilities",
        riskLevel: "medium",
        date: "July 1, 2026",
      },
      {
        id: "rt3",
        label: "Auto-Renewal Trigger",
        description: "90-day notice deadline for non-renewal approaches",
        riskLevel: "high",
        date: "April 1, 2027",
      },
      {
        id: "rt4",
        label: "Rent Increase",
        description: "Automatic 8% rent increase takes effect upon renewal",
        riskLevel: "critical",
        date: "July 1, 2027",
      },
      {
        id: "rt5",
        label: "Lease End / Renewal",
        description: "Contract period ends — auto-renews unless notice given",
        riskLevel: "medium",
        date: "June 30, 2027",
      },
    ],
    clauseRelationships: [
      { from: "Auto-Renewal", to: "Rent Increase", relationship: "Enables" },
      { from: "Early Termination", to: "Security Deposit", relationship: "Forfeits" },
      { from: "Maintenance", to: "Security Deposit", relationship: "May deduct from" },
    ],
    analyzedAt: "2026-05-27T14:15:00Z",
    fileSize: "312 KB",
    pageCount: 8,
  },
  {
    id: "demo-privacy",
    documentName: "CloudSync Pro — Privacy Policy",
    documentType: "Privacy Policy",
    trustScore: 35,
    riskSummary:
      "This privacy policy grants extensive data collection and sharing rights that significantly exceed what most users would expect. The policy allows selling of personal data to third parties, indefinite data retention, and broad consent for AI training on user content. Location tracking is enabled by default, and opting out of data sharing may limit core functionality.",
    hiddenClauses: [
      "Personal data may be sold to third-party advertisers and data brokers",
      "User content may be used to train AI models without additional consent",
      "Data retention period is indefinite unless user submits formal deletion request",
      "Location data collected continuously even when app is not in active use",
      "Policy changes effective immediately upon posting — no notification required",
    ],
    dangerousClauses: [
      {
        id: "pd1",
        title: "Data Selling to Third Parties",
        originalText:
          "We may share, sell, or license your personal information, usage data, and behavioral analytics to third-party partners for marketing and commercial purposes.",
        plainEnglish:
          "The company can sell your personal information, how you use the app, and your behavior patterns to other companies for profit.",
        riskLevel: "critical",
        category: "Data Sharing",
      },
      {
        id: "pd2",
        title: "AI Training on User Content",
        originalText:
          "By using our services, you grant us a perpetual, irrevocable license to use your content, files, and communications to improve our AI systems.",
        plainEnglish:
          "Everything you upload or create in the app can be used forever to train their AI — and you can't take this permission back.",
        riskLevel: "critical",
        category: "AI & Content",
      },
      {
        id: "pd3",
        title: "Indefinite Data Retention",
        originalText:
          "We retain your personal data for as long as necessary to fulfill the purposes outlined in this policy, which may extend indefinitely.",
        plainEnglish:
          "Your data can be kept forever. There's no clear deletion timeline unless you specifically request it.",
        riskLevel: "high",
        category: "Data Retention",
      },
    ],
    clauseExplanations: [
      {
        id: "pe1",
        title: "Data Collection Scope",
        originalText:
          "We collect device identifiers, IP addresses, location data, browsing history, and interaction patterns across all connected services.",
        plainEnglish:
          "They track your device, where you are, what websites you visit, and how you interact with everything connected to their service.",
        riskLevel: "high",
        category: "Data Collection",
      },
      {
        id: "pe2",
        title: "Location Tracking",
        originalText:
          "Precise location data is collected continuously when location services are enabled, including background location access.",
        plainEnglish:
          "They track your exact location all the time, even when you're not actively using the app, if location is turned on.",
        riskLevel: "high",
        category: "Location",
      },
      {
        id: "pe3",
        title: "Policy Modification Rights",
        originalText:
          "We reserve the right to modify this policy at any time. Continued use constitutes acceptance of updated terms.",
        plainEnglish:
          "They can change the privacy rules whenever they want. If you keep using the app, you're automatically agreeing to the new terms.",
        riskLevel: "medium",
        category: "Policy Changes",
      },
    ],
    negotiationSuggestions: [
      {
        id: "pns1",
        clause: "Data Selling Opt-Out",
        suggestion:
          "Exercise your right to opt out of data selling under applicable privacy laws (CCPA/GDPR) before creating an account.",
        priority: "high",
        impact: "Prevents your personal data from being sold to advertisers and data brokers.",
      },
      {
        id: "pns2",
        clause: "AI Training Exclusion",
        suggestion:
          "Request written confirmation that your content will not be used for AI training, or choose an alternative service with clearer data practices.",
        priority: "high",
        impact: "Protects your intellectual property and personal content from being used to train AI models.",
      },
      {
        id: "pns3",
        clause: "Data Deletion Request",
        suggestion:
          "Submit a formal data deletion request immediately after closing your account to ensure data is actually removed.",
        priority: "medium",
        impact: "Ensures your data isn't retained indefinitely after you stop using the service.",
      },
    ],
    timeline: [
      {
        id: "pt1",
        label: "Account Creation",
        description: "Full data collection begins — consent granted for all listed purposes",
        riskLevel: "medium",
      },
      {
        id: "pt2",
        label: "Data Collection",
        description: "Device info, location, and usage patterns continuously tracked",
        riskLevel: "high",
      },
      {
        id: "pt3",
        label: "Data Sharing",
        description: "Personal data may be sold to third-party partners and advertisers",
        riskLevel: "critical",
      },
      {
        id: "pt4",
        label: "AI Training",
        description: "Your content and files used to improve AI systems permanently",
        riskLevel: "critical",
      },
      {
        id: "pt5",
        label: "Indefinite Retention",
        description: "Data stored indefinitely unless formal deletion request submitted",
        riskLevel: "high",
      },
      {
        id: "pt6",
        label: "Policy Changes",
        description: "Terms can change at any time without direct notification",
        riskLevel: "medium",
      },
    ],
    clauseRelationships: [
      { from: "Data Collection", to: "Data Sharing", relationship: "Feeds into" },
      { from: "Data Collection", to: "AI Training", relationship: "Sources" },
      { from: "Data Sharing", to: "Data Retention", relationship: "Extends" },
    ],
    analyzedAt: "2026-05-26T09:45:00Z",
    fileSize: "189 KB",
    pageCount: 12,
  },
];

export function getDemoDocument(id: string): DocumentAnalysis | undefined {
  return DEMO_DOCUMENTS.find((doc) => doc.id === id);
}
