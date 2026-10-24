import type { Metadata } from "next";
import { HistoryManager } from "@/features/history/history-manager";

export const metadata: Metadata = { title: "Local-only history" };
export default function HistoryPage() { return <HistoryManager />; }
