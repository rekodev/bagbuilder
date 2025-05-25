"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useDiscsContext } from "@/contexts/discs-context";
import DiscCard from "@/components/disc-card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getPaginationRange } from "@/lib/utils";

export default function DiscsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterManufacturer, setFilterManufacturer] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [speedRange, setSpeedRange] = useState([1, 14]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const { loading, discs, discTypes, discManufacturers } = useDiscsContext();

  const filteredDiscs = useMemo(
    () =>
      discs.filter((disc) => {
        const matchesSearch =
          disc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          disc.brand.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesManufacturer =
          filterManufacturer === "all" || disc.brand === filterManufacturer;

        const matchesType =
          filterType === "all" || disc.category === filterType;

        const matchesSpeed =
          Number(disc.speed) >= speedRange[0] &&
          Number(disc.speed) <= speedRange[1];

        return (
          matchesSearch && matchesManufacturer && matchesType && matchesSpeed
        );
      }),
    [searchTerm, discs, filterManufacturer, filterType, speedRange],
  );

  const totalPages = Math.ceil(filteredDiscs.length / perPage);
  const paginationRange = getPaginationRange(page, totalPages);

  // keep the current page within valid bounds
  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages === 0 ? 1 : totalPages);
    }
  }, [totalPages, page]);

  const handleReset = () => {
    setPage(1);
    setPerPage(20);
    setSpeedRange([1, 14]);
    setSearchTerm("");
    setFilterType("all");
    setFilterManufacturer("all");
  };

  const renderDiscs = () => {
    if (loading) return <p>Loading...</p>;
    if (!filteredDiscs.length)
      return <p>No discs match your search keyword...</p>;

    const start = perPage * (page - 1);
    const end = start + perPage;

    return filteredDiscs
      .slice(start, end)
      .map((disc) => <DiscCard key={disc.id} disc={disc} />);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Disc Catalog</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Browse our extensive collection of disc golf discs from all major
            manufacturers.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Search discs..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select
            value={filterManufacturer}
            onValueChange={setFilterManufacturer}
          >
            <SelectTrigger>
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
            <SelectTrigger>
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
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              Speed Range: {speedRange[0]} - {speedRange[1]}
            </span>
            <div className="flex items-center gap-1">
              <p className="text-sm font-medium min-w-16">Per Page:</p>
              <Select
                value={String(perPage)}
                onValueChange={(value) => setPerPage(Number(value))}
              >
                <SelectTrigger>
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
            defaultValue={[1, 14]}
            min={1}
            max={14}
            step={1}
            value={speedRange}
            onValueChange={setSpeedRange}
          />
        </div>

        {/* Results */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8">
          {renderDiscs()}
        </div>

        {!!filteredDiscs.length && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  aria-disabled={page === 1}
                  onClick={() => {
                    if (page > 1) setPage((prev) => prev - 1);
                  }}
                />
              </PaginationItem>
              {paginationRange.map((item, index) => (
                <PaginationItem key={index}>
                  {item === "ellipsis" ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      isActive={page === item}
                      href="#"
                      onClick={() => {
                        setPage(item);
                      }}
                    >
                      {item}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  aria-disabled={page === totalPages}
                  onClick={() => {
                    if (page < totalPages) setPage((prev) => prev + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}
