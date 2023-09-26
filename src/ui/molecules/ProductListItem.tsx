import Link from "next/link";
import { ProductListItemDescription } from "@/ui/atoms/ProductListItemDescription";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { type ProductListItemFragment } from "@/gql/graphql";

type ProducListItemProps = {
	product: ProductListItemFragment;
};

export const ProductListItem = ({ product }: ProducListItemProps) => {
	return (
		<li>
			<Link href={`/product/${product.id}`}>
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
