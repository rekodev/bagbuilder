import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Disc, ShoppingBag, Sparkles } from 'lucide-react';
import { Page } from '@/constants/page';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-50 to-green-100 py-20 dark:from-green-950 dark:to-green-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Build Your Perfect Disc Golf Bag
              </h1>
              <p className="mx-auto max-w-[700px] md:text-xl">
                Browse, organize, and optimize your disc collection with
                AI-powered recommendations.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href={Page.Discs}>
                  Browse Discs <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={Page.MyBag}>
                  My Bag <ShoppingBag className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="rounded-full bg-green-100 p-3 dark:bg-green-800">
                <Disc className="h-10 w-10 text-green-600 dark:text-green-300" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Extensive Disc Catalog</h3>
                <p>
                  Browse through thousands of discs from all major manufacturers
                  with detailed flight characteristics.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="rounded-full bg-green-100 p-3 dark:bg-green-800">
                <ShoppingBag className="h-10 w-10 text-green-600 dark:text-green-300" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Virtual Bag Builder</h3>
                <p>
                  Create and manage your disc collection with our intuitive bag
                  builder. Track your discs and organize by type.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="rounded-full bg-green-100 p-3 dark:bg-green-800">
                <Sparkles className="h-10 w-10 text-green-600 dark:text-green-300" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">AI Recommendations</h3>
                <p>
                  Get personalized disc recommendations to fill gaps in your bag
                  based on AI analysis of your current collection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                How It Works
              </h2>
              <p className="mx-auto max-w-[700px] md:text-xl">
                Three simple steps to optimize your disc golf bag
              </p>
            </div>
            <div className="mt-8 grid gap-10 sm:grid-cols-3">
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-800">
                  <span className="text-2xl font-bold text-green-600 dark:text-green-300">
                    1
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Browse Discs</h3>
                  <p>
                    Search our extensive catalog of disc golf discs from all
                    major manufacturers.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-800">
                  <span className="text-2xl font-bold text-green-600 dark:text-green-300">
                    2
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Build Your Bag</h3>
                  <p>
                    Add discs to your virtual bag and organize them by type,
                    speed, and stability.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-800">
                  <span className="text-2xl font-bold text-green-600 dark:text-green-300">
                    3
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Get AI Recommendations</h3>
                  <p>
                    Our AI analyzes your bag and suggests discs to fill gaps and
                    improve your game.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Optimize Your Bag?
              </h2>
              <p className="mx-auto max-w-[700px] md:text-xl">
                Join thousands of disc golfers who have improved their game with
                our platform.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/signup">Sign Up Free</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={Page.Discs}>Explore Discs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
