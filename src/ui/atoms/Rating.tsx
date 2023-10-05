import { Star } from "lucide-react";

export const Rating = ({ rating }: { rating: number }) => {
	const stars = Array.from({ length: rating }, (_, index) => (
		<Star key={index} className="w-4 fill-green-200" />
	));

	return <div className="flex">{stars}</div>;
};
