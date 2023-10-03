import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { type WebhookHygraph } from "../../types";
import { type ProductListItemFragment } from "@/gql/graphql";

export async function POST(request: NextRequest): Promise<Response> {
	const body =
		(await request.json()) as WebhookHygraph<ProductListItemFragment>;

	const data = body.data;

	if (data && data.__typename === "Product") {
		revalidatePath("/");
		revalidatePath("/products/[pageNumber]");
		revalidatePath("/categories/[category]/[pageNumber]");

		console.log(`Revalidating cart...`);
		revalidatePath("/cart");

		console.log(`Revalidating product id tag...`);
		revalidateTag(`product-${data.id}`);

		return NextResponse.json(
			{ message: "Revalidated!" },
			{ status: 200 },
		);
	} else {
		return NextResponse.json(
			{ message: "Not a product change, aborting..." },
			{ status: 400 },
		);
	}
}
