import { type Product } from "@/ui/types";

type ProductResponseItem = {
	id: string;
	title: string;
	price: number;
	description: string;
	category: string;
	rating: Rating;
	image: string;
	longDescription: string;
};

type Rating = {
	rate: number;
	count: number;
};

export const getProductsList = async (pageNumber: number) => {
	const res = await fetch(
		`https://naszsklep-api.vercel.app/api/products?take=20&offset=${
			20 * pageNumber
		}`,
	);
	const productsResponse =
		(await res.json()) as ProductResponseItem[];

	const products = productsResponse.map(productResponseItemToProduct);

	return products;
};

export const getProductById = async (id: Product["id"]) => {
	const res = await fetch(
		`https://naszsklep-api.vercel.app/api/products/${id}`,
	);
	const productsResponse = (await res.json()) as ProductResponseItem;

	return productResponseItemToProduct(productsResponse);
};

const productResponseItemToProduct = (
	product: ProductResponseItem,
) => {
	return {
		id: product.id,
		category: product.category,
		name: product.title,
		price: product.price,
		description: product.description,
		coverImage: {
			src: product.image,
			alt: product.title,
		},
	};
};
