
import { ScanHistoryItem } from "@/types/history.scan";

const STORAGE_KEY = "scancake_scan_history";

export const HistoryStorage = {
  getAll(): ScanHistoryItem[] {
    if (typeof window === "undefined") return [];

    try {
      const data = localStorage.getItem(STORAGE_KEY);

      if (!data) return [];

      const parsed = JSON.parse(data);

      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Gagal membaca scan history:", error);
      return [];
    }
  },

  save(
    newItem: Omit<ScanHistoryItem, "id" | "scannedAt">
  ): ScanHistoryItem[] {
    if (typeof window === "undefined") return [];

    try {
      const current = HistoryStorage.getAll();

      const entry: ScanHistoryItem = {
        ...newItem,
        id: crypto.randomUUID(),
        scannedAt: new Date().toLocaleString("id-ID", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
      };

      const updated = [entry, ...current];

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updated)
      );

      return updated;
    } catch (error) {
      console.error("Gagal menyimpan history:", error);
      return [];
    }
  },

  delete(id: string): ScanHistoryItem[] {
    if (typeof window === "undefined") return [];

    try {
      const current = HistoryStorage.getAll();

      const updated = current.filter(
        (item) => item.id !== id
      );

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updated)
      );

      return updated;
    } catch (error) {
      console.error("Gagal menghapus history:", error);
      return [];
    }
  },

  clearAll(): void {
    if (typeof window === "undefined") return;

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Gagal menghapus seluruh history:", error);
    }
  },
};

