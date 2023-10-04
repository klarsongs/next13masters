"use client";

import { experimental_useOptimistic as useOptimistic } from "react";
import { changeItemQuantity } from "./actions";
import { type CartFragment } from "@/gql/graphql";

export const IncrementProductQuantity = ({
	quantity,
	itemId,
	cart,
}: {
	quantity: number;
	itemId: string;
	cart: CartFragment;
}) => {
	const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(
		quantity,
		(_state, newQuantity: number) => newQuantity,
	);
	return (
		<form>
			{optimisticQuantity}
			<button
				className="ml-2 h-8 w-8 border bg-slate-50"
				type="submit"
				formAction={async () => {
					setOptimisticQuantity(optimisticQuantity + 1);
					await changeItemQuantity(
						itemId,
						optimisticQuantity + 1,
						cart,
					);
				}}
			>
				+
			</button>
		</form>
	);
};
