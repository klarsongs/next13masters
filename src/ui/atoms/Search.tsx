"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Search = () => {
	const [typingTimeout, setTypingTimeout] =
		useState<ReturnType<typeof setTimeout>>();

	const router = useRouter();

	const handleSearch = (search: string): void => {
		if (search !== "") {
			router.push(`/search?query=${search}`);
		} else {
			router.push("/");
		}
	};

	const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const newTypingTimeout = setTimeout(() => {
			handleSearch((e.target as HTMLInputElement).value);
		}, 500);

		setTypingTimeout(newTypingTimeout);
	};

	const handleChange = () => {
		if (typingTimeout) {
			clearTimeout(typingTimeout);
		}
	};

	return (
		<div className="flex items-center justify-center bg-white font-sans text-black">
			<div className="flex overflow-hidden rounded border">
				<input
					type="text"
					className="px-4 py-2"
					placeholder="Search..."
					onFocus={(e) => e.target.select()}
					onKeyUp={handleKeyUp}
					onChange={handleChange}
					role="searchbox"
				/>
			</div>
		</div>
	);
};
