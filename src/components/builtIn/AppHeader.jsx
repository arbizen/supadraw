"use client";

import { Button } from "@/components/ui/button";
import { Menu, Moon } from "lucide-react";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import ClientSidebar from "./ClientSidebar";

export default function AppHeader() {
  const pathname = usePathname();
  const [userData, setUserData] = useState(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      setUserData(data);
    })();
  }, []);

  const HeaderTitle =
    pathname.split("/").at(-1).charAt(0).toUpperCase() +
    pathname.split("/").at(-1).slice(1);
  return (
    <div className="min-h-[48px] border-b p-4 flex items-center">
      <Sheet>
        <SheetTrigger asChild>
          <Menu className="mr-4 md:hidden" size={20} />
        </SheetTrigger>
        <SheetContent className="p-0" side="left">
          {userData && <ClientSidebar data={userData} />}
        </SheetContent>
      </Sheet>
      <p className="font-bold">{HeaderTitle}</p>
      <div className="flex-1 flex justify-end items-center">
        <Button size="sm" variant="outline">
          <Moon size={20} />
        </Button>
      </div>
    </div>
  );
}
