import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { AiAgent } from "@/components/site/ai-agent";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#050a05]">
      <SiteNav />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <AiAgent />
    </div>
  );
}
