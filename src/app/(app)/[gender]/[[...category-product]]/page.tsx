import { ProductDetail } from "@/app/(app)/[gender]/_components/product-detail";
import { ProductList } from "@/app/(app)/[gender]/_components/product-list";
import { getMainCategories, getProduct, getProducts } from "@/lib/db/queries";
import { redirect } from "next/navigation";

type Props = {
  params: {
    gender: string;
    "category-product": string[];
  };
  searchParams: {
    sort: string;
    color: string;
    price_min: string;
    price_max: string;
    page: string;
  };
};

export default async function CategoryGenderPage(props: Props) {
  if (!["woman", "man"].includes(props.params.gender)) {
    redirect("/");
  }

  const categorySlug = props.params["category-product"]?.[0];

  const categories = (await getMainCategories()).map(
    (category) => category.slug,
  );

  if (categorySlug && !categories.includes(categorySlug)) {
    redirect(`/${props.params.gender}`);
  }

  const productSlug = props.params["category-product"]?.[1];

  if (!productSlug) {
    const page = props.searchParams.page ? +props.searchParams.page : 1;
    const priceMin = props.searchParams.price_min
      ? +props.searchParams.price_min * 100
      : undefined;
    const priceMax = props.searchParams.price_max
      ? +props.searchParams.price_max * 100
      : undefined;

    const { products, totalProducts } = await getProducts({
      gender: props.params.gender === "man" ? "M" : "F",
      category: categorySlug,
      orderBy: props.searchParams.sort,
      color: props.searchParams.color,
      priceMin,
      priceMax,
      page,
    });

    return <ProductList products={products} totalProducts={totalProducts} />;
  }

  const product = await getProduct(productSlug);

  if (!product) {
    redirect(`/${props.params.gender}/${categorySlug}`);
  }

  return <ProductDetail product={product} />;
}
