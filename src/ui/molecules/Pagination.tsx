import { type Route } from "next";
import { PER_PAGE } from "@/constants";
import { ActiveLink } from "@/ui/atoms/ActiveLink";

export const Pagination = ({
	totalCount,
	nextHref,
}: {
	totalCount: number;
	nextHref: (pageNumber: number) => Route;
}) => {
	const pages = Math.ceil(totalCount / PER_PAGE);

	return (
		<ul className="flex gap-4" aria-label="pagination">
			{Array.from({ length: pages }, (_, i) => (
				<li key={`pagination-${i}`}>
					<ActiveLink href={nextHref(i + 1)}>{i + 1}</ActiveLink>
				</li>
			))}
		</ul>
	);
};
