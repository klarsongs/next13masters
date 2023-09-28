import { notFound } from "next/navigation";
import { type Metadata, type Route } from "next";
import { ProductList } from "@/ui/organisms/ProductList";
import { getProductsByCategorySlug } from "@/api/products";
import { Pagination } from "@/ui/molecules/Pagination";
import { capitalizeSlug } from "@/utils";

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

export const generateMetadata = async ({
	params: { category },
}: {
	params: { category: string };
}): Promise<Metadata> => {
	const categoryTitle = capitalizeSlug(category);

	return {
		title: `${categoryTitle}`,
		openGraph: {
			title: `${categoryTitle}`,
		},
	};
};

export default async function CategoryProductsPage({
	params,
}: {
	params: { category: string; pageNumber: string };
}) {
	const categoryTitle = capitalizeSlug(params.category);

	const { products, totalCount } = await getProductsByCategorySlug(
		params.category,
		Number(params.pageNumber),
	);

	if (!products) {
		notFound();
	}

	return (
		<>
			<h1 className="mb-8 mt-4 text-3xl font-bold">
				{categoryTitle}
			</h1>
			<ProductList products={products} />
			<article className="mt-6 flex justify-center">
				<Pagination
					totalCount={totalCount}
					nextHref={(pageNumber) =>
						`/categories/${params.category}/${pageNumber}` as Route
					}
				/>
			</article>
		</>
	);
}
