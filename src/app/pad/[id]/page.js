import DrawingPad from "@/components/builtIn/DrawingPad";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function DrawingPadPage({ params }) {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase
    .from("drawings")
    .select()
    .eq("drawing_id", params.id);
  console.log(`DRAWING DATA FROM SINGLE PAGE: `, data);
  const drawingData = data[0];
  return <DrawingPad drawingData={drawingData} pageId={params.id} />;
}
