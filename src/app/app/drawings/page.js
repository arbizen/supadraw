import Dratfs from "@/components/builtIn/Drafts";
import Published from "@/components/builtIn/Published";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pen, Upload } from "lucide-react";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function DrawingPage() {
  const uuid = uuidv4();
  const supabase = createServerComponentClient({ cookies });
  const { data: userData } = await supabase.auth.getUser();
  const { data } = await supabase
    .from("drawings")
    .select()
    .eq("user_id", userData.user.id);
  const dratfs = data.filter((drawing) => drawing.type === "draft");
  const published = data.filter((drawing) => drawing.type === "published");
  return (
    <div className="p-4">
      <div className="flex gap-4">
        <Link
          href={`/pad/${uuid}`}
          className="inline-flex gap-2 h-10 w-auto px-4 md:h-16 md:w-60 cursor-pointer justify-center items-center md:font-medium text-sm text-accent-foreground border rounded-md hover:bg-accent hover:text-accent-foreground"
        >
          <Pen size={15} />
          New drawing
        </Link>
        <div className="inline-flex gap-2 h-10 w-auto px-4 md:h-16 md:w-60 cursor-not-allowed justify-center items-center md:font-medium text-sm text-slate-300 border border-slate-100 rounded-md">
          <Upload size={15} />
          Upload drawing
        </div>
      </div>
      <div className="my-6">
        <Tabs defaultValue="drafts">
          <TabsList className="flex items-center justify-start w-full">
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
          </TabsList>
          <TabsContent value="drafts">
            <Dratfs data={dratfs} />
          </TabsContent>
          <TabsContent value="published">
            <Published data={published} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
