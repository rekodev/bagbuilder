import { PlusCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

import { Disc } from "@/types/disc";
import { toast } from "@/hooks/use-toast";

type Props = {
  disc: Disc;
};

export default function DiscCard({ disc }: Props) {
  const addToBag = (disc: Disc) => {
    // TODO: Implement logic
    toast({
      title: "Disc added to bag",
      description: `${disc.name} has been added to your bag.`,
    });
  };

  return (
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
  );
}
