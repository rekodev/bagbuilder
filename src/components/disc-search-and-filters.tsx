import { Search } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import useDebouncedValue from '@/hooks/use-debounced-value';
import useQueryString from '@/hooks/use-query-string';
import { useDiscsContext } from '@/contexts/discs-context';
import { DEBOUNCE_DELAY, DEFAULT_SPEED_RANGE } from '@/constants/filters';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select';
import { Input } from './ui/input';
import { Slider } from './ui/slider';
import { Button } from './ui/button';

type Props = {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  speedRange: Array<number>;
  setSpeedRange: Dispatch<SetStateAction<Array<number>>>;
  perPage: number;
  setPerPage: Dispatch<SetStateAction<number>>;
  searchTermFromParams: string;
  typeFilterFromParams: string;
  manufacturerFilterFromParams: string;
  onReset: () => void;
};

export default function DiscSearchAndFilters({
  searchTerm,
  setSearchTerm,
  speedRange,
  setSpeedRange,
  perPage,
  setPerPage,
  searchTermFromParams,
  typeFilterFromParams,
  manufacturerFilterFromParams,
  onReset
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { createQueryString } = useQueryString();
  const { discTypes, discManufacturers } = useDiscsContext();
  const debouncedSearchTerm = useDebouncedValue(searchTerm, DEBOUNCE_DELAY);

  useEffect(() => {
    if (debouncedSearchTerm === searchTermFromParams) return;

    router.push(
      `${pathname}?${createQueryString('search', debouncedSearchTerm)}`
    );
  }, [
    debouncedSearchTerm,
    createQueryString,
    pathname,
    router,
    searchTermFromParams
  ]);

  const handleChangeTypeFilter = (value: string) => {
    router.push(`${pathname}?${createQueryString('type', value)}`);
  };

  const handleChangeManufacturerFilter = (value: string) => {
    router.push(`${pathname}?${createQueryString('manufacturer', value)}`);
  };

  const handleReset = () => {
    onReset();
    handleChangeTypeFilter('all');
    handleChangeManufacturerFilter('all');
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-4">
        <div className="relative md:col-span-2">
          <Search className="absolute top-2.5 left-2.5 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search discs..."
            className="bg-primary-foreground pl-8"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
        <Select
          value={manufacturerFilterFromParams}
          onValueChange={handleChangeManufacturerFilter}
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
        <Select
          value={typeFilterFromParams}
          onValueChange={handleChangeTypeFilter}
        >
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
    </div>
  );
}
