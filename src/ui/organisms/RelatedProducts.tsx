import { ProductList } from "./ProductList";
import { type ProductListItemFragment } from "@/gql/graphql";

export const RelatedProducts = ({
	products,
}: {
	products: ProductListItemFragment[];
}) => (
	<div data-testid="related-products">
		<ProductList products={products} />
	</div>
);
