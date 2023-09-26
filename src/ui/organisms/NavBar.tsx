// Check Lucide icons
import { ActiveLink } from "@/ui/atoms/ActiveLink";

export const NavBar = () => {
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
				<li>
					<ActiveLink href="/categories" exact={false}>
						Categories
					</ActiveLink>
				</li>
			</ul>
		</nav>
	);
};
