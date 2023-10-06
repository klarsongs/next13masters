import { executeGraphql } from "./utils";
import {
	OrderGetByUserIdDocument,
	OrderPublishDocument,
	OrderUpdateEmailDocument,
} from "@/gql/graphql";

export const getOrdersForUserId = async (userId: string) => {
	const data = await executeGraphql({
		query: OrderGetByUserIdDocument,
		variables: { userId },
		next: {
			tags: ["orders"],
		},
	});

	const orders = data?.orders;

	return orders;
};

export const publishOrder = async (id: string) => {
	return executeGraphql({
		query: OrderPublishDocument,
		variables: { id },
		next: {
			tags: ["orders"],
		},
		cache: "no-store",
	});
};

export const updateOrderEmail = async (
	id: string,
	email?: string,
	stripeId?: string,
	total?: number,
	userId?: string,
) => {
	return executeGraphql({
		query: OrderUpdateEmailDocument,
		variables: { id, email, stripeId, total, userId },
		next: {
			tags: ["orders"],
		},
		cache: "no-store",
	});
};
