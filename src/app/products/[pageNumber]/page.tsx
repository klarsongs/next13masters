import { type Route } from "next";
import { ProductList } from "@/ui/organisms/ProductList";
import { getProductsList } from "@/api/products";
import { Pagination } from "@/ui/molecules/Pagination";
import { type ProductOrderByInput } from "@/gql/graphql";
import { Sorting } from "@/ui/molecules/Sorting";

const isValidSortBy = (
	sortBy: string,
): sortBy is ProductOrderByInput =>
	["price_ASC", "price_DESC", "rating_ASC", "rating_DESC"].includes(
		sortBy,
	);

export default async function Products({
	params,
	searchParams,
}: {
	params: { pageNumber: string };
	searchParams: { sortBy: string };
}) {
	const shouldSort = isValidSortBy(searchParams.sortBy);
	const sortBy = searchParams.sortBy;

	const { products, totalCount } = await getProductsList(
		Number(params.pageNumber),
		shouldSort ? (sortBy as ProductOrderByInput) : undefined,
	);

	return (
		<>
			<section className="mb-8 flex flex-col items-end justify-end">
				<div className="flex w-full items-end justify-between">
					<h1 className=" text-3xl font-bold">All products</h1>
					<Sorting sortBy={sortBy as ProductOrderByInput} />
				</div>
			</section>
			<ProductList products={products} />
			<article className="mt-6 flex justify-center">
				<Pagination
					totalCount={totalCount}
					nextHref={(pageNumber) =>
						`/products/${pageNumber}${
							searchParams.sortBy
								? `?sortBy=${searchParams.sortBy}`
								: ""
						}` as Route
					}
				/>
			</article>
		</>
	);
}
