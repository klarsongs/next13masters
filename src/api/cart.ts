import { cookies } from "next/headers";
import { executeGraphql } from "@/api/utils";

import {
	CartGetByIdDocument,
	ProductGetByIdDocument,
	CartSetItemQuantityDocument,
	CartRemoveProductDocument,
	CartUpdateOrderDocument,
	type CartFragment,
} from "@/gql/graphql";

export const getCartFromCookies = async () => {
	/**
	 * Gets the cart ID from cookies. On the server. It is easier than using localStorage.
	 * @returns {string | undefined} The cart ID if it exists, otherwise undefined.
	 */
	const cartId = cookies().get("cartId")?.value;

	if (cartId) {
		const cart = await executeGraphql({
			query: CartGetByIdDocument,
			variables: {
				id: cartId,
			},
			next: {
				tags: ["cart"],
				revalidate: 2,
			},
			cache: "no-store",
		});
		if (cart.order) {
			return cart.order;
		}
	}
};

export const addToCart = async (productId: string) => {
	const { product } = await executeGraphql({
		query: ProductGetByIdDocument,
		variables: {
			id: productId,
		},
		next: {
			tags: ["cart"],
		},
		cache: "no-store",
	});

	if (!product) {
		throw new Error("Product not found");
	}

	const cart = await getCartFromCookies();

	const orderItemInCart = cart?.orderItems?.find(
		(item) => item?.product?.id === productId,
	);

	const newCart = await executeGraphql({
		query: CartUpdateOrderDocument,
		variables: {
			orderId: cart?.id || "",
			total: (orderItemInCart?.total ?? 0) + product.price,
			orderItemId: orderItemInCart?.id || "",
			productId,
			quantity: (orderItemInCart?.quantity ?? 0) + 1,
			orderTotal: (cart?.total ?? 0) + product.price,
		},
		next: {
			tags: ["cart"],
		},
		cache: "no-store",
	});

	if (!cart && newCart.upsertOrder?.id) {
		cookies().set("cartId", newCart.upsertOrder.id, {
			httpOnly: true,
			sameSite: "lax",
			// TODO: Apply for production only
			// secure: true
			maxAge: 60 * 60 * 24 * 365,
			expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
		});
	}
};

export async function updateItemInCart(
	itemId: string,
	quantity: number,
	cart: CartFragment,
) {
	if (quantity === 0) {
		return removeItemCart(itemId, cart);
	}

	const item = cart?.orderItems?.find((item) => item?.id === itemId);
	const previousQuantity = item?.quantity || 0;

	const orderItemTotal = (item?.product?.price || 0) * quantity;
	const orderTotal =
		previousQuantity > quantity
			? (cart?.total || 0) - (item?.product?.price || 0)
			: (cart?.total || 0) + (item?.product?.price || 0);

	return executeGraphql({
		query: CartSetItemQuantityDocument,
		variables: {
			itemId,
			quantity,
			total: orderItemTotal,
			orderTotal,
			orderId: cart?.id || "",
		},
		cache: "no-store",
		next: {
			tags: ["cart"],
		},
	});
}

export async function removeItemCart(
	itemId: string,
	cart: CartFragment,
) {
	const item = cart?.orderItems?.find((item) => item?.id === itemId);

	const orderTotal = (cart?.total || 0) - (item?.product?.price || 0);

	return executeGraphql({
		query: CartRemoveProductDocument,
		variables: {
			itemId,
			orderTotal,
			orderId: cart?.id || "",
		},
		cache: "no-store",
		next: {
			tags: ["cart"],
		},
	});
}
