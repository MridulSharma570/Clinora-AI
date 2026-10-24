import { ShieldCheck } from "lucide-react";

export function PrivacyReminder({ chat = false }: { chat?: boolean }) {
  return (
    <aside className="privacy-reminder" aria-label="Privacy reminder">
      <ShieldCheck size={19} aria-hidden="true" />
      <p>
        <strong>Keep identifying details out.</strong> Do not add names, email addresses, phone numbers, street addresses,
        IDs, account or insurance numbers, exact birth dates, or private medical records.
        {chat ? " Your current message goes to OpenRouter only after you press Send and safety checks pass." : " This draft stays in memory unless you explicitly save the final summary."}
      </p>
    </aside>
  );
}
