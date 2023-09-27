import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductById, getRelatedProducts } from "@/api/products";
import { ProductImage } from "@/ui/atoms/ProductImage";
import { RelatedProducts } from "@/ui/organisms/RelatedProducts";
import { ColorPicker } from "@/ui/molecules/ColorPicker";
import { SizePicker } from "@/ui/molecules/SizePicker";

export const generateMetadata = async ({
	params: { productId },
}: {
	params: { productId: string };
}): Promise<Metadata> => {
	const product = await getProductById(productId);

	if (!product) notFound();

	return {
		title: `${product.name} - Sklep internetowy`,
		description: product?.description || "",
		openGraph: {
			title: `${product.name} - Sklep internetowy`,
			description: product?.description || "",
		},
	};
};

export default async function ProductPage({
	params,
}: {
	params: { productId: string };
}) {
	const product = await getProductById(params.productId);
	const relatedProducts = await getRelatedProducts(params.productId);

	if (!product) {
		notFound();
	}

	const productVariants = product.variants;

	const colors = [
		...new Set(
			productVariants
				.filter(
					(variant) => variant.__typename !== "ProductSizeVariant",
				)
				.map((variant) =>
					(variant as { color: string }).color.toLocaleLowerCase(),
				),
		),
	];

	const sizes = [
		...new Set(
			productVariants
				.filter(
					(variant) => variant.__typename !== "ProductColorVariant",
				)
				.map((variant) => (variant as { size: string }).size),
		),
	];

	return (
		<article className="mx-auto max-w-xl">
			<h1 className="mb-4 mt-4 text-3xl font-bold">{product.name}</h1>
			{product.images[0] && (
				<ProductImage
					src={product.images[0].url}
					alt={product.name}
					width={512}
					height={512}
				/>
			)}
			<p className="my-4">{product.description}</p>
			<ColorPicker colors={colors} />
			<SizePicker sizes={sizes} />
			<h2 className="mb-4 mt-12 text-2xl font-bold">
				Related products
			</h2>
			<RelatedProducts products={relatedProducts} />
		</article>
	);
}
