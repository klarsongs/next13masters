import { type Metadata } from "next";
import { getCollectionBySlug } from "@/api/collections";
import { capitalizeSlug } from "@/utils";

export const generateMetadata = async ({
	params: { collection },
}: {
	params: { collection: string };
}): Promise<Metadata> => {
	const collectionTitle = capitalizeSlug(collection);

	return {
		title: `${collectionTitle}`,
		openGraph: {
			title: `${collectionTitle}`,
		},
	};
};

export default async function CollectionPage({
	params,
}: {
	params: { collection: string };
}) {
	const collection = await getCollectionBySlug(params.collection);

	return (
		<>
			<h1 className="mb-4 mt-4 text-3xl font-bold">
				{collection?.name}
			</h1>
			<p>{collection?.description}</p>
		</>
	);
}
