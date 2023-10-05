import { executeGraphql } from "./utils";
import {
	ReviewsAddReviewDocument,
	ReviewPublishDocument,
	ReviewsGetListDocument,
} from "@/gql/graphql";

const calculateAverageRating = (reviews: { rating: number }[]) => {
	const totalRating = reviews.reduce(
		(acc, review) => acc + review.rating,
		0,
	);
	const averageRating = totalRating / reviews.length;
	return averageRating;
};

export const getReviews = async (productId: string) => {
	const data = await executeGraphql({
		query: ReviewsGetListDocument,
		variables: {
			skip: 0,
			productId,
		},
		next: {
			tags: ["reviews"],
		},
	});

	const reviews = data.reviews;

	return reviews;
};

export async function addReview({
	headline,
	name,
	email,
	content,
	rating,
	productId,
}: {
	headline: string;
	name: string;
	email: string;
	content: string;
	rating: number;
	productId: string;
}) {
	const data = await executeGraphql({
		query: ReviewsAddReviewDocument,
		variables: {
			headline,
			name,
			email,
			content,
			rating,
			productId,
		},
		cache: "no-store",
		next: {
			tags: ["reviews"],
		},
	});

	const reviewId = data?.createReview?.id;

	if (!reviewId) {
		throw Error("Review cannot be published");
	}

	const newRating = calculateAverageRating(
		data?.createReview?.product?.reviews || [],
	);

	return executeGraphql({
		query: ReviewPublishDocument,
		variables: {
			reviewId,
			productId,
			averageRating: newRating,
		},
		cache: "no-store",
		next: {
			tags: ["reviews"],
		},
	});
}
