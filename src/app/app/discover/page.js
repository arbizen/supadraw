import SharedDrawing from "@/components/builtIn/SharedDrawing";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function DiscoverPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase
    .from("drawings")
    .select()
    .eq("type", "published")
    .order("created_at", { ascending: false });
  return (
    <div className="p-4">
      <div>
        <Select disabled={data.length === 0}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="most-recent">Most recent</SelectItem>
            <SelectItem value="popular">Popular</SelectItem>
            <SelectItem value="old">Old</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="my-6">
        <div className="flex flex-col items-center md:grid md:grid-cols-3 gap-4">
          {data.length === 0 && (
            <p className="text-muted-foreground text-sm">
              Nothing to discover yet.
            </p>
          )}
          {data.map((drawing, i) => (
            <SharedDrawing key={i} data={drawing} />
          ))}
        </div>
      </div>
    </div>
  );
}
