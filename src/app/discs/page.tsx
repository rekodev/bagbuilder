'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';

import { useDiscsContext } from '@/contexts/discs-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import DiscCard from '@/components/disc-card';
import DiscPagination from '@/components/disc-pagination';
import { ProgressBar } from '@/components/progress-bar';

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 20;
const DEFAULT_SPEED_RANGE = [1, 14];

export default function DiscsPage() {
  const { loading, discs, bagDiscs, discTypes, discManufacturers } =
    useDiscsContext();

  const [filterManufacturer, setFilterManufacturer] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [speedRange, setSpeedRange] = useState(DEFAULT_SPEED_RANGE);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [perPage, setPerPage] = useState(DEFAULT_PER_PAGE);

  const filteredDiscs = useMemo(
    () =>
      discs.filter((disc) => {
        const matchesSearch =
          disc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          disc.brand.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesManufacturer =
          filterManufacturer === 'all' || disc.brand === filterManufacturer;

        const matchesType =
          filterType === 'all' || disc.category === filterType;

        const matchesSpeed =
          Number(disc.speed) >= speedRange[0] &&
          Number(disc.speed) <= speedRange[1];

        return (
          matchesSearch && matchesManufacturer && matchesType && matchesSpeed
        );
      }),
    [searchTerm, discs, filterManufacturer, filterType, speedRange]
  );

  const bagDiscIds = useMemo(
    () => new Set(bagDiscs.map((disc) => disc.id)),
    [bagDiscs]
  );

  const handleReset = () => {
    setPage(DEFAULT_PAGE);
    setPerPage(DEFAULT_PER_PAGE);
    setSpeedRange(DEFAULT_SPEED_RANGE);
    setSearchTerm('');
    setFilterType('all');
    setFilterManufacturer('all');
  };

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

        {/* Search and Filters */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="relative md:col-span-2">
            <Search className="absolute top-2.5 left-2.5 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search discs..."
              className="bg-primary-foreground pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select
            value={filterManufacturer}
            onValueChange={setFilterManufacturer}
          >
            <SelectTrigger className="bg-primary-foreground">
              <SelectValue placeholder="Manufacturer" />
            </SelectTrigger>
            <SelectContent className="h-96 max-h-96 overflow-y-scroll">
              <SelectItem value="all">All Manufacturers</SelectItem>
              {discManufacturers.map((manufacturer) => (
                <SelectItem key={manufacturer} value={manufacturer}>
                  {manufacturer}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="bg-primary-foreground">
              <SelectValue placeholder="Disc Type" />
            </SelectTrigger>
            <SelectContent className="max-h-96 overflow-y-scroll">
              <SelectItem value="all">All Types</SelectItem>
              {discTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium">
              Speed Range: {speedRange[0]} - {speedRange[1]}
            </span>
            <div className="flex items-center gap-1">
              <p className="min-w-16 text-sm font-medium">Per Page:</p>
              <Select
                value={String(perPage)}
                onValueChange={(value) => setPerPage(Number(value))}
              >
                <SelectTrigger className="bg-primary-foreground">
                  <SelectValue placeholder="Select Per Page" />
                </SelectTrigger>
                <SelectContent className="max-h-96 overflow-y-scroll">
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="40">40</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="ghost" size="sm" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </div>
          <Slider
            defaultValue={DEFAULT_SPEED_RANGE}
            min={DEFAULT_SPEED_RANGE[0]}
            max={DEFAULT_SPEED_RANGE[1]}
            step={1}
            value={speedRange}
            onValueChange={setSpeedRange}
          />
        </div>

        {/* Results */}
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
