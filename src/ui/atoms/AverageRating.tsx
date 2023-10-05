import { Star } from "lucide-react";

export const AverageRating = ({ rating }: { rating: number }) => {
	return (
		<div className="flex items-center">
			<span className="mr-1 text-sm" data-testid="product-rating">
				{rating.toFixed(2)}
			</span>
			<Star className="h-3 w-3 fill-green-200" />
		</div>
	);
};
