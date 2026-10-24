import { beforeEach, describe, expect, it } from "vitest";
import {
  clearHistory,
  deleteHistoryDatabase,
  deleteHistoryEntry,
  getHistoryEntries,
  saveHistoryEntry,
} from "@/lib/storage/history";
import type { LocalHistoryEntry } from "@/lib/storage/history";
import { deleteAllLocalData } from "@/lib/storage/delete-all";

function entry(id: string, createdAt = "2026-10-24T12:00:00.000Z"): LocalHistoryEntry {
  return { id, createdAt, title: `Synthetic visit prep ${id}`, content: "Synthetic educational test content" };
}

describe("explicit local history storage", () => {
  beforeEach(async () => {
    await deleteHistoryDatabase();
  });

  it("saves and lists only entries passed to the explicit save function", async () => {
    expect(await getHistoryEntries()).toEqual([]);
    await saveHistoryEntry(entry("one"));
    await saveHistoryEntry(entry("two", "2026-10-24T13:00:00.000Z"));
    const entries = await getHistoryEntries();
    expect(entries.map((item) => item.id)).toEqual(["two", "one"]);
  });

  it("deletes one entry without removing others", async () => {
    await saveHistoryEntry(entry("one"));
    await saveHistoryEntry(entry("two"));
    await deleteHistoryEntry("one");
    expect((await getHistoryEntries()).map((item) => item.id)).toEqual(["two"]);
  });

  it("clears the history store", async () => {
    await saveHistoryEntry(entry("one"));
    await clearHistory();
    expect(await getHistoryEntries()).toEqual([]);
  });

  it("Delete All removes IndexedDB, consent, settings, and Clinora cache keys while preserving unrelated origin data", async () => {
    await saveHistoryEntry(entry("one"));
    localStorage.setItem("clinora.consent.v1", JSON.stringify({ accepted: true, adult: true }));
    localStorage.setItem("clinora.settings.v1", JSON.stringify({ theme: "light" }));
    localStorage.setItem("unrelated-application", "preserve");
    sessionStorage.setItem("clinora.temporary", "clear");

    const result = await deleteAllLocalData();
    expect(result.success).toBe(true);
    expect(localStorage.getItem("clinora.consent.v1")).toBeNull();
    expect(localStorage.getItem("clinora.settings.v1")).toBeNull();
    expect(sessionStorage.getItem("clinora.temporary")).toBeNull();
    expect(localStorage.getItem("unrelated-application")).toBe("preserve");
    expect(await getHistoryEntries()).toEqual([]);
  });
});
