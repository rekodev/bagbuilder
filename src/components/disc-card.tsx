'use client';

import { useState } from 'react';
import { PlusCircle, TrashIcon } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

import { Disc } from '@/types/disc';
import { toast } from '@/hooks/use-toast';
import { addToBagAction, removeFromBagAction } from '@/lib/action';

type Props = {
  disc: Disc;
  isInBag?: boolean;
  onRemove?: (discId: string) => void;
};

export default function DiscCard({
  disc,
  isInBag: defaultIsInBag,
  onRemove
}: Props) {
  const [isInBag, setIsInBag] = useState(defaultIsInBag);

  const addToBag = async (disc: Disc) => {
    const result = await addToBagAction({ userId: 2, discId: disc.id });

    if (result.error) {
      toast({
        title: 'Unable to add disc to bag',
        description: `Unable to add ${disc.name} to your bag. Please try again,`
      });
      return;
    }

    setIsInBag(true);
    toast({
      title: 'Disc added to bag',
      description: `${disc.name} has been added to your bag.`
    });
  };

  const removeFromBag = async (discId: string) => {
    const response = await removeFromBagAction({ userId: 2, discId });

    if (response.error) {
      toast({
        title: 'Unable to remove disc',
        description:
          'We were unable to remove the disc from your bag. Please try again.'
      });
      return;
    }

    setIsInBag(false);
    toast({
      title: 'Disc removed',
      description: 'Disc removed from your bag.'
    });
  };

  return (
    <Card key={disc.id} className="overflow-hidden">
      <CardHeader className="p-4">
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
      <CardContent className="p-4 pt-0">
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
        <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
          <div
            className={`h-full ${
              disc.stability === 'Overstable'
                ? 'bg-blue-500'
                : disc.stability === 'Stable'
                  ? 'bg-green-500'
                  : 'bg-orange-500'
            }`}
            style={{ width: `${(Number(disc.speed) / 14) * 100}%` }}
          />
        </div>
        <div className="mt-1 text-right text-xs text-gray-500">
          {disc.stability}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {isInBag ? (
          <Button
            className="w-full"
            variant="secondary"
            onClick={() =>
              onRemove ? onRemove(disc.id) : removeFromBag(disc.id)
            }
          >
            <TrashIcon className="mr-2 h-4 w-4" /> Remove from Bag
          </Button>
        ) : (
          <Button className="w-full" onClick={() => addToBag(disc)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add to Bag
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
