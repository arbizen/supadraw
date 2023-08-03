import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen md:bg-[url(https://play.tailwindcss.com/img/grid.svg)] bg-center">
      <div className="max-w-2xl h-full mx-auto py-12 bg-[url(https://play.tailwindcss.com/img/grid.svg) md:bg-white shadow-md px-12">
        <p className="px-6 py-1 border rounded-full inline-block">Supadraw</p>
        <div className="flex h-5 items-center space-x-4 text-sm mt-6">
          <Link href="#">Login</Link>
          <Separator orientation="vertical" />
          <Link href="#">Register</Link>
        </div>
        <h1 className="mt-6 scroll-m-20 text-4xl font-extrabold leading-7 tracking-tight">
          Draw like an artist.
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Feature-riched drawing pad, stunning colors, blazing fast brushes.
          Sketch your dream and share with millions.
        </p>
        <div className="py-6">
          <Button>Start drawing</Button>
        </div>
      </div>
    </div>
  );
}
