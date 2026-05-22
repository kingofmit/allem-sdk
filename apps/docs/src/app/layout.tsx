import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Allem SDK - React Developer SDK",
  description:
    "AI hooks, form management, analytics, authentication, and utility hooks for React. Open source and production-ready.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white">
        {children}
      </body>
    </html>
  );
}
