import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest): Promise<Response> {
	const body: unknown = await request.json();

	if (
		typeof body === "object" &&
		body &&
		"productId" in body &&
		typeof body.productId === "string"
	) {
		console.log(`Revalidating products...`);
		revalidateTag("products");

		console.log(`Revalidating cart...`);
		revalidatePath("/cart");

		console.log(`Revalidating product page`);
		revalidatePath(`/product/${body.productId}`);

		return NextResponse.json({ message: "OK" }, { status: 200 });
	} else {
		return NextResponse.json(
			{ message: "There was an error revalidating products" },
			{ status: 400 },
		);
	}
}
