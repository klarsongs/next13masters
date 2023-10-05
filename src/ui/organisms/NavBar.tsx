import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Search } from "../atoms/Search";
import { getProductsCategories } from "@/api/products";
import { ActiveLink } from "@/ui/atoms/ActiveLink";
import { getCartFromCookies } from "@/api/cart";

export const NavBar = async () => {
	const categories = await getProductsCategories();
	const cart = await getCartFromCookies();
	const quantity = cart?.orderItems.reduce(
		(acc, item) => acc + (item.quantity ?? 0),
		0,
	);
	return (
		<nav
			className="mx-6 my-2 flex justify-between align-middle"
			role="navigation"
		>
			<ul className="my-4 flex justify-center space-x-6">
				<li>
					<ActiveLink href="/">Home</ActiveLink>
				</li>
				<li>
					<ActiveLink href="/products" exact={false}>
						All
					</ActiveLink>
				</li>
				{categories.map((category) => (
					<li key={category.slug}>
						<ActiveLink
							href={`/categories/${category.slug}`}
							exact={false}
						>
							{category.name}
						</ActiveLink>
					</li>
				))}
			</ul>
			<div className="flex items-center gap-6">
				<Search />
				{quantity && quantity > 0 ? (
					<div>
						<Link
							href="/cart"
							className="group -m-2 flex items-center p-2"
						>
							<ShoppingCart className="h-6 w-6 text-gray-400 group-hover:text-gray-500" />
							<span className="ml-2 text-sm font-medium text-gray-900">
								{quantity}
							</span>
							<span className="sr-only">View cart</span>
						</Link>
					</div>
				) : null}
			</div>
		</nav>
	);
};
