import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Bookmark,
  ChevronDown,
  LayoutDashboard,
  Search,
  Share,
} from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import Signout from "./Signout";
import SidebarItems from "./SidebarItems";

export const dynamic = "force-dynamic";

export function SidebarHeader({ children }) {
  return <div className="min-h-[48px] w-full p-4">{children}</div>;
}

export default async function Sidebar() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getUser();
  const items = [
    {
      name: "Drawings",
      icon: <LayoutDashboard size={15} />,
      pathname: "/app/drawings",
    },
    {
      name: "Discover",
      icon: <Search size={15} />,
      pathname: "/app/discover",
    },
    {
      name: "Bookmarks",
      icon: <Bookmark size={15} />,
      pathname: "/app/bookmarks",
    },
  ];
  //console.log(data.user);
  return (
    <div>
      <SidebarHeader>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="outline" className="flex gap-2 p-4" size="lg">
              <Avatar className="h-8 w-8 text-sm">
                <AvatarImage src={data.user.user_metadata.avatar_url} />
                <AvatarFallback className="bg-primary text-white">
                  {data.user.user_metadata.full_name
                    ? data.user.user_metadata.full_name[0]
                    : "A"}
                </AvatarFallback>
              </Avatar>
              <p>{data.user.user_metadata.full_name}</p>
              <ChevronDown size={15} />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex flex-col items-center w-full">
              <Avatar>
                <AvatarImage src={data.user.user_metadata.avatar_url} />
                <AvatarFallback className="bg-primary text-white">
                  {data.user.user_metadata.full_name
                    ? data.user.user_metadata.full_name[0]
                    : "A"}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-bold pt-2">
                {data.user.user_metadata.full_name}
              </h3>
              <p className="text-muted-foreground text-sm">
                {data.user.user_metadata.email}
              </p>
            </div>
            <div className="w-full border-t mt-4">
              <Signout className="w-full" />
            </div>
          </HoverCardContent>
        </HoverCard>
      </SidebarHeader>
      <div className="mt-6">
        <SidebarItems items={items} />
      </div>
    </div>
  );
}
