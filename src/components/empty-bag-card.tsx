import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { ShoppingBag, Plus } from 'lucide-react';

type Props = {
  title: string;
};

export function EmptyBagCard({ title }: Props) {
  return (
    <Card className="w-full border-2 border-dashed border-gray-300 bg-gray-50/50 dark:border-gray-600 dark:bg-gray-900/50">
      <CardHeader className="pt-12 pb-4 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
          <ShoppingBag className="h-8 w-8 text-gray-400" />
        </div>
        <CardTitle className="text-xl text-gray-600 dark:text-gray-300">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-500 dark:text-gray-400">
          Build your perfect disc golf bag by adding some discs
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-12 text-center">
        <Button asChild>
          <Link href="/discs">
            <Plus className="mr-2 h-4 w-4" />
            Browse Discs
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
