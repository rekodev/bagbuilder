'use client';

import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

import AIRecommendationDiscCard from '@/components/ai-recommendation-disc-card';
import DiscCard from '@/components/disc-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDiscsContext } from '@/contexts/discs-context';
import { useToast } from '@/hooks/use-toast';

import { Disc } from '@/types/disc';
import { getBagDiscsAction, removeFromBagAction } from '@/lib/action';

export default function MyBagPage() {
  const { discs, discTypes } = useDiscsContext();
  const [bagDiscs, setBagDiscs] = useState<Array<Disc>>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!discs.length) return;

    const fetchBagDiscs = async () => {
      const response = await getBagDiscsAction(2);

      if (response.error) return;

      const bag = response.data;

      const matchedDiscs = bag.map((disc) => {
        const foundDisc = discs.find((d) => d.id === disc.discId);
        if (!foundDisc) return null;

        return foundDisc;
      });
      setBagDiscs(matchedDiscs.filter((disc) => !!disc));
    };

    fetchBagDiscs();
  }, [discs]);

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

    const removedDiscIndex = bagDiscs.findIndex((disc) => disc.id === discId);
    const newDiscs = bagDiscs.toSpliced(removedDiscIndex, 1);

    setBagDiscs(newDiscs);
    toast({
      title: 'Disc removed',
      description: 'Disc removed from your bag.'
    });
  };

  const getAIRecommendations = () => {
    // TODO: Implement actual logic
    setShowRecommendations(true);
    toast({
      title: 'AI Analysis Complete',
      description: "We've analyzed your bag and found some recommendations."
    });
  };

  // TODO: Remove this mock data
  const recommendations = [
    {
      name: 'Buzzz SS',
      reason:
        'Your bag lacks understable midranges for anhyzer lines and turnover shots.'
    },
    {
      name: 'Firebird',
      reason:
        'Adding an overstable fairway driver would help with headwind shots and reliable fades.'
    },
    {
      name: 'Zone',
      reason:
        'An overstable approach putter would complement your current putting lineup.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">My Disc Bag</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your disc collection and get AI-powered recommendations.
          </p>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            {discTypes.map((type) => {
              const amountOfCertainTypeInBag = bagDiscs.filter(
                (disc) => disc.category === type
              ).length;

              return (
                <Badge key={type} variant="outline" className="text-sm">
                  {amountOfCertainTypeInBag} {type}
                  {amountOfCertainTypeInBag === 1 || type.endsWith('s')
                    ? ''
                    : 's'}
                </Badge>
              );
            })}
          </div>
          <Button onClick={getAIRecommendations}>
            <Sparkles className="mr-2 h-4 w-4" /> Analyze My Bag
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="all">All</TabsTrigger>
            {discTypes.map((type) => (
              <TabsTrigger key={type} value={type}>
                {type}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {bagDiscs.map((disc) => (
                <DiscCard
                  key={disc.id}
                  disc={disc}
                  isInBag
                  onRemove={removeFromBag}
                />
              ))}
            </div>
          </TabsContent>
          {discTypes.map((type) => (
            <TabsContent key={type} value={type} className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {bagDiscs.map((disc) => {
                  if (disc.category !== type) return null;

                  return (
                    <DiscCard
                      isInBag
                      key={disc.id}
                      disc={disc}
                      onRemove={removeFromBag}
                    />
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {showRecommendations && (
          <div className="mt-8">
            <div className="mb-6 flex flex-col space-y-2">
              <h2 className="flex items-center text-2xl font-bold tracking-tight">
                <Sparkles className="mr-2 h-5 w-5 text-green-500" />
                AI Recommendations
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Based on our analysis of your current bag, here are some discs
                that would complement your collection.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recommendations.map((recommendation) => {
                const recommendedDisc = discs.find(
                  (disc) => disc.name === recommendation.name
                );

                if (!recommendedDisc) return null;

                return (
                  <AIRecommendationDiscCard
                    key={recommendedDisc.id}
                    disc={recommendedDisc}
                    reason={recommendation.reason}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
