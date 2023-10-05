import { AverageRating } from "./AverageRating";
import { type ProductListItemFragment } from "@/gql/graphql";
import { formatMoney } from "@/utils";

type ProductListItemDescriptionProps = {
	product: ProductListItemFragment;
};

export const ProductListItemDescription = ({
	product: { name, price, categories, rating },
}: ProductListItemDescriptionProps) => {
	return (
		<div className="mt-2 flex justify-between">
			<div>
				<h3 className="text-sm font-semibold text-gray-700">
					{name}
				</h3>
				{categories[0] && (
					<p className="text-sm text-gray-500">
						<span className="sr-only">Kategoria:</span>{" "}
						{categories[0].name}
					</p>
				)}
			</div>
			<div className="flex flex-col items-end justify-start">
				<p className="text-sm font-bold text-gray-900">
					<span className="sr-only">Cena:</span>
					<span data-testid="product-price">
						{formatMoney(price)}
					</span>
				</p>
				{rating && (
					<div className="text-sm font-medium text-gray-900">
						<span className="sr-only">Stars:</span>
						<AverageRating rating={rating} />
					</div>
				)}
			</div>
		</div>
	);
};
