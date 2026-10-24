import { z } from "zod";
import type { VisitSummary } from "@/features/summary/generate-summary";

export const HISTORY_DATABASE_NAME = "clinora-local-history";
export const HISTORY_STORE_NAME = "saved-summaries";

export const historyEntrySchema = z.strictObject({
  id: z.string().min(1).max(100),
  createdAt: z.iso.datetime(),
  title: z.string().min(1).max(180),
  content: z.string().min(1).max(50_000),
});

export type LocalHistoryEntry = z.infer<typeof historyEntrySchema>;

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(new Error("IndexedDB is unavailable"));
      return;
    }

    const request = indexedDB.open(HISTORY_DATABASE_NAME, 1);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(HISTORY_STORE_NAME)) {
        const store = database.createObjectStore(HISTORY_STORE_NAME, { keyPath: "id" });
        store.createIndex("createdAt", "createdAt");
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(new Error("Could not open local history"));
    request.onblocked = () => reject(new Error("Local history is blocked by another tab"));
  });
}

function waitForTransaction(transaction: IDBTransaction, database: IDBDatabase): Promise<void> {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => {
      database.close();
      resolve();
    };
    transaction.onabort = () => {
      database.close();
      reject(new Error("Local history transaction was cancelled"));
    };
    transaction.onerror = () => {
      database.close();
      reject(new Error("Local history transaction failed"));
    };
  });
}

export function createHistoryEntry(summary: VisitSummary): LocalHistoryEntry {
  return historyEntrySchema.parse({
    id: globalThis.crypto.randomUUID(),
    createdAt: summary.createdAt,
    title: summary.title,
    content: summary.plainText,
  });
}

export async function saveHistoryEntry(entry: LocalHistoryEntry): Promise<void> {
  const validated = historyEntrySchema.parse(entry);
  const database = await openDatabase();
  const transaction = database.transaction(HISTORY_STORE_NAME, "readwrite");
  transaction.objectStore(HISTORY_STORE_NAME).put(validated);
  return waitForTransaction(transaction, database);
}

export async function getHistoryEntries(): Promise<LocalHistoryEntry[]> {
  const database = await openDatabase();
  const transaction = database.transaction(HISTORY_STORE_NAME, "readonly");
  const request = transaction.objectStore(HISTORY_STORE_NAME).getAll();

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      const entries = request.result
        .map((value) => historyEntrySchema.safeParse(value))
        .flatMap((result) => (result.success ? [result.data] : []))
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      resolve(entries);
    };
    request.onerror = () => reject(new Error("Could not read local history"));
    transaction.oncomplete = () => database.close();
    transaction.onerror = () => database.close();
  });
}

export async function deleteHistoryEntry(id: string): Promise<void> {
  const database = await openDatabase();
  const transaction = database.transaction(HISTORY_STORE_NAME, "readwrite");
  transaction.objectStore(HISTORY_STORE_NAME).delete(id);
  return waitForTransaction(transaction, database);
}

export async function clearHistory(): Promise<void> {
  const database = await openDatabase();
  const transaction = database.transaction(HISTORY_STORE_NAME, "readwrite");
  transaction.objectStore(HISTORY_STORE_NAME).clear();
  return waitForTransaction(transaction, database);
}

export function deleteHistoryDatabase(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      resolve();
      return;
    }
    const request = indexedDB.deleteDatabase(HISTORY_DATABASE_NAME);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(new Error("Could not delete local history database"));
    request.onblocked = () => reject(new Error("Close other Clinora AI tabs and try again"));
  });
}
