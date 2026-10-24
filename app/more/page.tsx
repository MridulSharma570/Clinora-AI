import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Info, LifeBuoy, Scale, Settings } from "lucide-react";
import { GlassCard, Badge } from "@/components/ui/card";

export const metadata: Metadata = { title: "More" };

const links = [
  { href: "/learn", title: "Learn", description: "Original guides for appointments, timelines, privacy, and AI limits.", icon: BookOpen },
  { href: "/emergency", title: "Emergency", description: "Immediate emergency and crisis guidance, always available.", icon: LifeBuoy, emergency: true },
  { href: "/settings", title: "Settings", description: "Theme, contrast, local emergency number, and data deletion.", icon: Settings },
  { href: "/about", title: "About", description: "What Clinora AI is, is not, and how its boundaries work.", icon: Info },
  { href: "/legal", title: "Legal", description: "Terms, privacy, medical safety, AI transparency, and licenses.", icon: Scale },
];

export default function MorePage() {
  return (
    <div className="content-wrap">
      <header className="page-header"><div><p className="eyebrow">More from Clinora AI</p><h1 className="page-title">Resources & controls.</h1><p className="page-description">Learn, adjust your local experience, understand the project, or reach emergency guidance directly.</p></div><Badge>Five destinations</Badge></header>
      <div className="more-grid">
        {links.map((item) => {
          const Icon = item.icon;
          return (
            <GlassCard className="knowledge-card more-card" key={item.href}>
              <div className={item.emergency ? "icon-tile" : "icon-tile"} style={item.emergency ? { background: "var(--emergency-bg)", color: "var(--emergency-text)", borderColor: "rgba(255,180,162,.25)" } : undefined}><Icon size={22} aria-hidden="true" /></div>
              <h2>{item.title}</h2><p>{item.description}</p>
              <Link href={item.href} className="knowledge-card-footer"><span>Open {item.title}</span><ArrowUpRight size={16} aria-hidden="true" /></Link>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
