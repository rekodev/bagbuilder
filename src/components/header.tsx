'use client';

import Link from 'next/link';
import { useState } from 'react';
import { BaggageClaim, Disc, Disc2, Menu, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/theme-toggle';
import { useMobile } from '@/hooks/use-mobile';
import { Page } from '@/constants/page';

export default function Header() {
  const isMobile = useMobile();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Disc2 className="text-primary h-6 w-6" />
            <span className="text-xl font-bold">BagBuilder</span>
          </Link>

          {!isMobile && (
            <NavigationMenu className="ml-6">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <span className="flex items-center gap-1">
                      <Disc2 className="h-4 w-4" />
                      <p>Discs</p>
                    </span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="border-secondary from-secondary to-primary-foreground flex h-full w-full flex-col justify-end rounded-md border bg-gradient-to-b p-6 no-underline outline-none select-none focus:shadow-md"
                            href={Page.Discs}
                          >
                            <Disc2 className="text-secondary dark:text-secondary-foreground h-6 w-6" />
                            <div className="mt-4 mb-2 text-lg font-medium">
                              Disc Catalog
                            </div>
                            <p className="text-sm leading-tight">
                              Browse our extensive collection of disc golf discs
                              from all major manufacturers.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <Link
                          href={`${Page.Discs}?type=Distance+Driver`}
                          className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none"
                        >
                          <div className="text-sm leading-none font-medium">
                            Distance Drivers
                          </div>
                          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                            Maximum distance for long drives
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`${Page.Discs}?type=Control+Driver`}
                          className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none"
                        >
                          <div className="text-sm leading-none font-medium">
                            Control Drivers
                          </div>
                          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                            Control with good distance
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`${Page.Discs}?type=Midrange`}
                          className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none"
                        >
                          <div className="text-sm leading-none font-medium">
                            Midranges
                          </div>
                          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                            Versatile discs for mid-range shots
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`${Page.Discs}?type=Approach`}
                          className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none"
                        >
                          <div className="text-sm leading-none font-medium">
                            Approach Discs
                          </div>
                          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                            Perfect for approaching the basket
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`${Page.Discs}?type=Putter`}
                          className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none"
                        >
                          <div className="text-sm leading-none font-medium">
                            Putters
                          </div>
                          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                            Precision discs for putting and approaches
                          </p>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href={Page.MyBag}
                    className={navigationMenuTriggerStyle()}
                  >
                    <span className="flex items-center gap-1">
                      <BaggageClaim className="h-4 w-4" /> <p>My Bag</p>
                    </span>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          )}
        </div>

        <div className="flex items-center gap-2">
          {!isMobile ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={Page.Profile} className="flex w-full">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={Page.MyBag} className="flex w-full">
                      My Bag
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
                      <Disc className="text-primary h-5 w-5" />
                      <span className="text-lg font-bold">BagBuilder</span>
                    </Link>
                    <div className="mt-4 flex flex-col space-y-3">
                      <Link
                        href={Page.Discs}
                        className="hover:bg-accent flex items-center gap-2 rounded-md px-2 py-1"
                        onClick={() => setIsOpen(false)}
                      >
                        <Disc className="h-5 w-5" />
                        <span>Disc Catalog</span>
                      </Link>
                      <Link
                        href={Page.MyBag}
                        className="hover:bg-accent flex items-center gap-2 rounded-md px-2 py-1"
                        onClick={() => setIsOpen(false)}
                      >
                        <BaggageClaim className="h-5 w-5" />
                        <span>My Bag</span>
                      </Link>
                      <Link
                        href={Page.Profile}
                        className="hover:bg-accent flex items-center gap-2 rounded-md px-2 py-1"
                        onClick={() => setIsOpen(false)}
                      >
                        <User className="h-5 w-5" />
                        <span>Profile</span>
                      </Link>
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
