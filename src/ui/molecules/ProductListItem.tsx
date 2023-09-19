import Link from "next/link";
import { ProductListItemDescription } from "@/ui/atoms/ProductListItemDescription";
import { type Product } from "@/ui/types";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";

type ProducListItemProps = {
	product: Product;
};

export const ProductListItem = ({ product }: ProducListItemProps) => {
	return (
		<li>
			<Link href={`/product/${product.id}`}>
				<article>
					<ProductCoverImage
						src={product.coverImage.src}
						alt={product.coverImage.alt}
					/>
					<ProductListItemDescription product={product} />
				</article>
			</Link>
		</li>
	);
};
