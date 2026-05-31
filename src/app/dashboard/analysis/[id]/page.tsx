import { AnalysisPageClient } from "./AnalysisPageClient";

interface AnalysisPageProps {
  params: Promise<{ id: string }>;
}

export default async function AnalysisPage({ params }: AnalysisPageProps) {
  const { id } = await params;
  return <AnalysisPageClient id={id} />;
}
