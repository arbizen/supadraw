import Drawing from "@/components/builtIn/Drawing";
import SharedDrawing from "@/components/builtIn/SharedDrawing";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default async function DiscoverPage() {
  const wait = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });
  return (
    <div className="p-4">
      <div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="most-recent">Most recent</SelectItem>
            <SelectItem value="popular">Popular</SelectItem>
            <SelectItem value="old">Old</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="my-6">
        <div className="flex flex-col items-center md:grid md:grid-cols-3 gap-4">
          <SharedDrawing />
          <SharedDrawing />
          <SharedDrawing />
          <SharedDrawing />
          <SharedDrawing />
          <SharedDrawing />
        </div>
      </div>
    </div>
  );
}
