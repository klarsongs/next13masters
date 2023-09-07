// import Image from "next/image";

import { type Product } from "../ui/types";
import { ProductList } from "@/ui/organisms/ProductList";

const products: Product[] = [
	{
		id: "1",
		category: "Miski",
		name: "Miska Nora",
		price: 1599,
		coverImage: {
			src: "/products/ceramics-bowl.png",
			alt: "Miska Nora",
		},
	},
	{
		id: "2",
		category: "Miski",
		name: "Miska Beza",
		price: 1699,
		coverImage: {
			src: "/products/ceramics-bowl2.png",
			alt: "Miska Beza",
		},
	},
	{
		id: "3",
		category: "Kubki",
		name: "Kubek Lato",
		price: 1299,
		coverImage: {
			src: "/products/ceramics-mug.png",
			alt: "Kubek Lato",
		},
	},
	{
		id: "4",
		category: "Talerze",
		name: "Talerz Zapominajka",
		price: 1499,
		coverImage: {
			src: "/products/ceramics-plate.png",
			alt: "Talerz Zapominajka",
		},
	},
];

export default function Home() {
	return (
		<section className="mx-auto max-w-md p-12 sm:max-w-2xl sm:py-16 md:max-w-4xl lg:max-w-7xl">
			<ProductList data-testid="product-list" products={products} />
		</section>
	);
}
