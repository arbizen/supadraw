"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

export default function SidebarItems({ items }) {
  const pathname = usePathname();
  console.log();
  return (
    <div className="border-t border-b p-4 space-y-2">
      {items &&
        items.map((item, i) => (
          <Link key={i} href={item.pathname} className="block">
            <Button
              variant={pathname === item.pathname ? "default" : "outline"}
              className="flex gap-2 w-full justify-start"
            >
              {item.icon} {item.name}
            </Button>
          </Link>
        ))}
    </div>
  );
}
