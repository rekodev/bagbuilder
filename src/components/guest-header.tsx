'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/theme-toggle';
import { Disc2, Menu } from 'lucide-react';
import { useMobile } from '@/hooks/use-mobile';
import { useState } from 'react';
import { Page } from '@/constants/page';

export default function GuestHeader() {
  const isMobile = useMobile();
  const [isOpen, setIsOpen] = useState(false);

  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false); // Close mobile menu if open
  };

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Disc2 className="text-primary h-6 w-6" />
            <span className="text-xl font-bold">BagBuilder</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {!isMobile ? (
            <>
              <Button variant="ghost" onClick={scrollToHowItWorks}>
                How it Works
              </Button>
              <Button asChild variant="outline">
                <Link href={Page.Login}>Login</Link>
              </Button>
              <Button asChild>
                <Link href={Page.SignUp}>Sign Up</Link>
              </Button>
              <ThemeToggle />
            </>
          ) : (
            <>
              <ThemeToggle />
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <div className="flex flex-col gap-4 py-4">
                    <Link
                      href={Page.Root}
                      className="flex items-center gap-2 px-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <Disc2 className="text-primary h-5 w-5" />
                      <span className="text-lg font-bold">BagBuilder</span>
                    </Link>
                    <div className="mt-4 flex flex-col space-y-3">
                      <Button
                        variant="ghost"
                        className="justify-start"
                        onClick={scrollToHowItWorks}
                      >
                        How it Works
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="justify-start"
                        onClick={() => setIsOpen(false)}
                      >
                        <Link href={Page.Login}>Login</Link>
                      </Button>
                      <Button
                        asChild
                        className="justify-start"
                        onClick={() => setIsOpen(false)}
                      >
                        <Link href={Page.SignUp}>Sign Up</Link>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
