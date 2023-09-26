import { notFound } from "next/navigation";
import { ProductList } from "@/ui/organisms/ProductList";
import { getProductsByCategorySlug } from "@/api/products";

export const generateStaticParams = async ({
	params,
}: {
	params: { category: string };
}) => {
	if (params.category === "t-shirts") {
		return [
			{ pageNumber: "1" },
			{ pageNumber: "2" },
			{ pageNumber: "3" },
		];
	} else {
		return [{ pageNumber: "1" }];
	}
};

export default async function CategoryProductsPage({
	params,
}: {
	params: { category: string; pageNumber: string };
}) {
	const products = await getProductsByCategorySlug(params.category);

	if (!products) {
		notFound();
	}

	return (
		<>
			<h1>
				Produkty z kategorii {params.category}, strona{" "}
				{params.pageNumber}
			</h1>
			<ProductList products={products} />
		</>
	);
}
