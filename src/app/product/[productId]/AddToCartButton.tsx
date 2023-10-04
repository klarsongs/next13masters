"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";

export const AddToCartButton = ({}) => {
	/**
	 * Retrieves the form status from the server parent component using the useFormStatus hook.
	 */
	const formStatus = useFormStatus();

	return (
		<button
			data-testid="add-to-cart-button"
			className="mt-6 rounded-full bg-green-300 px-6 py-2 shadow-lg transition-colors hover:bg-green-200 disabled:cursor-wait disabled:bg-slate-200 disabled:text-slate-400"
			type="submit"
			disabled={formStatus.pending}
		>
			Add to cart
		</button>
	);
};
