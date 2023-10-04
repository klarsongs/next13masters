"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { removeItem } from "./actions";
import { type CartFragment } from "@/gql/graphql";

export const RemoveButton = ({
	itemId,
	cart,
}: {
	itemId: string;
	cart: CartFragment;
}) => {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	return (
		<button
			className="rounded px-4 py-2 text-red-500 hover:text-red-700 disabled:text-slate-400"
			disabled={isPending}
			onClick={() => {
				startTransition(async () => {
					await removeItem(itemId, cart);
					router.refresh();
				});
			}}
		>
			Remove
		</button>
	);
};
