"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { Bookmark, MoreVertical, Share, Share2 } from "lucide-react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

export default function Drawing({ data }) {
  return (
    <Card className="w-full md:max-w-[280px]">
      <CardContent className="space-y-3">
        <Link href="#" className="flex justify-center">
          <Image
            src="/images/doll-sketch.jpg"
            alt=""
            height={200}
            width={200}
          />
        </Link>
        <Separator orientation="horizontal" />
        <div className="flex justify-between items-center">
          <p className="font-medium text-base flex-1">Doll sketch</p>
          <Bookmark size={18} className="mr-2" />
          <MoreVertical size={18} />
        </div>
      </CardContent>
    </Card>
  );
}
