import { type InputHTMLAttributes } from "react";

export const Input = ({
	label,
	name,
	required,
	inputProps,
}: {
	label: string;
	name: string;
	required?: boolean;
	inputProps?: InputHTMLAttributes<HTMLInputElement>;
}) => {
	return (
		<div className="mb-4">
			<label htmlFor={name}>{label}</label>
			<input
				className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:outline-green-400"
				id={name}
				name={name}
				required={required}
				{...inputProps}
			/>
		</div>
	);
};
