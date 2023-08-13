"use client";

import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { Bookmark, Dot, Heart } from "lucide-react";
import { Separator } from "../ui/separator";
import { useToast } from "../ui/use-toast";
import { formatTimeAgo } from "@/lib/formatTimeAgo";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function SharedDrawing({ data }) {
  const supabase = createClientComponentClient();
  const name = data?.name || "untitled";
  const previewData = data?.preview_data || "/images/doll-sketch.jpg";
  const id = data?.id;
  const drawing_id = data?.drawing_id;
  const by = data?.by;
  const created_at = data?.created_at;
  const likes = data?.likes || 0;
  const [stateLlikes, setStateLikes] = useState(data?.likes || 0);
  const { toast } = useToast();
  const handleLike = async () => {
    setStateLikes(stateLlikes + 1);
    await supabase
      .from("drawings")
      .update({ likes: stateLlikes + 1 })
      .eq("drawing_id", drawing_id);
    toast({
      description: "You loved the drawing.",
    });
  };
  const handleBookmark = async () => {
    await supabase.from("bookmarks").insert({
      drawing_id: id,
    });
    toast({
      description: "Added to bookmark.",
    });
  };
  if (name && by && created_at && previewData)
    return (
      <Card className="w-full md:min-w-[280px]">
        <CardContent className="space-y-3">
          <Link href="#" className="flex justify-center mt-4">
            <Image
              src={previewData}
              className="h-[200px] w-auto"
              alt=""
              height={200}
              width={200}
            />
          </Link>
          <Separator orientation="horizontal" />
          <div className="flex justify-between items-center gap-2">
            <div className="flex flex-col gap-1 flex-1">
              <p className="font-medium text-base flex-1 truncate">{name}</p>
              <p className="text-sm text-muted-foreground truncate">by {by}</p>
            </div>
            <div className="flex gap-4">
              <Heart
                onClick={handleLike}
                className="cursor-pointer"
                size={18}
              />
              <Bookmark
                onClick={handleBookmark}
                className="cursor-pointer"
                size={18}
              />
            </div>
          </div>
          <Separator orientation="horizontal" />
          <div className="flex items-center gap-1">
            <p className="text-sm text-muted-foreground">{stateLlikes} likes</p>
            <Dot size={15} />
            <p className="text-sm text-muted-foreground">
              {formatTimeAgo(created_at)}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  else {
    return (
      <Card className="w-full min-h-[200px] md:max-w-[280px] flex items-center justify-center p-6">
        <p className="text-sm text-muted-foreground pl-4 border-l-2">
          This drawing was deleted by the owner.
        </p>
      </Card>
    );
  }
}
