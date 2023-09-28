import { getProductsBySearch } from "@/api/products";
import { ProductList } from "@/ui/organisms/ProductList";

export default async function SearchPage({
	searchParams: { query },
}: {
	searchParams: { query: string };
}) {
	const products = await getProductsBySearch(query);
	return <ProductList products={products} />;
}
