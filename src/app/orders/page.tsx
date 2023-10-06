import { currentUser } from "@clerk/nextjs";
import { getOrdersForUserId } from "@/api/orders";
import { formatMoney } from "@/utils";

export default async function Orders() {
	const user = await currentUser();

	if (!user) {
		return <p>Error! Not logged in.</p>;
	}

	const orders = await getOrdersForUserId(user?.id);

	return (
		<>
			<h2 className="mb-4 mt-12 text-2xl font-bold">Your orders</h2>
			{(orders.length === 0 || !orders) && <p>No orders</p>}
			<ul>
				{orders.map((order) => (
					<li key={order.id} className="mt-8">
						<h3 className="text-lg">
							Order number: <span>{order.id}</span>
						</h3>
						<ul className="mt-2">
							{order.orderItems.map((item, index) => (
								<li key={item.id} className="ml-4">
									<span>{index + 1}. </span>
									{item.product?.name}
									<span className="ml-3">
										{item.product?.price &&
											formatMoney(item.product?.price)}
									</span>
								</li>
							))}
						</ul>
					</li>
				))}
			</ul>
		</>
	);
}
