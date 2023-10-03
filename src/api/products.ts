import { executeGraphql } from "./utils";
import { PER_PAGE } from "@/constants";
import {
	ProductGetByIdDocument,
	type ProductListItemFragment,
	ProductsGetByCategorySlugDocument,
	ProductsGetListDocument,
	ProductsGetCategoriesDocument,
	type CategoryNameFragment,
	ProductsGetRelatedDocument,
	ProductsGetBySearchDocument,
} from "@/gql/graphql";

type ProductsListResponse = {
	products: ProductListItemFragment[];
	totalCount: number;
};

export const getProductsList = async (
	pageNumber: number,
): Promise<ProductsListResponse> => {
	const graphqlRespose = await executeGraphql({
		query: ProductsGetListDocument,
		variables: { skip: (pageNumber - 1) * PER_PAGE },
		next: {
			revalidate: 60 * 60,
			tags: ["products"],
		},
	});

	const products = graphqlRespose.products;

	const totalCount =
		graphqlRespose.productsConnection.aggregate.count;

	return { products, totalCount };
};

export const getProductById = async (
	id: ProductListItemFragment["id"],
) => {
	const data = await executeGraphql({
		query: ProductGetByIdDocument,
		variables: { id },
		next: {
			revalidate: 15,
			tags: [`product-${id}`],
		},
	});

	const product = data?.product;

	return product;
};

export const getProductsByCategorySlug = async (
	categorySlug: string,
	pageNumber: number,
) => {
	const data = await executeGraphql({
		query: ProductsGetByCategorySlugDocument,
		variables: {
			slug: categorySlug,
			skip: (pageNumber - 1) * PER_PAGE,
		},
		next: {
			tags: ["products"],
		},
	});

	const products = data.categories[0]?.products;

	const totalCount = data.productsConnection.aggregate.count;

	return { products, totalCount };
};

export const getProductsCategories = async (): Promise<
	CategoryNameFragment[]
> => {
	const data = await executeGraphql({
		query: ProductsGetCategoriesDocument,
	});

	const categories = data.categories;

	return categories;
};

export const getRelatedProducts = async (
	id: string,
): Promise<ProductListItemFragment[]> => {
	const data = await executeGraphql({
		query: ProductsGetRelatedDocument,
		variables: {
			id,
		},
		next: {
			tags: ["products"],
		},
	});

	const relatedProducts = data.products;

	return relatedProducts;
};

export const getProductsBySearch = async (search: string) => {
	const data = await executeGraphql({
		query: ProductsGetBySearchDocument,
		variables: {
			search,
		},
		next: {
			tags: ["products"],
		},
	});

	const products = data.products;

	return products;
};
