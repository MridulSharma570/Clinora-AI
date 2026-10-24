import { deleteHistoryDatabase } from "@/lib/storage/history";

export interface DeleteAllResult {
  success: boolean;
  failures: string[];
}

async function clearClinoraStorage(storage: Storage): Promise<void> {
  const keys: string[] = [];
  for (let index = 0; index < storage.length; index += 1) {
    const key = storage.key(index);
    if (key?.startsWith("clinora.")) keys.push(key);
  }
  keys.forEach((key) => storage.removeItem(key));
}

async function clearClinoraCaches(): Promise<void> {
  if (typeof caches === "undefined") return;
  const keys = await caches.keys();
  await Promise.all(keys.filter((key) => key.startsWith("clinora")).map((key) => caches.delete(key)));
}

/** Deletes only this app's local data; it cannot retract third-party transmissions. */
export async function deleteAllLocalData(): Promise<DeleteAllResult> {
  const tasks: { label: string; run: () => Promise<void> }[] = [
    { label: "saved history", run: deleteHistoryDatabase },
  ];

  if (typeof localStorage !== "undefined") {
    tasks.push({ label: "consent and settings", run: () => clearClinoraStorage(localStorage) });
  }
  if (typeof sessionStorage !== "undefined") {
    tasks.push({ label: "temporary app data", run: () => clearClinoraStorage(sessionStorage) });
  }
  tasks.push({ label: "cached app data", run: clearClinoraCaches });

  const results = await Promise.allSettled(tasks.map((task) => task.run()));
  const failures = results.flatMap((result, index) =>
    result.status === "rejected" ? [tasks[index]?.label ?? "local data"] : [],
  );

  return { success: failures.length === 0, failures };
}
