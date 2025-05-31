'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { useDiscsContext } from '@/contexts/discs-context';
import DiscCard from '@/components/disc-card';
import DiscPagination from '@/components/disc-pagination';
import { ProgressBar } from '@/components/progress-bar';
import {
  DEFAULT_PAGE,
  DEFAULT_PER_PAGE,
  DEFAULT_SPEED_RANGE
} from '@/constants/filters';
import DiscSearchAndFilters from '@/components/disc-search-and-filters';

export default function DiscsPage() {
  const searchParams = useSearchParams();

  const { loading, discs, bagDiscs } = useDiscsContext();

  const searchTermFromParams = searchParams.get('search') || '';
  const typeFilterFromParams = searchParams.get('type') || 'all';
  const manufacturerFilterFromParams =
    searchParams.get('manufacturer') || 'all';

  const [searchTerm, setSearchTerm] = useState(searchTermFromParams);
  const [speedRange, setSpeedRange] = useState(DEFAULT_SPEED_RANGE);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [perPage, setPerPage] = useState(DEFAULT_PER_PAGE);

  const handleReset = () => {
    setPage(DEFAULT_PAGE);
    setPerPage(DEFAULT_PER_PAGE);
    setSpeedRange(DEFAULT_SPEED_RANGE);
    setSearchTerm('');
  };

  const filteredDiscs = useMemo(
    () =>
      discs.filter((disc) => {
        const matchesSearch =
          disc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          disc.brand.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesManufacturer =
          manufacturerFilterFromParams === 'all' ||
          disc.brand === manufacturerFilterFromParams;

        const matchesType =
          typeFilterFromParams === 'all' ||
          disc.category === typeFilterFromParams;

        const matchesSpeed =
          Number(disc.speed) >= speedRange[0] &&
          Number(disc.speed) <= speedRange[1];

        return (
          matchesSearch && matchesManufacturer && matchesType && matchesSpeed
        );
      }),
    [
      searchTerm,
      discs,
      manufacturerFilterFromParams,
      typeFilterFromParams,
      speedRange
    ]
  );

  const bagDiscIds = useMemo(
    () => new Set(bagDiscs.map((disc) => disc.id)),
    [bagDiscs]
  );

  const renderDiscs = () => {
    if (loading) return <ProgressBar />;
    if (!filteredDiscs.length)
      return <p>No discs match your search keyword...</p>;

    const start = perPage * (page - 1);
    const end = start + perPage;

    return filteredDiscs
      .slice(start, end)
      .map((disc) => (
        <DiscCard key={disc.id} disc={disc} isInBag={bagDiscIds.has(disc.id)} />
      ));
  };

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Disc Catalog</h1>
          <p>
            Browse our extensive collection of disc golf discs from all major
            manufacturers.
          </p>
        </div>
        <DiscSearchAndFilters
          onReset={handleReset}
          perPage={perPage}
          setPerPage={setPerPage}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          speedRange={speedRange}
          setSpeedRange={setSpeedRange}
          searchTermFromParams={searchTermFromParams}
          typeFilterFromParams={typeFilterFromParams}
          manufacturerFilterFromParams={manufacturerFilterFromParams}
        />
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {renderDiscs()}
        </div>
        <DiscPagination
          page={page}
          setPage={setPage}
          perPage={perPage}
          discs={filteredDiscs}
        />
      </div>
    </div>
  );
}
