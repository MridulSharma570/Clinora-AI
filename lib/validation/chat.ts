import { z } from "zod";

export const chatRequestSchema = z.strictObject({
  message: z.string().trim().min(1).max(2_000),
  consentConfirmed: z.boolean(),
  adultConfirmed: z.boolean(),
});

export type ChatRequestInput = z.infer<typeof chatRequestSchema>;

export const chatStatusSchema = z.strictObject({ configured: z.boolean() });

export const MAX_CHAT_MESSAGE_LENGTH = 2_000;
