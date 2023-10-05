"use client";

import { experimental_useOptimistic as useOptimistic } from "react";
import { Input } from "../atoms/Input";
import { Textarea } from "../atoms/Textarea";
import { InputRating } from "../atoms/InputRating";
import { Review } from "../molecules/Review";
import { addNewReview } from "@/app/product/[productId]/actions";
import { type ReviewFragment } from "@/gql/graphql";
import { formDataToObject } from "@/utils";
import { type Stringify } from "@/types";

export function ReviewsList({
	reviews,
	productId,
}: {
	reviews: ReviewFragment[];
	productId: string;
}) {
	const [optimisticReviews, addOptimisticReview] = useOptimistic<
		ReviewFragment[],
		ReviewFragment
	>(reviews, (state: ReviewFragment[], newReview: ReviewFragment) => [
		newReview,
		...state,
	]);

	return (
		<section>
			<form
				data-testid="add-review-form"
				action={async (formData: FormData) => {
					const data =
						formDataToObject<
							Stringify<ReviewFragment & { email: string }>
						>(formData);

					const review = {
						headline: data.headline,
						content: data.content,
						rating: Number(formData.get("rating")),
						name: data.name,
					};

					addOptimisticReview({
						...review,
						id: (Math.random() + 1).toString(36).substring(7),
					});

					await addNewReview(
						{ ...review, email: data.email },
						productId,
					);
				}}
			>
				<Input name="headline" label="Review title" required />
				<Textarea name="content" label="Review content" required />
				<InputRating name="rating" />
				<Input name="name" label="Name" required />
				<Input
					name="email"
					label="E-mail"
					required
					inputProps={{ type: "email" }}
				/>
				<button
					className="mt-6 rounded-full bg-green-300 px-6 py-2 shadow-lg transition-colors hover:bg-green-200 disabled:cursor-wait disabled:bg-slate-200 disabled:text-slate-400"
					type="submit"
				>
					Submit review
				</button>
			</form>
			<div className="mt-8">
				<hr className="border-gray-100" />
				{optimisticReviews.map((review) => (
					<Review key={review.id} review={review} />
				))}
			</div>
		</section>
	);
}
