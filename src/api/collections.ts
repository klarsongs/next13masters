import { executeGraphql } from "./utils";
import {
	CollectionGetByCollectionSlugDocument,
	CollectionsListDocument,
} from "@/gql/graphql";

export const getCollectionsList = async () => {
	const data = await executeGraphql(CollectionsListDocument);
	const collections = data.collections;
	return collections;
};

export const getCollectionBySlug = async (slug: string) => {
	const data = await executeGraphql(
		CollectionGetByCollectionSlugDocument,
		{ slug },
	);
	const collection = data.collections[0];
	return collection;
};
