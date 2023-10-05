"use client";

import { experimental_useOptimistic as useOptimistic } from "react";
import { changeItemQuantity } from "./actions";
import { type CartFragment } from "@/gql/graphql";

export const ChangeProductQuantity = ({
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
			<button
				data-testid="decrement"
				className="h-8 w-8 border bg-slate-50 hover:bg-slate-100"
				type="submit"
				onClick={() => setOptimisticQuantity(optimisticQuantity - 1)}
				formAction={async () => {
					await changeItemQuantity(itemId, optimisticQuantity, cart);
				}}
			>
				-
			</button>
			<span data-testid="quantity" className="mx-4">
				{optimisticQuantity}
			</span>
			<button
				data-testid="increment"
				className="h-8 w-8 border bg-slate-50 hover:bg-slate-100"
				type="submit"
				onClick={() => setOptimisticQuantity(optimisticQuantity + 1)}
				formAction={async () => {
					await changeItemQuantity(itemId, optimisticQuantity, cart);
				}}
			>
				+
			</button>
		</form>
	);
};
