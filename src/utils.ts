export const formatMoney = (cents: number) => {
	const dollars = cents / 100;
	return Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(dollars);
};
