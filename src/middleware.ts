import { type NextRequest } from "next/server";
// import { isAuthenticated } from "@lib/auth";

// export const config = {
// 	matcher: "/api/:function*",
// };

export function middleware(_request: NextRequest) {
	// if (!isAuthenticated(request)) {
	// 	return new NextResponse(
	// 		JSON.stringify({
	// 			success: false,
	// 			message: "authentication failed",
	// 		}),
	// 		{
	// 			status: 401,
	// 			headers: { "content-type": "application/json" },
	// 		},
	// 	);
	// }
}
