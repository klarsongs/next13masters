export const formatMoney = (cents: number) => {
	const dollars = cents / 100;
	return Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(dollars);
};

export const capitalizeSlug = (slug: string) => {
	return slug
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
};
