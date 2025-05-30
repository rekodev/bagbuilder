import Link from 'next/link';
import { ShoppingBag, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Page } from '@/constants/page';

type Props = {
  title: string;
};

export function EmptyBagCard({ title }: Props) {
  return (
    <Card className="bg-muted w-full border-2 border-dashed shadow-none">
      <CardHeader className="pt-12 pb-4 text-center">
        <div className="bg-secondary mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
          <ShoppingBag className="h-8 w-8" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>
          Build your perfect disc golf bag by adding some discs
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-12 text-center">
        <Button asChild>
          <Link href={Page.Discs}>
            <Plus className="mr-2 h-4 w-4" />
            Browse Discs
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
