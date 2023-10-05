import { ReviewsList } from "./ReviewsList";
import { getReviews } from "@/api/reviews";

export const Reviews = async ({
	productId,
}: {
	productId: string;
}) => {
	const reviews = await getReviews(productId);

	return <ReviewsList reviews={reviews} productId={productId} />;
};
