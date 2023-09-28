"use client";

import clsx from "clsx";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export const SizePicker = ({ sizes }: { sizes: string[] }) => {
	const searchParams = useSearchParams();
	const color = searchParams.get("color");
	const selected = searchParams.get("size");

	return (
		<ul className="flex gap-4">
			{sizes.length > 0 &&
				sizes.map((size) => (
					<li
						key={`size-${size}`}
						className={clsx(
							"cursor-pointer",
							selected?.toUpperCase() === size &&
								"border-b-2 border-neutral-900",
						)}
					>
						<Link
							href={{
								query: {
									size: size.toLowerCase(),
									...(color && { color }),
								},
							}}
							scroll={false}
						>
							{size}
						</Link>
					</li>
				))}
		</ul>
	);
};
