import Link from "next/link";
import { getCollectionsList } from "@/api/collections";
import { getProductsList } from "@/api/products";

import { ProductList } from "@/ui/organisms/ProductList";

export default async function Home() {
	const collections = await getCollectionsList();

	const { products } = await getProductsList(1);

	return (
		<>
			<ul>
				{collections.map((collection) => (
					<li key={collection.slug}>
						<Link href={`/collections/${collection.slug}`}>
							{collection.name}
						</Link>
					</li>
				))}
			</ul>
			<ProductList products={products.slice(0, 4)} />
		</>
	);
}
