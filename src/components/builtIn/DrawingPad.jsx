"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  Eraser,
  Grab,
  Pencil,
  Save,
  Share2,
  Trash,
} from "lucide-react";
import dynamic from "next/dynamic";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import Link from "next/link";
import { saveAs } from "file-saver";

const Drawer = dynamic(() => import("@/components/builtIn/Drawer"), {
  ssr: false,
});

export default function DrawingPad({ pageId }) {
  const containerRef = useRef(null);
  const router = useRouter();
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });
  // event to control the drawing
  const [event, setEvent] = useState("DRAW");
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(true);
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (containerRef.current) {
      console.log(containerRef.current.offsetHeight);
      setSize({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }
  }, []);

  function handleLoading(value) {
    setLoading(value);
  }

  function handleValid(value) {
    setValid(value);
  }

  const { toast } = useToast();

  return (
    <div
      className={cn(
        "max-w-screen-2xl mx-auto h-screen border-2 relative overflow-hidden",
        event === "GRAB" && "cursor-grab",
        event === "DRAW" && "cursor-crosshair",
        event === "ERASE" && "cursor-pointer"
      )}
      ref={containerRef}
    >
      {loading && (
        <>
          <div className="flex w-full h-full items-center justify-center">
            <h1 className="text-center text-2xl text-blue-500 font-semibold">
              Loading Drawer ....
            </h1>
          </div>
        </>
      )}

      <>
        <div className="flex items-center absolute top-10 z-20 left-1/2 -translate-x-1/2 rounded-md border-2 shadow bg-white md:min-w-[400px]">
          <p className="text-sm font-medium flex-1 pl-5 flex items-center gap-2">
            <button
              onClick={() => {
                router.push("/app/drawings");
                router.refresh();
              }}
              className={cn(
                "p-1 transition-colors hover:bg-gray-200 rounded-md cursor-pointer"
              )}
            >
              <ChevronLeft className="w-5 h-5 text-black" />
            </button>
            untitled1
          </p>
          <div className="flex  w-fit gap-5 pr-5 py-1 ">
            <button
              onClick={() => setEvent("GRAB")}
              className={cn(
                "p-1 transition-colors hover:bg-gray-200 rounded-md cursor-pointer",
                event === "GRAB" && "bg-gray-200"
              )}
            >
              <Grab className="w-5 h-5 text-black" />
            </button>
            <button
              onClick={() => setEvent("DRAW")}
              className={cn(
                "p-1 transition-colors hover:bg-gray-200 rounded-md cursor-pointer",
                event === "DRAW" && "bg-gray-200"
              )}
            >
              <Pencil className="w-5 h-5 text-black" />
            </button>
            <button
              onClick={() => setEvent("ERASE")}
              className={cn(
                "p-1 transition-colors hover:bg-gray-200 rounded-md cursor-pointer",
                event === "ERASE" && "bg-gray-200"
              )}
            >
              <Eraser className="w-5 h-5 text-black" />
            </button>
            <HoverCard>
              <HoverCardTrigger asChild>
                <button
                  className={cn(
                    "p-1 transition-colors hover:bg-gray-200 rounded-md cursor-pointer"
                  )}
                >
                  <Share2 className="w-5 h-5 text-black" />
                </button>
              </HoverCardTrigger>
              <HoverCardContent className="space-y-4">
                <h3 className="text-base font-bold">Share</h3>
                {url ? (
                  <Image
                    src={url}
                    alt="drawing"
                    height={200}
                    width={200}
                    className="h-auto w-auto border rounded-md"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Please draw something first.
                  </p>
                )}
                {url && (
                  <>
                    <Button
                      onClick={() => {
                        toast({
                          description: "Drawing published!",
                        });
                      }}
                    >
                      Publish
                    </Button>
                    <Button
                      onClick={() => {
                        if (url) {
                          saveAs(url, "download.jpg");
                        }
                      }}
                      className="ml-2"
                    >
                      Download
                    </Button>
                  </>
                )}
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </>
      <Drawer
        event={event}
        size={size}
        handleLoading={handleLoading}
        handleValid={handleValid}
        loading={loading}
        valid={valid}
        getPreview={(url) => setUrl(url)}
        pageId={pageId}
      />
    </div>
  );
}
