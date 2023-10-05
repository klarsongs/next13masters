export const Textarea = ({
	name,
	label,
	required,
}: {
	name: string;
	label: string;
	required?: boolean;
}) => {
	return (
		<>
			<label htmlFor={name}>{label}</label>
			<textarea
				name={name}
				rows={5}
				className="mb-4 w-full rounded-lg border border-gray-300 p-2 focus:outline-green-400"
				required={required}
				maxLength={1000}
			/>
		</>
	);
};
