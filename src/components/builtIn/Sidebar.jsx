import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ClientSidebar from "./ClientSidebar";

export const dynamic = "force-dynamic";

export default async function Sidebar() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getUser();
  return (
    <div>
      <ClientSidebar data={data} />
    </div>
  );
}
