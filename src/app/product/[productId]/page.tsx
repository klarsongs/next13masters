// import { Suspense } from "react";
import { type Metadata } from "next";
import { getProductById } from "@/api/products";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";

export const generateMetadata = async ({
	params: { productId },
}: {
	params: { productId: string };
}): Promise<Metadata> => {
	const product = await getProductById(productId);
	return {
		title: `${product.name} - Sklep internetowy`,
		description: product.description,
		openGraph: {
			title: `${product.name} - Sklep internetowy`,
			description: product.description,
		},
	};
};

export default async function ProductPage({
	params,
}: {
	params: { productId: string };
}) {
	const product = await getProductById(params.productId);
	return (
		// 	<aside>
		// 		<Suspense>
		// 			<SuggestedProductsList />
		// 		</Suspense>
		// 	</aside>
		<article className="mx-auto max-w-xl">
			<h1 className="mb-4 mt-4 text-3xl font-bold">{product.name}</h1>
			<ProductCoverImage {...product.coverImage} />
			<p className="mt-4">{product.description}</p>
		</article>
	);
}
