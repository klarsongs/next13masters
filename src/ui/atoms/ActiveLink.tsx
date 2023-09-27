"use client";

import Link from "next/link";
import clsx, { type ClassValue } from "clsx";
import { usePathname } from "next/navigation";
import { type Route } from "next";

type ActiveLinkProps<T extends string> = {
	href: Route<T>;
	children: React.ReactNode;
	className?: ClassValue;
	activeClassName?: ClassValue;
	exact?: boolean;
};

export const ActiveLink = <T extends string>({
	href,
	children,
	className = "text-neutral-600 hover:text-neutral-900",
	activeClassName = "border-b-2 border-green-400",
	exact = true,
}: ActiveLinkProps<T>) => {
	const pathname = usePathname();
	const isActive = exact
		? pathname === href
		: pathname === href ||
		  (href.length > 1 && pathname.startsWith(href));

	return (
		<Link
			href={href}
			className={clsx(className, isActive && activeClassName)}
		>
			{children}
		</Link>
	);
};
