import { executeGraphql } from "./utils";
import {
	ReviewsAddReviewDocument,
	ReviewsGetListDocument,
	ReviewPublishDocument,
} from "@/gql/graphql";

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

	return executeGraphql({
		query: ReviewPublishDocument,
		variables: {
			reviewId,
		},
		cache: "no-store",
		next: {
			tags: ["reviews"],
		},
	});
}
