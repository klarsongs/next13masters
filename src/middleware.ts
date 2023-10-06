import { withClerkMiddleware } from "@clerk/nextjs";
import { type NextRequest, NextResponse } from "next/server";
// import { getAuth } from "@clerk/nextjs/server";

// Commented because it causes 401 Unauthorized on start
// export default authMiddleware({
// 	debug: true,
// 	publicRoutes: [
// 		"/",
// 		"/search",
// 		"/cart",
// 		"/categories/(.*)" as unknown as RegExp,
// 		"/collections/(.*)" as unknown as RegExp,
// 		"/product/(.*)" as unknown as RegExp,
// 		"/products/(.*)" as unknown as RegExp,
// 	],
// });

export default withClerkMiddleware((_req: NextRequest) => {
	// const publicPaths = [
	// 	"/",
	// 	"/search",
	// 	"/cart",
	// 	"/categories*" as unknown as RegExp,
	// 	"/collections*" as unknown as RegExp,
	// 	"/product*" as unknown as RegExp,
	// 	"/products*" as unknown as RegExp,
	// ];

	// const isPublic = (path: string) => {
	// 	return publicPaths.find((x) =>
	// 		path.match(new RegExp(`^${x}$`.replace("*$", "($|/)"))),
	// 	);
	// };

	// if (isPublic(req.nextUrl.pathname)) {
	return NextResponse.next();
	// }

	// // if the user is not signed in redirect them to the sign in page.
	// const { userId } = getAuth(req);

	// if (!userId) {
	// 	// redirect the users to /sign-in/[[...index]].ts

	// 	const signInUrl = new URL("/sign-in", req.url);
	// 	signInUrl.searchParams.set("redirect_url", req.url);
	// 	return NextResponse.redirect(signInUrl);
	// }

	// return NextResponse.next();
});

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
