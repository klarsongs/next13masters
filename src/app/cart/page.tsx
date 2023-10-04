import { redirect } from "next/navigation";
import { ChangeProductQuantity } from "./ChangeProductQuantity";
import { RemoveButton } from "./RemoveButton";
import { handlePaymentAction } from "./actions";
import { getCartFromCookies } from "@/api/cart";
import { formatMoney } from "@/utils";

export default async function CartPage() {
	const cart = await getCartFromCookies();

	if (!cart) {
		redirect("/");
	}

	return (
		<div className="mt-10">
			<h1 className="mb-8 mt-12 text-3xl font-bold">Order summary</h1>
			<table className="w-full">
				<thead>
					<tr>
						<th className="text-left">Product</th>
						<th className="text-left">Amount</th>
						<th className="text-left">Price</th>
					</tr>
				</thead>
				<tbody>
					{cart.orderItems.map(
						(item) =>
							item.product && (
								<tr key={item.product.id}>
									<td>{item.product.name}</td>
									<td>
										<ChangeProductQuantity
											quantity={item.quantity}
											itemId={item.id}
											cart={cart}
										/>
									</td>
									<td>
										{formatMoney(item.product.price * item.quantity)}
									</td>
									<td className="text-right">
										<RemoveButton itemId={item.id} cart={cart} />
									</td>
								</tr>
							),
					)}
				</tbody>
			</table>
			<hr className="border-grey-100 mt-12" />
			<div className="mt-8 text-right">
				<div className=" flex justify-end">
					<p className="text-left text-lg">
						Total: <strong>{formatMoney(cart.total)}</strong>
					</p>
				</div>
				<form action={handlePaymentAction}>
					<button
						type="submit"
						className="mt-6 w-44 rounded-full bg-green-300 px-6 py-2 shadow-lg transition-colors hover:bg-green-200 disabled:cursor-wait disabled:bg-slate-200 disabled:text-slate-400"
					>
						Pay
					</button>
				</form>
			</div>
		</div>
	);
}
