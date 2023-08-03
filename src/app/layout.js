import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Supadraw",
  description: "Draw like never before",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-screen md:bg-[url(https://play.tailwindcss.com/img/grid.svg)] bg-center">
          <div className="max-w-2xl h-full mx-auto py-12 bg-[url(https://play.tailwindcss.com/img/grid.svg) md:bg-white shadow-md px-12">
            <p className="px-6 py-1 border rounded-full inline-block">
              Supadraw
            </p>
            <div className="flex h-5 items-center space-x-4 text-sm mt-6">
              <Link href="/">Home</Link>
              <Separator orientation="vertical" />
              <Link href="/login">Login</Link>
            </div>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
