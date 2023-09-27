import { getCollectionBySlug } from "@/api/collections";

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
