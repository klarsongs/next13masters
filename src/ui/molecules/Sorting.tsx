"use client";
import Link from "next/link";
import { ArrowDown, ArrowUp } from "lucide-react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { type ProductOrderByInput } from "@/gql/graphql";

export const Sorting = ({
	sortBy,
}: {
	sortBy: ProductOrderByInput;
}) => {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setLoaded(true);
		}, 300);
	}, []);

	return (
		<div
			className={clsx(
				"translate-x-full opacity-0 transition-transform",
				!loaded && "invisible",
				loaded && "visible translate-x-0 opacity-100",
			)}
		>
			<div className="flex gap-6">
				<Link
					data-testid="sort-by-price"
					href={`/products?sortBy=${
						sortBy === "price_ASC" ? "price_DESC" : "price_ASC"
					}`}
					className="border-b-2 border-transparent uppercase hover:border-black"
				>
					<div className="flex items-center">
						<span>Price</span>
						{sortBy === "price_ASC" && <ArrowUp className="w-5" />}
						{sortBy === "price_DESC" && <ArrowDown className="w-5" />}
					</div>
				</Link>
				<Link
					data-testid="sort-by-rating"
					className="border-b-2 border-transparent uppercase hover:border-black"
					href={`/products?sortBy=${
						sortBy === "rating_ASC" ? "rating_DESC" : "rating_ASC"
					}`}
				>
					<div className="flex items-center">
						<span>Rating</span>
						{sortBy === "rating_ASC" && <ArrowUp className="w-5" />}
						{sortBy === "rating_DESC" && (
							<ArrowDown className="w-5" />
						)}
					</div>
				</Link>
				<Link
					href="/products"
					className="border-b-2 border-transparent uppercase hover:border-black"
				>
					Default
				</Link>
			</div>
		</div>
	);
};
