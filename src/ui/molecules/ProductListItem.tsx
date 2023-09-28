import Link from "next/link";
import { ProductListItemDescription } from "@/ui/atoms/ProductListItemDescription";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { type ProductListItemFragment } from "@/gql/graphql";

type ProducListItemProps = {
	product: ProductListItemFragment;
};

export const ProductListItem = ({ product }: ProducListItemProps) => {
	const productVariant = product.variants[0];

	const variant: { size?: string; color?: string } = {};

	if (productVariant) {
		if (productVariant.__typename === "ProductSizeColorVariant") {
			variant.size = productVariant.size.toLowerCase();
			variant.color = productVariant.color.toLowerCase();
		} else if (productVariant.__typename === "ProductColorVariant") {
			variant.color = productVariant.color.toLowerCase();
		} else {
			variant.size = productVariant.size.toLowerCase();
		}
	}

	return (
		<li>
			<Link
				href={{
					pathname: `/product/${product.id}`,
					query: { ...variant },
				}}
			>
				<article>
					{product.images[0] && (
						<ProductCoverImage
							src={product.images[0].url}
							alt={product.name}
						/>
					)}
					<ProductListItemDescription product={product} />
				</article>
			</Link>
		</li>
	);
};
