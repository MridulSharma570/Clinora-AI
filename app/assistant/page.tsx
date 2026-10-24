import type { Metadata } from "next";
import { ConsentGate } from "@/components/safety/consent-gate";
import { ChatExperience } from "@/features/chat/chat-experience";

export const metadata: Metadata = { title: "Ask Clinora AI" };
export default function AssistantPage() { return <ConsentGate><ChatExperience /></ConsentGate>; }
