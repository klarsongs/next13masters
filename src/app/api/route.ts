import { NextResponse, type NextRequest } from "next/server";

export async function GET(
	_request: NextRequest,
): Promise<NextResponse> {
	return NextResponse.json("Hello world!");
}
