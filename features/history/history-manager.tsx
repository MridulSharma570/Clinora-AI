"use client";

import { useCallback, useEffect, useState } from "react";
import { Clock3, FileQuestion, LockKeyhole, Trash2 } from "lucide-react";
import { GlassLink, Button } from "@/components/ui/button";
import { GlassCard, Badge } from "@/components/ui/card";
import { DeleteAllControl } from "@/features/settings/delete-all-control";
import { deleteHistoryEntry, getHistoryEntries } from "@/lib/storage/history";
import type { LocalHistoryEntry } from "@/lib/storage/history";
import { formatLocalDate } from "@/lib/utils";

export function HistoryManager() {
  const [entries, setEntries] = useState<LocalHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const refresh = useCallback(async () => {
    try {
      setEntries(await getHistoryEntries());
    } catch {
      setMessage("Local history is unavailable in this browser. No server backup exists.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    getHistoryEntries()
      .then((savedEntries) => {
        if (!cancelled) setEntries(savedEntries);
      })
      .catch(() => {
        if (!cancelled) setMessage("Local history is unavailable in this browser. No server backup exists.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const remove = async (id: string) => {
    setMessage("");
    try {
      await deleteHistoryEntry(id);
      setEntries((current) => current.filter((entry) => entry.id !== id));
      setMessage("Saved summary deleted from this browser.");
    } catch {
      setMessage("The entry could not be deleted. Close other Clinora tabs and try again.");
    }
  };

  return (
    <div className="content-wrap">
      <header className="page-header">
        <div>
          <p className="eyebrow">This browser only</p>
          <h1 className="page-title">Your saved visit prep.</h1>
          <p className="page-description">Only summaries you explicitly saved appear here. There is no account, server history, or cloud sync.</p>
        </div>
        <Badge><LockKeyhole size={13} aria-hidden="true" /> Local-only history</Badge>
      </header>

      <div aria-live="polite">{message && <div className="status-banner" style={{ marginBottom: 18 }}><p>{message}</p></div>}</div>

      {loading ? (
        <GlassCard className="empty-state" role="status"><p>Reading explicitly saved local entries…</p></GlassCard>
      ) : entries.length === 0 ? (
        <GlassCard className="empty-state">
          <div className="icon-tile"><FileQuestion size={23} aria-hidden="true" /></div>
          <h2>No saved summaries yet</h2>
          <p>Complete a Guided Check and choose “Save to this device” if you want a summary to remain in this browser.</p>
          <GlassLink href="/check">Start Guided Check</GlassLink>
        </GlassCard>
      ) : (
        <div className="history-list">
          {entries.map((entry) => (
            <GlassCard className="history-entry" key={entry.id}>
              <article>
                <div className="history-entry-header">
                  <div>
                    <h2>{entry.title}</h2>
                    <time dateTime={entry.createdAt}><Clock3 size={13} aria-hidden="true" style={{ verticalAlign: "text-top" }} /> {formatLocalDate(entry.createdAt)}</time>
                  </div>
                  <Button variant="ghost" className="button-small" onClick={() => remove(entry.id)} aria-label={`Delete saved summary: ${entry.title}`}><Trash2 size={16} aria-hidden="true" /> Delete</Button>
                </div>
                <details className="history-content">
                  <summary>View saved content</summary>
                  <pre>{entry.content}</pre>
                </details>
              </article>
            </GlassCard>
          ))}
        </div>
      )}

      <GlassCard className="settings-card danger-zone" style={{ marginTop: 24 }}>
        <div className="settings-section">
          <h2>Clear everything on this browser</h2>
          <p>Delete saved history, consent, settings, and feasible Clinora app caches—not just the entries shown above.</p>
          <DeleteAllControl onDeleted={refresh} />
        </div>
      </GlassCard>
    </div>
  );
}
