import NextImage from "next/image";

type Props = {
	src: string;
	alt: string;
	width?: number;
	height?: number;
};

export const ProductImage = ({
	src,
	alt,
	width = 256,
	height = 256,
}: Props) => {
	return (
		<div className="overflow-hidden rounded-md border bg-slate-100">
			<NextImage
				src={src}
				alt={alt}
				width={width}
				height={height}
				className="h-full w-full object-cover object-center p-4"
			/>
		</div>
	);
};
