"use server";

import { revalidateTag } from "next/cache";
import Stripe from "stripe";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
	getCartFromCookies,
	removeItemCart,
	updateItemInCart,
} from "@/api/cart";
import { type CartFragment } from "@/gql/graphql";

export const removeItem = async (itemId: string) => {
	return removeItemCart(itemId);
};

export const changeItemQuantity = async (
	itemId: string,
	quantity: number,
	cart: CartFragment,
) => {
	await updateItemInCart(itemId, quantity, cart);
	revalidateTag("cart");
	return;
};

/**
 * Handles the payment action by creating a checkout session with Stripe and redirecting the user to the checkout page.
 * @throws {Error} If Stripe secret key is missing or checkout session URL is missing.
 */
export async function handlePaymentAction(): Promise<void> {
	"use server";
	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("Missing Stripe secret key");
	}

	const cart = await getCartFromCookies();

	if (!cart) {
		return;
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2023-08-16",
		typescript: true,
	});

	const checkoutSession = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		metadata: {
			cartId: cart.id,
		},
		line_items: cart.orderItems.map((item) => ({
			price_data: {
				currency: "usd",
				product_data: {
					name: item.product?.name || "",
				},
				unit_amount: item.product?.price || 0,
			},
			quantity: item.quantity,
		})),
		mode: "payment",
		success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart/success?sessionId={CHECKOUT_SESSION_ID}`,
		cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart/cancel`,
	});

	if (!checkoutSession.url) {
		throw new Error("Missing checkout session url");
	}

	cookies().set("cartId", "");
	redirect(checkoutSession.url);
}
