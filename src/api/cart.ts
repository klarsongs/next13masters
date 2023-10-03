import { cookies } from "next/headers";
import { executeGraphql } from "@/api/utils";

import {
	CartAddProductDocument,
	CartCreateDocument,
	type CartFragment,
	CartGetByIdDocument,
	ProductGetByIdDocument,
	CartSetItemQuantityDocument,
	CartRemoveProductDocument,
} from "@/gql/graphql";

export const getOrCreateCart = async (): Promise<CartFragment> => {
	/**
	 * Gets the cart ID from cookies. On the server. It is easier than using localStorage.
	 * @returns {string | undefined} The cart ID if it exists, otherwise undefined.
	 */
	const cart = await getCartFromCookies();

	if (cart) {
		return cart;
	}

	const { createOrder: newCart } = await createCart();

	if (!newCart) {
		throw new Error("Failed to create cart");
	}

	cookies().set("cartId", newCart.id, {
		httpOnly: true,
		sameSite: "lax",
		// TODO: Apply for production only
		// secure: true
		maxAge: 60 * 60 * 24 * 365,
		expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
	});

	return newCart;
};

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
				tags: ["cart"], // <---
			},
			cache: "no-store",
		});
		if (cart.order) {
			return cart.order;
		}
	}
};

export const createCart = async () => {
	return executeGraphql({ query: CartCreateDocument });
};

export const addToCart = async (
	productId: string,
	orderId: string,
) => {
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

	// TODO: Handle adding mutliple products
	await executeGraphql({
		query: CartAddProductDocument,
		variables: {
			orderId,
			total: product.price,
			productId,
		},
		cache: "no-store",
		next: {
			tags: ["cart"],
		},
	});
};

export async function updateItemInCart(
	itemId: string,
	quantity: number,
) {
	return executeGraphql({
		query: CartSetItemQuantityDocument,
		variables: {
			itemId,
			quantity,
		},
		cache: "no-store",
		next: {
			tags: ["cart"],
		},
	});
}

export async function removeItemCart(itemId: string) {
	return executeGraphql({
		query: CartRemoveProductDocument,
		variables: {
			itemId,
		},
		cache: "no-store",
		next: {
			tags: ["cart"],
		},
	});
}
