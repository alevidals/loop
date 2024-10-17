"use client";

import { FilterSheet } from "@/app/(app)/[gender]/_components/filter-sheet";
import type { Category, MinMaxPrices } from "@/lib/types";
import { cn } from "@/lib/utils";
import { NavigationMenuLink } from "@/ui/navigation-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/ui/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  categories: Category[];
  colors: string[];
  minMaxPrices: MinMaxPrices;
};

const EXCLUDED_PATHS = ["/", "/account", "/search"];

function DesktopCategoryLink({ category }: { category: Category }) {
  const pathname = usePathname();

  const genderSlug = pathname.split("/")[1];
  const categorySlug = pathname.split("/")[2] || "_";

  const active = categorySlug === category.slug;

  const href = `/${genderSlug}${category.slug === "_" ? "" : `/${category.slug}`}`;

  return (
    <li>
      <Link
        href={href}
        className={cn(
          "inline-block bg-muted text-foreground px-4 py-2 text-sm rounded-lg",
          { "bg-foreground text-background": active },
        )}
      >
        {category.name}
      </Link>
    </li>
  );
}

function MobileCategoryLink({ category }: { category: Category }) {
  const pathname = usePathname();

  const genderSlug = pathname.split("/")[1];
  const categorySlug = pathname.split("/")[2] || "_";

  const active = categorySlug === category.slug;

  const href = `/${genderSlug}${category.slug === "_" ? "" : `/${category.slug}`}`;

  return (
    <li>
      <Link href={href} legacyBehavior passHref>
        <NavigationMenuLink
          className={cn(
            "inline-block bg-muted text-foreground px-4 w-full py-2 text-sm rounded-lg",
            { "bg-foreground text-background": active },
          )}
        >
          {category.name}
        </NavigationMenuLink>
      </Link>
    </li>
  );
}

export function CategorySelector({ categories, colors, minMaxPrices }: Props) {
  const pathname = usePathname();

  const allItems: Category = {
    id: "0",
    name: "All",
    slug: "_",
  };

  if (EXCLUDED_PATHS.includes(pathname)) return null;

  return (
    <>
      <div className="h-12 relative hidden md:block">
        <ul className="flex space-x-4 items-center justify-center">
          <DesktopCategoryLink category={allItems} />
          {categories.map((category) => (
            <DesktopCategoryLink key={category.id} category={category} />
          ))}
        </ul>
        <FilterSheet
          triggerClassName="absolute right-0 top-0 h-12"
          colors={colors}
          minMaxPrices={minMaxPrices}
        />
      </div>
      <div className="flex items-center justify-between md:hidden">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[350px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <MobileCategoryLink category={allItems} />
                  {categories.map((category) => (
                    <MobileCategoryLink key={category.id} category={category} />
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <FilterSheet colors={colors} minMaxPrices={minMaxPrices} />
      </div>
    </>
  );
}
