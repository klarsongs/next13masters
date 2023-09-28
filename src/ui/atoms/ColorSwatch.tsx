"use client";
import clsx from "clsx";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export const ColorSwatch = ({ color }: { color: string }) => {
	const searchParams = useSearchParams();
	const selected = searchParams.get("color") === color;
	const size = searchParams.get("size");

	const colorClasses = {
		red: "bg-red-500",
		orange: "bg-orange-500",
		yellow: "bg-yellow-500",
		green: "bg-green-500",
		teal: "bg-teal-500",
		blue: "bg-blue-500",
		indigo: "bg-indigo-500",
		purple: "bg-purple-500",
		pink: "bg-pink-500",
		black: "bg-neutral-900",
	};

	return (
		<Link
			href={{
				query: { ...(size && { size }), color },
			}}
			scroll={false}
		>
			<span
				className={clsx(
					"inline-block h-6 w-6 rounded-full shadow-lg",
					color && colorClasses[color as keyof typeof colorClasses]
						? colorClasses[color as keyof typeof colorClasses]
						: "bg-gray-500",
					selected && `border-4 border-double border-neutral-900`,
					color === "black" && "border-slate-100",
				)}
			/>
		</Link>
	);
};
