/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/server";
import { getProductById } from "@/api/products";

export const runtime = "edge";

export const contentType = "image/png";
export const size = {
	width: 1200,
	height: 630,
};
export const alt = "OpenGraph image";

export default async function OpenGraphImage({
	params: { productId },
}: {
	params: { productId: string };
}) {
	const product = await getProductById(productId);

	return new ImageResponse(
		(
			<div
				tw="text-black flex items-center justify-center w-full h-full"
				style={{
					background: "white",
				}}
			>
				{product?.images[0] && (
					<div tw="flex w-[500px] p-8">
						<img src={product?.images[0]?.url} />
					</div>
				)}
				<div tw="flex flex-col w-[350px] ">
					<p tw="font-sans text-[64px]">{product?.name}</p>
					<p tw="font-serif m-0 p-0 text-[24px]">
						{product?.description}
					</p>
				</div>
			</div>
		),
	);
}
