import { revalidateTag } from "next/cache";
import { Input } from "../atoms/Input";
import { InputRating } from "../atoms/InputRating";
import { Textarea } from "../atoms/Textarea";
import { SubmitButton } from "../molecules/SubmitButton";
import { formDataToObject } from "@/utils";
import { addReview } from "@/api/reviews";
import { type ReviewFragment } from "@/gql/graphql";
import { type Stringify } from "@/types";

export const ReviewsForm = ({ productId }: { productId: string }) => {
	const handleSubmit = async (formData: FormData) => {
		"use server";

		const data =
			formDataToObject<Stringify<ReviewFragment & { email: string }>>(
				formData,
			);

		await addReview({
			productId,
			headline: data.headline,
			content: formData.get("content")?.toString() || "",
			rating: Number(formData.get("rating")),
			name: data.name,
			email: data.email,
		});

		revalidateTag("reviews");
	};

	return (
		<form action={handleSubmit} data-testid="add-review-form">
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
			<SubmitButton title="Submit review" />
		</form>
	);
};
