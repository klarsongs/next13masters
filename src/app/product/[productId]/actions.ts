"use server";

import { revalidateTag } from "next/cache";
import { addReview } from "@/api/reviews";
import { type ReviewFragment } from "@/gql/graphql";

export const addNewReview = async (
	review: Omit<ReviewFragment, "id"> & { email: string },
	productId: string,
) => {
	"use server";

	await addReview({
		productId,
		...review,
	});

	revalidateTag("reviews");
};
