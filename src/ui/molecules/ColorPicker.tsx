import { ColorSwatch } from "../atoms/ColorSwatch";

export const ColorPicker = ({ colors }: { colors: string[] }) => {
	return (
		<ul className="flex gap-4">
			{colors.map((color) => (
				<li key={`color-swatch-${color}`}>
					<ColorSwatch color={color} />
				</li>
			))}
		</ul>
	);
};
