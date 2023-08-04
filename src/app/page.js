import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/builtIn/Header";

export default function Home() {
  return (
    <div className="h-screen md:bg-[url(https://play.tailwindcss.com/img/grid.svg)] bg-center">
      <div className="max-w-2xl h-full mx-auto py-12 bg-[url(https://play.tailwindcss.com/img/grid.svg) md:bg-white shadow-md px-12">
        <Header />
        <h1 className="pt-6 scroll-m-20 text-4xl font-extrabold leading-7 tracking-tight">
          Draw like an artist.
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Feature-riched drawing pad, stunning colors, blazing fast brushes.
          Sketch your dream and share with millions.
        </p>
        <div className="py-6 flex gap-2">
          <Link href="/login">
            <Button>Start drawing</Button>
          </Link>
          <Link href="#">
            <Button variant="outline">Explore</Button>
          </Link>
        </div>
        <div className="mt-6 flex items-center gap-2">
          <h3 className="text-lg font-bold leading-7 tracking-tight">
            Built with
          </h3>
          <Image
            alt="supabase-logo"
            className="rounded-md"
            src="/images/supabase.jpg"
            height={25}
            width={25}
          />
        </div>
      </div>
    </div>
  );
}
