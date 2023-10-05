import { ImageResponse } from "next/server";

/**
 * The runtime environment for the OpenGraph image. Good use case.
 */
export const runtime = "edge";

export const contentType = "image/png";
export const size = {
	width: 1200,
	height: 630,
};
export const alt = "OpenGraph image";

export default function OpenGraphImage({}) {
	return new ImageResponse(<div>Siema</div>);
}
