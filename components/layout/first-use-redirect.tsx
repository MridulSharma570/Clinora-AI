"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/components/layout/app-provider";
import { canUseHealthTools } from "@/features/consent/consent";

export function FirstUseRedirect() {
  const { hydrated, consent } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !canUseHealthTools(consent)) {
      router.replace("/consent?next=/dashboard");
    }
  }, [consent, hydrated, router]);

  return null;
}
