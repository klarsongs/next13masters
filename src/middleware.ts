import { authMiddleware } from "@clerk/nextjs";

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

export default authMiddleware({
	publicRoutes: [
		"/",
		"/search",
		"/cart",
		"/categories/(.*)" as unknown as RegExp,
		"/collections/(.*)" as unknown as RegExp,
		"/product/(.*)" as unknown as RegExp,
		"/products/(.*)" as unknown as RegExp,
	],
});
