"use client";

import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import {
  Bookmark,
  Dot,
  Forward,
  MoreVertical,
  Trash,
  Undo,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Close } from "@radix-ui/react-dialog";
import { Close as PopoverClose } from "@radix-ui/react-popover";
import { useToast } from "../ui/use-toast";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { formatTimeAgo } from "@/lib/formatTimeAgo";

export default function Drawing({ data }) {
  const name = data?.name || "untitled";
  const previewData = data?.preview_data || "/images/doll-sketch.jpg";
  const id = data?.id;
  const drawing_id = data?.drawing_id;
  const type = data?.type;
  const created_at = data?.created_at;
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleDelete = async () => {
    await supabase.from("drawings").delete().eq("id", id);

    toast({
      description: "Drawing deleted.",
    });
    router.refresh();
  };

  const handleBookmark = async () => {
    const { error } = await supabase.from("bookmarks").insert({
      drawing_id: id,
    });
    console.log(error);
    toast({
      description: "Added to bookmark.",
    });
  };

  const handlePublish = async () => {
    await supabase.from("drawings").update({ type: "published" }).eq("id", id);
    toast({
      description: "Published.",
    });
    router.refresh();
  };

  const handleUnpublish = async () => {
    await supabase.from("drawings").update({ type: "draft" }).eq("id", id);
    toast({
      description: "Unpublished.",
    });
    router.refresh();
  };

  const { toast } = useToast();
  return (
    <Card className="w-full md:min-w-[280px]">
      <CardContent className="space-y-3 flex flex-col">
        <Link href={`/pad/${drawing_id}`} className="flex justify-center mt-4">
          <Image
            src={previewData}
            alt=""
            className="h-[200px] w-auto"
            height={400}
            width={200}
          />
        </Link>
        <Separator orientation="horizontal" />
        <div className="flex justify-between items-center gap-2">
          <p className="font-medium text-base flex-1 truncate">{name}</p>
          <Popover>
            <PopoverTrigger asChild>
              <MoreVertical className="cursor-pointer" size={18} />
            </PopoverTrigger>
            <PopoverContent className="w-auto py-2 px-2 space-y-2">
              {type === "draft" && (
                <PopoverClose asChild>
                  <div
                    onClick={handlePublish}
                    className="flex gap-2 items-center hover:bg-[#eee] px-2 py-1 rounded-md cursor-pointer"
                  >
                    <Forward size={15} />
                    Publish
                  </div>
                </PopoverClose>
              )}
              {type === "published" && (
                <PopoverClose asChild>
                  <div
                    onClick={handleUnpublish}
                    className="flex gap-2 items-center hover:bg-[#eee] px-2 py-1 rounded-md cursor-pointer"
                  >
                    <Undo size={15} />
                    Unpublish
                  </div>
                </PopoverClose>
              )}
              <Dialog>
                <DialogTrigger asChild>
                  <div className="flex gap-2 items-center hover:bg-[#eee] px-2 py-1 rounded-md cursor-pointer">
                    <Trash size={15} />
                    Delete
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete the drawing?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      the drawing.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Close>
                      <PopoverClose>
                        <Button onClick={handleDelete} variant="destructive">
                          Delete
                        </Button>
                      </PopoverClose>
                    </Close>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <PopoverClose>
                <div
                  onClick={handleBookmark}
                  className="flex gap-2 items-center hover:bg-[#eee] px-2 py-1 rounded-md cursor-pointer"
                >
                  <Bookmark size={15} />
                  Bookmark
                </div>
              </PopoverClose>
            </PopoverContent>
          </Popover>
        </div>
        <Separator orientation="horizontal" />
        <div className="flex items-center gap-1">
          <p className="text-sm text-muted-foreground">
            {type !== "draft" ? "Published" : "In Draft"}
          </p>
          <Dot size={15} />
          <p className="text-sm text-muted-foreground">
            {formatTimeAgo(created_at)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
