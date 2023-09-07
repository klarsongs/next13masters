import { ProductListItem } from "@/ui/molecules/ProductListItem";
import { type Product } from "@/ui/types";

export const ProductList = ({ products }: { products: Product[] }) => {
	return (
		<ul
			className="grid grid-cols-1 gap-8 sm:grid sm:grid-cols-2 md:grid md:grid-cols-3 lg:grid lg:grid-cols-4"
			data-testid="products-list"
		>
			{products.map((product) => (
				<ProductListItem key={product.id} product={product} />
			))}
		</ul>
	);
};
