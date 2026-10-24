import type { Metadata } from "next";
import { EmergencyContent } from "@/features/safety/emergency-content";

export const metadata: Metadata = { title: "Emergency and crisis guidance" };
export default function EmergencyPage() { return <EmergencyContent />; }
