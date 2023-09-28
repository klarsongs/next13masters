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
	const graphqlRespose = await executeGraphql(
		ProductsGetListDocument,
		{ skip: (pageNumber - 1) * PER_PAGE },
	);

	const products = graphqlRespose.products;

	const totalCount =
		graphqlRespose.productsConnection.aggregate.count;

	return { products, totalCount };
};

export const getProductById = async (
	id: ProductListItemFragment["id"],
) => {
	const data = await executeGraphql(ProductGetByIdDocument, { id });

	const product = data?.product;

	return product;
};

export const getProductsByCategorySlug = async (
	categorySlug: string,
	pageNumber: number,
) => {
	const data = await executeGraphql(
		ProductsGetByCategorySlugDocument,
		{ slug: categorySlug, skip: (pageNumber - 1) * PER_PAGE },
	);

	const products = data.categories[0]?.products;

	const totalCount = data.productsConnection.aggregate.count;

	return { products, totalCount };
};

export const getProductsCategories = async (): Promise<
	CategoryNameFragment[]
> => {
	const data = await executeGraphql(ProductsGetCategoriesDocument);

	const categories = data.categories;

	return categories;
};

export const getRelatedProducts = async (
	id: string,
): Promise<ProductListItemFragment[]> => {
	const data = await executeGraphql(ProductsGetRelatedDocument, {
		id,
	});

	const relatedProducts = data.products;

	return relatedProducts;
};

export const getProductsBySearch = async (search: string) => {
	const data = await executeGraphql(ProductsGetBySearchDocument, {
		search,
	});

	const products = data.products;

	return products;
};
