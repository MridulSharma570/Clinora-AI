import { FileQuestion } from "lucide-react";
import { GlassLink } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/card";

export default function NotFound() {
  return <div className="reading-wrap"><GlassCard className="empty-state"><div className="icon-tile"><FileQuestion size={24} aria-hidden="true" /></div><h1 className="section-heading">This page is not here.</h1><p>The route may have changed. You can return home or browse the original learning center.</p><div className="hero-actions" style={{ justifyContent: "center" }}><GlassLink href="/">Return home</GlassLink><GlassLink href="/learn" variant="secondary">Browse Learn</GlassLink></div></GlassCard></div>;
}
