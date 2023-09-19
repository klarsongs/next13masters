import { ActiveLink } from "@/ui/atoms/ActiveLink";

export const Pagination = ({
	totalCount,
}: {
	totalCount: number;
}) => {
	const PER_PAGE = 20;
	const pages = Math.ceil(totalCount / PER_PAGE);

	return (
		<ul className="flex gap-4" aria-label="pagination">
			{Array.from({ length: pages }, (_, i) => (
				<li key={`pagination-${i}`}>
					<ActiveLink href={`/products/${i + 1}`}>{i + 1}</ActiveLink>
				</li>
			))}
		</ul>
	);
};
