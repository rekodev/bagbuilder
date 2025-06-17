'use client';

import { useState, useTransition } from 'react';
import { PlusCircle, TrashIcon } from 'lucide-react';

import { Disc } from '@/types/disc';
import { addToBagAction, removeFromBagAction } from '@/lib/action';
import { getBadgeVariant } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { useDiscsContext } from '@/contexts/discs-context';

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
import { authClient } from '@/lib/auth-client';

const MAX_BAG_SIZE = 20;

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
  const { data } = authClient.useSession();
  const { bagDiscs } = useDiscsContext();
  const [isInBag, setIsInBag] = useState(defaultIsInBag);
  const [isPending, startTransition] = useTransition();

  const userId = data?.user.id;

  const addToBag = (disc: Disc) => {
    if (bagDiscs.length >= MAX_BAG_SIZE) {
      toast({
        title: 'Unable to add disc to bag',
        description: `Your bag is full. Remove a disc from your bag before adding a new one.`
      });
      return;
    }

    startTransition(async () => {
      if (!userId) return;

      const result = await addToBagAction({ userId, discId: disc.id });

      if (result.error) {
        toast({
          title: 'Unable to add disc to bag',
          description: `Unable to add ${disc.name} to your bag. Please try again.`
        });
        return;
      }

      setIsInBag(true);
      toast({
        title: 'Disc added to bag',
        description: `${disc.name} has been added to your bag.`
      });
    });
  };

  const removeFromBag = (discId: string) => {
    startTransition(async () => {
      if (!userId) return;

      const response = await removeFromBagAction({ userId, discId });

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
          <Badge variant={getBadgeVariant(disc.category)}>
            {disc.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="mb-4 flex justify-between">
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
        <div className="bg-secondary h-2 overflow-hidden rounded-full">
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
        <div className="mt-1 text-right text-xs">{disc.stability}</div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {isInBag ? (
          <Button
            size="sm"
            className="w-full"
            disabled={isPending}
            variant="destructive"
            onClick={() =>
              onRemove ? onRemove(disc.id) : removeFromBag(disc.id)
            }
          >
            <TrashIcon className="mr-2 h-4 w-4" /> Remove from Bag
          </Button>
        ) : (
          <Button
            size="sm"
            disabled={isPending}
            className="bg-secondary-foreground w-full"
            onClick={() => addToBag(disc)}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add to Bag
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
