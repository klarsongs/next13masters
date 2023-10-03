import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest): Promise<Response> {
	const body: unknown = await request.json();

	console.log(`Received webhook: ${JSON.stringify(body)}`);
	console.log(`Body type: ${typeof body}`);
	console.log(`Body: ${JSON.stringify(body)}`);

	if (
		typeof body === "object" &&
		body &&
		"__typename" in body &&
		body.__typename === "Product" &&
		"id" in body &&
		typeof body.id === "string"
	) {
		console.log(`Revalidating products...`);
		revalidateTag("products");

		console.log(`Revalidating cart...`);
		revalidatePath("/cart");

		console.log(`Revalidating product page`);
		revalidatePath(`/product/${body.id}`);

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
