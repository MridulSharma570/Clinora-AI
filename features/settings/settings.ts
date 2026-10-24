import { z } from "zod";

export const SETTINGS_STORAGE_KEY = "clinora.settings.v1";

export const settingsSchema = z.strictObject({
  theme: z.enum(["dark", "light"]),
  contrast: z.enum(["standard", "high"]),
  emergencyNumber: z.string().trim().max(24).regex(/^[0-9+()\s.-]*$/),
});

export type LocalSettings = z.infer<typeof settingsSchema>;

export const defaultSettings: LocalSettings = {
  theme: "dark",
  contrast: "standard",
  emergencyNumber: process.env.NEXT_PUBLIC_DEFAULT_EMERGENCY_NUMBER?.trim() ?? "",
};

export function parseSettings(value: string | null): LocalSettings {
  if (!value) return defaultSettings;
  try {
    const parsed = settingsSchema.safeParse(JSON.parse(value));
    return parsed.success ? parsed.data : defaultSettings;
  } catch {
    return defaultSettings;
  }
}
