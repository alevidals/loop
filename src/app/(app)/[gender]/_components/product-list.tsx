import { ProductCard } from "@/app/(app)/[gender]/_components/product-card";
import { Pagination } from "@/components/pagination";
import type { Product } from "@/lib/types";

type Props = {
  products: Product[];
  totalProducts: number;
};

export const ITEMS_PER_PAGE = 3;

export function ProductList({ products, totalProducts }: Props) {
  if (products.length === 0) {
    return (
      <div className="mt-4">
        <h3 className="text-center text-xl font-bold">
          Oops! No products found.
        </h3>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6">
        {products.map((product) => (
          <ProductCard key={product.productVariantId} product={product} />
        ))}
      </div>
      {totalProducts > ITEMS_PER_PAGE ? (
        <div className="mt-10">
          <Pagination pageSize={ITEMS_PER_PAGE} totalItems={totalProducts} />
        </div>
      ) : null}
    </div>
  );
}
