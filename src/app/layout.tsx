import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {
	ClerkLoaded,
	ClerkLoading,
	ClerkProvider,
	MultisessionAppSupport,
} from "@clerk/nextjs";
import { NavBar } from "@/ui/organisms/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "the store",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="pl">
			<ClerkProvider>
				<body className={inter.className}>
					<NavBar />
					<section className="mx-auto max-w-md p-12 sm:max-w-2xl sm:py-16 md:max-w-4xl lg:max-w-7xl">
						{children}
					</section>
					<footer className="text-center text-sm text-gray-500">
						<p>© 2023</p>
					</footer>
				</body>
			</ClerkProvider>
		</html>
	);
}
