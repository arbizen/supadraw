"use client";

import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { Bookmark, Dot, MoreVertical, Trash } from "lucide-react";
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

export default function Drawing({ data }) {
  const name = data?.name || "untitled";
  const isPublished = data?.isPublished || false;
  const { toast } = useToast();
  return (
    <Card className="w-full md:max-w-[280px]">
      <CardContent className="space-y-3">
        <Link href="#" className="flex justify-center mt-4">
          <Image
            src="/images/doll-sketch.jpg"
            alt=""
            height={200}
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
                        <Button
                          onClick={() => {
                            toast({
                              description: "Drawing deleted.",
                            });
                          }}
                          variant="destructive"
                        >
                          Delete
                        </Button>
                      </PopoverClose>
                    </Close>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <PopoverClose>
                <div
                  onClick={() => {
                    toast({
                      description: "Added to bookmark.",
                    });
                  }}
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
            {isPublished ? "Published" : "In Draft"}
          </p>
          <Dot size={15} />
          <p className="text-sm text-muted-foreground">2 days ago</p>
        </div>
      </CardContent>
    </Card>
  );
}
