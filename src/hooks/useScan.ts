import { useState } from 'react';
import { ScanOptions, ScanResultData, APIResponse } from '@/types/scan_data';

export function useScan() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ScanResultData | null>(null);

  const executeScan = async (options: ScanOptions) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // Sesuaikan URL endpoint ini dengan server Express kamu (misal: http://localhost:5000/api/scan)
      const response = await fetch('/api/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
      });

      const json: APIResponse = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.error || 'Gagal melakukan pemindaian ke target');
      }

      if (json.data) {
        setResult(json.data);
      }
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan jaringan');
    } finally {
      setIsLoading(false);
    }
  };

  return { executeScan, isLoading, error, result };
}