import { Rating } from "../atoms/Rating";
import { type ReviewFragment } from "@/gql/graphql";

export const Review = ({
	review: { name, rating, headline, content },
}: {
	review: ReviewFragment;
}) => {
	return (
		<article className="mt-6 w-full">
			<div className="mb-1 flex items-center">
				<p className="mr-2 text-sm">{name}</p>
				<Rating rating={rating} />
			</div>
			<h3 className="text-md font-bold">{headline}</h3>
			<p>{content}</p>
		</article>
	);
};
