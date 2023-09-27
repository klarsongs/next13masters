// Check Lucide icons
import { getProductsCategories } from "@/api/products";
import { ActiveLink } from "@/ui/atoms/ActiveLink";

export const NavBar = async () => {
	const categories = await getProductsCategories();
	return (
		<nav>
			<ul className="my-4 flex justify-center space-x-6">
				<li>
					<ActiveLink href="/">Homepage</ActiveLink>
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
		</nav>
	);
};
