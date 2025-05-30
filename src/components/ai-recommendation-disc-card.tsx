import { ArrowRight, Info } from 'lucide-react';

import { Disc } from '@/types/disc';
import { getBadgeVariant } from '@/lib/utils';

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

type Props = {
  disc: Disc;
  reason: string;
};

export default function AIRecommendationDiscCard({ disc, reason }: Props) {
  return (
    <Card key={disc.id} className="flex h-full flex-col overflow-hidden">
      <CardHeader className="from-secondary to-primary-foreground bg-gradient-to-b p-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{disc.name}</CardTitle>
            <CardDescription>{disc.brand}</CardDescription>
          </div>
          <Badge variant={getBadgeVariant(disc.category)}>
            {disc.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="bg-primary-foreground flex flex-1 flex-col p-4">
        <div className="mx-4 mb-4 flex justify-between">
          <div className="text-center">
            <div className="text-sm">Speed</div>
            <div className="text-lg font-bold">{disc.speed}</div>
          </div>
          <div className="text-center">
            <div className="text-sm">Glide</div>
            <div className="text-lg font-bold">{disc.glide}</div>
          </div>
          <div className="text-center">
            <div className="text-sm">Turn</div>
            <div className="text-lg font-bold">{disc.turn}</div>
          </div>
          <div className="text-center">
            <div className="text-sm">Fade</div>
            <div className="text-lg font-bold">{disc.fade}</div>
          </div>
        </div>
        <div className="bg-secondary mt-4 flex flex-1 items-start rounded-md p-3">
          <Info className="mt-0.5 mr-2 h-5 w-5 flex-shrink-0" />
          <p className="text-sm">{reason}</p>
        </div>
      </CardContent>
      <CardFooter className="bg-primary-foreground p-4 pt-0">
        <Button className="bg-primary w-full">
          View Disc <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
