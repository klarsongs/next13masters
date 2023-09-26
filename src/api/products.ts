import { executeGraphql } from "./utils";
import {
	ProductGetByIdDocument,
	type ProductListItemFragment,
	ProductsGetByCategorySlugDocument,
	ProductsGetListDocument,
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
