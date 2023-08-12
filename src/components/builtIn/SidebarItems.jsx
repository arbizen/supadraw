"use client";

import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function SidebarItems({ items }) {
  const pathname = usePathname();
  const router = useRouter();
  console.log();
  return (
    <div className="border-t border-b p-4 py-6 space-y-2">
      {items &&
        items.map((item, i) => (
          <Button
            key={i}
            disabled={item?.disabled}
            onClick={() => {
              router.push(item.pathname);
            }}
            variant={pathname === item.pathname ? "default" : "outline"}
            className="flex gap-2 w-full justify-start"
          >
            {item.icon} {item.name}
          </Button>
        ))}
    </div>
  );
}
