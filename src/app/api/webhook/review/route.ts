import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { type WebhookHygraph } from "../../types";

export async function POST(request: NextRequest): Promise<Response> {
	const body = (await request.json()) as WebhookHygraph<{
		data: unknown;
	}>;

	const data = body.data;

	if (data && data.__typename === "Product") {
		console.log(`Revalidating reviews...`);
		revalidateTag("reviews");

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

export async function DELETE(
	request: NextRequest,
): Promise<Response> {
	const body = (await request.json()) as WebhookHygraph<{
		data: unknown;
	}>;

	const data = body.data;

	if (data && data.__typename === "Product") {
		console.log(`Revalidating reviews...`);
		revalidateTag("reviews");

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
