"use client";

import { Button } from "@/components/ui/button";
import { Moon } from "lucide-react";
import { usePathname } from "next/navigation";

export default function AppHeader() {
  const pathname = usePathname();
  const HeaderTitle =
    pathname.split("/").at(-1).charAt(0).toUpperCase() +
    pathname.split("/").at(-1).slice(1);
  return (
    <div className="min-h-[48px] border-b p-4 flex items-center">
      <p className="font-bold">{HeaderTitle}</p>
      <div className="flex-1 flex justify-end items-center">
        <Button size="sm" variant="outline">
          <Moon size={20} />
        </Button>
      </div>
    </div>
  );
}
