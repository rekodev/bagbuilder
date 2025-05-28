import { ArrowRight, Info } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from './ui/card';
import { Disc } from '@/types/disc';

type Props = {
  disc: Disc;
  reason: string;
};

export default function AIRecommendationDiscCard({ disc, reason }: Props) {
  return (
    <Card
      key={disc.id}
      className="overflow-hidden border-green-200 dark:border-green-800"
    >
      <CardHeader className="bg-green-50 p-4 dark:bg-green-900/20">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{disc.name}</CardTitle>
            <CardDescription>{disc.brand}</CardDescription>
          </div>
          <Badge
            variant={
              disc.category === 'Distance Driver'
                ? 'default'
                : disc.category === 'Fairway Driver'
                  ? 'secondary'
                  : disc.category === 'Midrange'
                    ? 'outline'
                    : 'destructive'
            }
          >
            {disc.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4 flex justify-between">
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
        <div className="mt-4 flex items-start rounded-md bg-green-50 p-3 dark:bg-green-900/20">
          <Info className="mt-0.5 mr-2 h-5 w-5 flex-shrink-0 text-green-500" />
          <p className="text-sm">{reason}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="outline" className="w-full">
          View Disc <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
