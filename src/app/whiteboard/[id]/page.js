import Whiteboard from "@/components/builtIn/Whiteboard";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function WhiteboardPage({ params }) {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase
    .from("whiteboards")
    .select()
    .eq("whiteboard_id", params.id);
  const boardData = data[0];
  return (
    <div className="h-screen">
      <Whiteboard boardData={boardData} pageId={params.id} />
    </div>
  );
}
