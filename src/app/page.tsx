import Link from "next/link";
import { getCollectionsList } from "@/api/collections";

export default async function Home() {
	const collections = await getCollectionsList();

	return (
		<ul>
			{collections.map((collection) => (
				<li key={collection.slug}>
					<Link href={`/collections/${collection.slug}`}>
						{collection.name}
					</Link>
				</li>
			))}
		</ul>
	);
}
