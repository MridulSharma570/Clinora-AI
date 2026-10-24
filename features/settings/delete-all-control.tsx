"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useApp } from "@/components/layout/app-provider";
import { Button } from "@/components/ui/button";
import { deleteAllLocalData } from "@/lib/storage/delete-all";

export function DeleteAllControl({ onDeleted }: { onDeleted?: () => void | Promise<void> }) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState("");
  const { resetLocalState } = useApp();

  const deleteAll = async () => {
    setDeleting(true);
    setMessage("");
    const result = await deleteAllLocalData();
    resetLocalState();
    await onDeleted?.();
    setDeleting(false);
    setConfirming(false);
    setMessage(
      result.success
        ? "Local history, consent, settings, and available Clinora cache data were deleted. Third-party data already sent cannot be retracted here."
        : `Some data could not be deleted: ${result.failures.join(", ")}. Close other Clinora tabs and try again.`,
    );
  };

  return (
    <div>
      {!confirming ? (
        <Button variant="emergency" onClick={() => { setConfirming(true); setMessage(""); }}><Trash2 size={17} aria-hidden="true" /> Delete All Local Data</Button>
      ) : (
        <div className="confirm-panel" role="group" aria-label="Confirm deletion of all local data">
          <p><strong>Delete all Clinora AI data on this browser?</strong> This removes saved history, consent, settings, and feasible app caches. It cannot be undone and cannot retract data already sent to OpenRouter.</p>
          <div className="confirm-actions">
            <Button variant="emergency" onClick={deleteAll} disabled={deleting}>{deleting ? "Deleting…" : "Yes, delete all local data"}</Button>
            <Button variant="secondary" onClick={() => setConfirming(false)} disabled={deleting}>Cancel</Button>
          </div>
        </div>
      )}
      <div aria-live="polite">{message && <p className="small muted" style={{ marginTop: 14 }}>{message}</p>}</div>
    </div>
  );
}
