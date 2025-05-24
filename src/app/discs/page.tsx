"use client";

import { useState } from "react";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useDiscsContext } from "@/contexts/discs-context";
import { Disc } from "@/types/disc";

export default function DiscsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterManufacturer, setFilterManufacturer] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [speedRange, setSpeedRange] = useState([1, 14]);
  const { toast } = useToast();
  const { discs } = useDiscsContext();

  const filteredDiscs = discs.filter((disc) => {
    const matchesSearch =
      disc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disc.brand.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesManufacturer =
      filterManufacturer === "all" || disc.brand === filterManufacturer;

    const matchesType = filterType === "all" || disc.category === filterType;

    const matchesSpeed =
      Number(disc.speed) >= speedRange[0] &&
      Number(disc.speed) <= speedRange[1];

    return matchesSearch && matchesManufacturer && matchesType && matchesSpeed;
  });

  const addToBag = (disc: Disc) => {
    // TODO: Implement logic
    toast({
      title: "Disc added to bag",
      description: `${disc.name} has been added to your bag.`,
    });
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
            <SelectContent>
              <SelectItem value="all">All Manufacturers</SelectItem>
              <SelectItem value="Innova">Innova</SelectItem>
              <SelectItem value="Discraft">Discraft</SelectItem>
              <SelectItem value="Dynamic Discs">Dynamic Discs</SelectItem>
              <SelectItem value="MVP">MVP</SelectItem>
              <SelectItem value="Latitude 64">Latitude 64</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger>
              <SelectValue placeholder="Disc Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Distance Driver">Distance Driver</SelectItem>
              <SelectItem value="Fairway Driver">Fairway Driver</SelectItem>
              <SelectItem value="Midrange">Midrange</SelectItem>
              <SelectItem value="Putter">Putter</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              Speed Range: {speedRange[0]} - {speedRange[1]}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSpeedRange([1, 14])}
            >
              Reset
            </Button>
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredDiscs.map((disc) => (
            <Card key={disc.id} className="overflow-hidden">
              <CardHeader className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{disc.name}</CardTitle>
                    <CardDescription>{disc.brand}</CardDescription>
                  </div>
                  <Badge
                    variant={
                      disc.category === "Distance Driver"
                        ? "default"
                        : disc.category === "Fairway Driver"
                          ? "secondary"
                          : disc.category === "Midrange"
                            ? "outline"
                            : "destructive"
                    }
                  >
                    {disc.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex justify-between mb-4">
                  <div className="text-center">
                    <div className="text-sm text-gray-500">Speed</div>
                    <div className="text-lg font-bold">{disc.speed}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-500">Glide</div>
                    <div className="text-lg font-bold">{disc.glide}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-500">Turn</div>
                    <div className="text-lg font-bold">{disc.turn}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-500">Fade</div>
                    <div className="text-lg font-bold">{disc.fade}</div>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      disc.stability === "Overstable"
                        ? "bg-blue-500"
                        : disc.stability === "Stable"
                          ? "bg-green-500"
                          : "bg-orange-500"
                    }`}
                    style={{ width: `${(Number(disc.speed) / 14) * 100}%` }}
                  />
                </div>
                <div className="mt-1 text-xs text-right text-gray-500">
                  {disc.stability}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full" onClick={() => addToBag(disc)}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add to Bag
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
