"use client";

import clsx from "clsx";

import { Star } from "lucide-react";
import { useState } from "react";

export const InputRating = ({ name }: { name: string }) => {
	const [currentRating, setRating] = useState(0);
	const [hoveredRating, setHoveredRating] = useState(0);

	return (
		<fieldset
			className="stars-rating mb-4 flex flex-row-reverse justify-end"
			name={name}
			onMouseLeave={() => setHoveredRating(0)}
		>
			<legend className="mb-2">Rating</legend>
			<input
				className="sr-only"
				id="rating-5"
				type="radio"
				value={5}
				name="rating"
				onChange={(e) => setRating(Number(e.target.value))}
			/>
			<label htmlFor="rating-5">
				<Star
					className={clsx(
						"h-8 w-8 cursor-pointer",
						currentRating === 5 && "fill-green-400",
						hoveredRating === 5 && "fill-green-500",
					)}
					onMouseEnter={() => setHoveredRating(5)}
				/>
				<span className="sr-only">5 stars</span>
			</label>

			<input
				className="sr-only"
				id="rating-4"
				type="radio"
				value={4}
				name="rating"
				onChange={(e) => setRating(Number(e.target.value))}
			/>
			<label htmlFor="rating-4">
				<Star
					className={clsx(
						"h-8 w-8 cursor-pointer",
						currentRating >= 4 && "fill-green-400",
						hoveredRating >= 4 && "fill-green-500",
					)}
					onMouseEnter={() => setHoveredRating(4)}
				/>
				<span className="sr-only">4 stars</span>
			</label>

			<input
				className="sr-only"
				id="rating-3"
				type="radio"
				value={3}
				name="rating"
				onChange={(e) => setRating(Number(e.target.value))}
			/>
			<label htmlFor="rating-3">
				<Star
					className={clsx(
						"h-8 w-8 cursor-pointer",
						currentRating >= 3 && "fill-green-400",
						hoveredRating >= 3 && "fill-green-500",
					)}
					onMouseEnter={() => setHoveredRating(3)}
				/>
				<span className="sr-only">3 stars</span>
			</label>

			<input
				className="sr-only"
				id="rating-2"
				type="radio"
				value={2}
				name="rating"
				onChange={(e) => setRating(Number(e.target.value))}
			/>
			<label htmlFor="rating-2">
				<Star
					className={clsx(
						"h-8 w-8 cursor-pointer",
						currentRating >= 2 && "fill-green-400",
						hoveredRating >= 2 && "fill-green-500",
					)}
					onMouseEnter={() => setHoveredRating(2)}
				/>
				<span className="sr-only">2 stars</span>
			</label>

			<input
				className="sr-only"
				id="rating-1"
				type="radio"
				value={1}
				name="rating"
				onChange={(e) => setRating(Number(e.target.value))}
			/>
			<label htmlFor="rating-1">
				<Star
					className={clsx(
						"h-8 w-8 cursor-pointer",
						currentRating >= 1 && "fill-green-400",
						hoveredRating >= 1 && "fill-green-500",
					)}
					onMouseEnter={() => setHoveredRating(1)}
				/>
				<span className="sr-only">1 star</span>
			</label>

			<input
				readOnly
				className="sr-only"
				id="rating-0"
				value={0}
				name="rating"
				checked={currentRating === 0}
			/>
		</fieldset>
	);
};
