'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useTransition,
  ReactNode,
  useMemo,
  useCallback
} from 'react';
import { Disc } from '@/types/disc';
import { getBagDiscsAction } from '@/lib/action';
import { authClient } from '@/lib/auth-client';

interface DiscsContextType {
  discs: Array<Disc>;
  bagDiscs: Array<Disc>;
  updateBagDiscs: (newDiscs: Array<Disc>) => void;
  discTypes: Array<string>;
  discManufacturers: Array<string>;
  loading: boolean;
  error: string | null;
  refreshDiscs: () => void;
}

const DiscsContext = createContext<DiscsContextType | undefined>(undefined);

export function DiscsContextProvider({ children }: { children: ReactNode }) {
  const { data } = authClient.useSession();
  const [discs, setDiscs] = useState<Array<Disc>>([]);
  const [bagDiscs, setBagDiscs] = useState<Array<Disc>>([]);
  const [isLoading, setIsLoading] = useState(true);
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

  const updateBagDiscs = (newDiscs: Array<Disc>) => setBagDiscs(newDiscs);

  const getDiscData = async () => {
    startTransition(async () => {
      try {
        setError(null);
        setIsLoading(true);

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
        setIsLoading(false);
      }
    });
  };

  const fetchBagDiscs = useCallback(() => {
    startTransition(async () => {
      if (!data?.user.id || !discs.length) return;

      const response = await getBagDiscsAction(data.user.id);

      if (response.error) return;

      const bag = response.data;

      const matchedDiscs = bag.map((disc) => {
        const foundDisc = discs.find((d) => d.id === disc.discId);
        if (!foundDisc) return null;

        return foundDisc;
      });
      setBagDiscs(matchedDiscs.filter((disc) => !!disc));
    });
  }, [discs, data?.user.id]);

  const refreshDiscs = () => {
    getDiscData();
  };

  useEffect(() => {
    getDiscData();
  }, []);

  useEffect(() => {
    fetchBagDiscs();
  }, [fetchBagDiscs]);

  const value: DiscsContextType = {
    discs,
    bagDiscs,
    updateBagDiscs,
    discTypes,
    discManufacturers,
    loading: isLoading || isPending,
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
