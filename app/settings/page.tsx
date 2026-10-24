import type { Metadata } from "next";
import { SettingsManager } from "@/features/settings/settings-manager";

export const metadata: Metadata = { title: "Privacy and display settings" };
export default function SettingsPage() { return <SettingsManager />; }
