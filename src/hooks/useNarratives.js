import { useState, useEffect, useCallback } from 'react';
import { narrativeData as mockData } from '../data/mockNarratives';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const API_URL = `${BASE_URL}/api/narratives`;
const POLL_INTERVAL = 30_000; // Poll every 30s for updates

export function useNarratives() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();

      // If backend has real data, use it; otherwise fall back to mock
      if (json.ai_narrative_hunter?.length > 0) {
        setData(json);
        setError(null);
      } else if (json.status === 'initializing' || json.status === 'fetching' || json.status === 'analyzing') {
        // Backend is loading, keep mock data but show status
        if (!data) {
          setData({ ...mockData, status: json.status });
        } else {
          setData(prev => ({ ...prev, status: json.status }));
        }
      } else {
        // Fallback to mock
        if (!data || data.ai_narrative_hunter?.length === 0) {
          setData({ ...mockData, status: 'mock' });
        }
      }
    } catch {
      // API not available, use mock data
      if (!data) {
        setData({ ...mockData, status: 'offline' });
      }
      setError('Backend offline, showing demo data');
    } finally {
      setLoading(false);
    }
  }, [data]);

  const refresh = useCallback(async () => {
    try {
      await fetch(`${BASE_URL}/api/refresh`, { method: 'POST' });
      // Will pick up new data on next poll
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchData]);

  return { data, loading, error, refresh };
}
