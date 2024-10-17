"use client";

import { FilterSheet } from "@/app/(app)/[gender]/_components/filter-sheet";
import { Skeleton } from "@/components/ui/skeleton";
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
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";

const EXCLUDED_PATHS = ["/", "/account"];

async function getCategories() {
  const response = await fetch("/api/queries/categories");
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!response.ok) throw new Error("Failed to fetch categories");

  return await response.json().then((data) => data as Category[]);
}

async function getColors() {
  const response = await fetch("/api/queries/colors");

  if (!response.ok) throw new Error("Failed to fetch colors");

  return await response.json().then((data) => data as string[]);
}

async function getMinMaxPrices() {
  const response = await fetch("/api/queries/prices");

  if (!response.ok) throw new Error("Failed to fetch min-max-prices");

  return await response.json().then((data) => data as MinMaxPrices);
}

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

export function CategorySelector() {
  const pathname = usePathname();
  if (EXCLUDED_PATHS.includes(pathname)) return null;

  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { data: colors, isLoading: isColorsLoading } = useQuery({
    queryKey: ["colors"],
    queryFn: getColors,
  });

  const { data: minMaxPrices, isLoading: isMinMaxPricesLoading } = useQuery({
    queryKey: ["min-max-prices"],
    queryFn: getMinMaxPrices,
  });

  const allItems: Category = {
    id: "0",
    name: "All",
    slug: "_",
  };

  return (
    <>
      <div className="h-12 relative items-center justify-center hidden md:flex">
        {isCategoriesLoading || isColorsLoading || isMinMaxPricesLoading ? (
          <div className="flex space-x-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton
                // biome-ignore lint/suspicious/noArrayIndexKey:
                key={i}
                className="bg-muted text-foreground text-sm rounded-lg h-9 w-32"
              />
            ))}
          </div>
        ) : (
          <>
            <ul className="flex space-x-4 items-center justify-center">
              <DesktopCategoryLink category={allItems} />
              {categories?.map((category) => (
                <DesktopCategoryLink key={category.id} category={category} />
              ))}
            </ul>
            <FilterSheet
              triggerClassName="absolute right-0 top-0 h-12"
              colors={colors}
              minMaxPrices={minMaxPrices}
            />
          </>
        )}
      </div>
      <div className="flex items-center justify-between md:hidden">
        {isCategoriesLoading || isColorsLoading || isMinMaxPricesLoading ? (
          <div className="flex items-center justify-between w-full">
            <Skeleton className="w-28 h-9" />
            <Skeleton className="h-9 w-9" />
          </div>
        ) : (
          <>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[350px] gap-3 p-4 md:grid-cols-2">
                      <MobileCategoryLink category={allItems} />
                      {categories?.map((category) => (
                        <MobileCategoryLink
                          key={category.id}
                          category={category}
                        />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <FilterSheet colors={colors} minMaxPrices={minMaxPrices} />
          </>
        )}
      </div>
    </>
  );
}
