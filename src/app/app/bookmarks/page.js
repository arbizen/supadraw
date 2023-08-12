import SharedDrawing from "@/components/builtIn/SharedDrawing";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function BookmarksPage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data } = await supabase
    .from("bookmarks")
    .select(`drawings(*)`)
    .eq("user_id", user.id);
  const bookmarkedDrawingData = data?.map((d) => d.drawings);
  return (
    <div className="p-4">
      <div className="flex flex-col items-center md:grid md:grid-cols-3 gap-4">
        {bookmarkedDrawingData.length === 0 && (
          <p className="text-muted-foreground text-sm">
            Your bookmarks will be here.
          </p>
        )}
        {bookmarkedDrawingData.map((data, i) => (
          <SharedDrawing key={i} data={data} />
        ))}
      </div>
    </div>
  );
}
