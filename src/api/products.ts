import { executeGraphql } from "./utils";
import {
	ProductGetByIdDocument,
	type ProductListItemFragment,
	ProductsGetByCategorySlugDocument,
	ProductsGetListDocument,
	ProductsGetCategoriesDocument,
	type CategoryNameFragment,
	ProductsGetRelatedDocument,
} from "@/gql/graphql";

export const getProductsList = async (
	pageNumber: number,
): Promise<ProductListItemFragment[]> => {
	console.log({ pageNumber });

	const graphqlRespose = await executeGraphql(
		ProductsGetListDocument,
	);

	return graphqlRespose.products;
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
) => {
	const data = await executeGraphql(
		ProductsGetByCategorySlugDocument,
		{ slug: categorySlug },
	);

	const products = data.categories[0]?.products;

	return products;
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
