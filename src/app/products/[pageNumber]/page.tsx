import { type Route } from "next";
import { ProductList } from "@/ui/organisms/ProductList";
import { getProductsList } from "@/api/products";
import { Pagination } from "@/ui/molecules/Pagination";

// export const generateStaticParams = async () => {
// 	return [
// 		{ pageNumber: "1" },
// 		{ pageNumber: "2" },
// 		{ pageNumber: "3" },
// 	];
// };

export default async function Products({
	params,
}: {
	params: { pageNumber: string };
}) {
	const { products, totalCount } = await getProductsList(
		Number(params.pageNumber),
	);

	return (
		<>
			<ProductList products={products} />
			<article className="mt-6 flex justify-center">
				<Pagination
					totalCount={totalCount}
					nextHref={(pageNumber) =>
						`/products/${pageNumber}` as Route
					}
				/>
			</article>
		</>
	);
}
