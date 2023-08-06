"use client";

import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { Dot, Heart } from "lucide-react";
import { Separator } from "../ui/separator";
import { useToast } from "../ui/use-toast";

export default function SharedDrawing({ data }) {
  const name = data?.name || "My fairy queen";
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
          <div className="flex flex-col gap-1">
            <p className="font-medium text-base flex-1 truncate">{name}</p>
            <p className="text-sm text-muted-foreground">by Arb</p>
          </div>
          <Heart
            onClick={() => {
              toast({
                description: "You loved the drawing.",
              });
            }}
            className="cursor-pointer"
            size={18}
          />
        </div>
        <Separator orientation="horizontal" />
        <div className="flex items-center gap-1">
          <p className="text-sm text-muted-foreground">120 likes</p>
          <Dot size={15} />
          <p className="text-sm text-muted-foreground">2 days ago</p>
        </div>
      </CardContent>
    </Card>
  );
}
