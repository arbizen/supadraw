import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Icons } from "./icons";

export default function Header() {
  return (
    <header className="flex items-center justify-between mb-6">
      <Link href="/">
        <Button className="px-6 py-1.5 rounded-full h-auto">Supadraw</Button>
      </Link>
      <div className="flex h-5 items-center space-x-4 text-base">
        <Link href="/">Home</Link>
        <Separator orientation="vertical" />
        <Link href="/login">Login</Link>
        <Separator orientation="vertical" className="hidden md:block" />
        <Link
          className="hidden md:block"
          href="https://x.com/arbizzen"
          target="_blank"
        >
          <Icons.twitter className="mr-2 h-4 w-4" />
        </Link>
        <Separator orientation="vertical" className="hidden md:block" />
        <Link
          className="hidden md:block"
          href="https://github.com/arbizen/supadraw"
          target="_blank"
        >
          <Icons.gitHub className="mr-2 h-4 w-4" />
        </Link>
      </div>
    </header>
  );
}
