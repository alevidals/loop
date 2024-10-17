import { ProductList } from "@/app/(app)/[gender]/_components/product-list";
import { getProducts } from "@/lib/db/queries";
import { redirect } from "next/navigation";

type Props = {
  searchParams: {
    q: string;
    page: string;
    sort: string;
    color: string;
    price_min: string;
    price_max: string;
  };
};

export default async function SearchPage({ searchParams }: Props) {
  const { q, page, sort, color, price_min, price_max } = searchParams;

  if (!q) redirect("/");

  const priceMin = price_min ? +price_min * 100 : undefined;
  const priceMax = price_max ? +price_max * 100 : undefined;

  const { products, totalProducts } = await getProducts({
    searchTerm: q,
    page: page ? +page : 1,
    orderBy: sort,
    color,
    priceMax,
    priceMin,
  });

  return (
    <div>
      <h2 className="font-bold text-2xl">Showing results for "{q}"</h2>
      <ProductList products={products} totalProducts={totalProducts} />
    </div>
  );
}
