'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useTransition,
  ReactNode,
  useMemo
} from 'react';
import { Disc } from '@/types/disc';

interface DiscsContextType {
  discs: Array<Disc>;
  discTypes: Array<string>;
  discManufacturers: Array<string>;
  loading: boolean;
  error: string | null;
  refreshDiscs: () => void;
}

const DiscsContext = createContext<DiscsContextType | undefined>(undefined);

export function DiscsContextProvider({ children }: { children: ReactNode }) {
  const [discs, setDiscs] = useState<Disc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const discTypes = useMemo(() => {
    if (!discs.length) return [];
    const discCategories = discs.map((disc) => disc.category);

    return Array.from(new Set(discCategories));
  }, [discs]);

  const discManufacturers = useMemo(() => {
    if (!discs.length) return [];
    const discBrands = discs.map((disc) => disc.brand);

    return Array.from(new Set(discBrands));
  }, [discs]);

  const getDiscData = async () => {
    startTransition(async () => {
      try {
        setError(null);
        setLoading(true);

        const response = await fetch('https://discit-api.fly.dev/disc');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Array<Disc> | undefined = await response.json();

        if (data) {
          setDiscs(data);
        }
      } catch (err) {
        console.error('Failed to fetch discs:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch discs');
      } finally {
        setLoading(false);
      }
    });
  };

  const refreshDiscs = () => {
    getDiscData();
  };

  useEffect(() => {
    getDiscData();
  }, []);

  const value: DiscsContextType = {
    discs,
    discTypes,
    discManufacturers,
    loading: loading || isPending,
    error,
    refreshDiscs
  };

  return (
    <DiscsContext.Provider value={value}>{children}</DiscsContext.Provider>
  );
}

export function useDiscsContext() {
  const context = useContext(DiscsContext);
  if (context === undefined) {
    throw new Error(
      'useDiscsContext must be used within a DiscsContextProvider'
    );
  }
  return context;
}
