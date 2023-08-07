import Dratfs from "@/components/builtIn/Drafts";
import Published from "@/components/builtIn/Published";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pen, Upload } from "lucide-react";
import Link from "next/link";

export default async function DrawingPage() {
  const wait = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });
  return (
    <div className="p-4">
      <div className="flex gap-4">
        <Link
          href="/pad/new"
          className="inline-flex gap-2 h-10 w-auto px-4 md:h-16 md:w-60 cursor-pointer justify-center items-center md:font-medium text-sm text-accent-foreground border rounded-md hover:bg-accent hover:text-accent-foreground"
        >
          <Pen size={15} />
          New drawing
        </Link>
        <div className="inline-flex gap-2 h-10 w-auto px-4 md:h-16 md:w-60 cursor-pointer justify-center items-center md:font-medium text-sm text-accent-foreground border rounded-md hover:bg-accent hover:text-accent-foreground">
          <Upload size={15} />
          Upload drawing
        </div>
      </div>
      <div className="my-6">
        <Tabs defaultValue="drafts">
          <TabsList className="flex items-center justify-start w-full">
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
          </TabsList>
          <TabsContent value="drafts">
            <Dratfs />
          </TabsContent>
          <TabsContent value="published">
            <Published />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
