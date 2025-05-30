'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader, Sparkles } from 'lucide-react';

import AIRecommendationDiscCard from '@/components/ai-recommendation-disc-card';
import DiscCard from '@/components/disc-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EmptyBagCard } from '@/components/empty-bag-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProgressBar } from '@/components/progress-bar';

import {
  getAiDiscRecommendationsAction,
  removeFromBagAction
} from '@/lib/action';
import { useDiscsContext } from '@/contexts/discs-context';
import { useToast } from '@/hooks/use-toast';
import { isDiscGolfSet } from '@/lib/utils';
import { AiDiscRecommendation } from '@/types/disc';

export default function MyBagPage() {
  const { toast } = useToast();
  const { discs, bagDiscs, updateBagDiscs, discTypes, loading } =
    useDiscsContext();

  const [aiRecommendations, setAiRecommendations] = useState<
    Array<AiDiscRecommendation>
  >([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const aiRecommendationsSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!showRecommendations) return;

    aiRecommendationsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [showRecommendations]);

  const removeFromBag = async (discId: string) => {
    const response = await removeFromBagAction({ userId: 2, discId });
    const removedDisc = bagDiscs.find((disc) => disc.id === discId);

    if (response.error || !removedDisc) {
      toast({
        title: 'Unable to Remove Disc',
        description:
          'We were unable to remove the disc from your bag. Please try again.'
      });
      return;
    }

    const newDiscs = bagDiscs.toSpliced(bagDiscs.indexOf(removedDisc), 1);

    updateBagDiscs(newDiscs);
    toast({
      title: 'Disc removed',
      description: `${removedDisc.name} has been removed from your bag.`
    });
  };

  const getAIRecommendations = async () => {
    setIsAnalyzing(true);
    const response = await getAiDiscRecommendationsAction(bagDiscs);
    setIsAnalyzing(false);

    if (!response.ok || !Array.isArray(response.recommendations)) {
      toast({
        title: 'AI Analysis Failed',
        description:
          'We were unable to analyze your bag. Please try again later.'
      });
      return;
    }

    setAiRecommendations(response.recommendations);
    setShowRecommendations(true);
    toast({
      title: 'AI Analysis Complete',
      description: "We've analyzed your bag and found some recommendations."
    });
  };

  const renderBagDiscs = (type?: string) => {
    if (loading) return <ProgressBar />;
    if (type && !bagDiscs.filter((disc) => disc.category === type).length)
      return (
        <EmptyBagCard
          title={`You don't have any ${type.toLowerCase()} ${isDiscGolfSet(type) ? '' : 'discs'} in your bag`}
        />
      );
    if (!bagDiscs.length) return <EmptyBagCard title="Your bag is empty" />;

    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {bagDiscs.map((disc) => {
          if (type && disc.category !== type) return null;

          return (
            <DiscCard
              key={disc.id}
              disc={disc}
              isInBag
              onRemove={removeFromBag}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">My Disc Bag</h1>
          <p className="text-secondary-foreground">
            Manage your disc collection and get AI-powered recommendations.
          </p>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            {discTypes.map((type) => {
              const amountOfCertainTypeInBag = bagDiscs.filter(
                (disc) => disc.category === type
              ).length;

              if (amountOfCertainTypeInBag === 0) return null;

              return (
                <Badge
                  key={type}
                  variant="outline"
                  className="bg-primary-foreground text-sm"
                >
                  {amountOfCertainTypeInBag} {type}
                </Badge>
              );
            })}
          </div>
          <Button disabled={isAnalyzing} onClick={getAIRecommendations}>
            {isAnalyzing ? (
              <span className="flex items-center gap-2">
                <Loader className="h-4 w-4 animate-spin" /> Analyzing
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" /> Analyze My Bag
              </span>
            )}
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="h-10 w-full overflow-x-scroll rounded-sm">
            <TabsList className="grid min-w-max grid-cols-8">
              <TabsTrigger value="all">All</TabsTrigger>
              {discTypes.map((type) => (
                <TabsTrigger key={type} value={type}>
                  {type}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <TabsContent value="all" className="mt-6">
            {renderBagDiscs()}
          </TabsContent>
          {discTypes.map((type) => (
            <TabsContent key={type} value={type} className="mt-6">
              {renderBagDiscs(type)}
            </TabsContent>
          ))}
        </Tabs>

        {showRecommendations && (
          <div
            ref={aiRecommendationsSectionRef}
            id="ai-recommendations"
            className="mt-8"
          >
            <div className="mb-6 flex flex-col space-y-2">
              <h2 className="flex items-center text-2xl font-bold tracking-tight">
                <Sparkles className="text-primary mr-2 h-5 w-5" />
                AI Recommendations
              </h2>
              <p className="text-secondary-foreground">
                Based on our analysis of your current bag, here are some discs
                that would complement your collection.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {aiRecommendations.map((recommendation) => {
                const recommendedDisc = discs.find((disc) =>
                  disc.name.includes(recommendation.name)
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
