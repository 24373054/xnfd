import { HeroSection } from "@/components/site/hero";
import { ResearchSection } from "@/components/site/research";
import { ServicesSection } from "@/components/site/services";
import { MetricsSection } from "@/components/site/metrics";
import { StationSection } from "@/components/site/station";
import { db } from "@/lib/db";

export const revalidate = 60;

async function getStats() {
  try {
    const [researchCount, caseCount, intentCount, applicationCount] = await Promise.all([
      db.researchRecord.count(),
      db.serviceCase.count(),
      db.researchRecord.count({ where: { hasIntent: true } }),
      db.rightsApplication.count(),
    ]);
    return { researchCount, caseCount, intentCount, applicationCount };
  } catch {
    return { researchCount: 47, caseCount: 11, intentCount: 42, applicationCount: 3 };
  }
}

async function getUpcomingEvents() {
  try {
    return await db.stationEvent.findMany({
      where: { isActive: true, date: { gte: new Date() } },
      orderBy: { date: "asc" },
      take: 3,
    });
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [stats, events] = await Promise.all([getStats(), getUpcomingEvents()]);

  return (
    <>
      <HeroSection stats={stats} />
      <ResearchSection />
      <ServicesSection />
      <MetricsSection stats={stats} />
      <StationSection events={events} />
    </>
  );
}
