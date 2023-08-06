import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function DrawingsLoading() {
  const totalDrawings = 5;
  return (
    <div className="p-4">
      <div className="grid grid-cols-2 md:flex gap-4">
        <Skeleton className="h-10 md:h-16 md:w-60 rounded-md" />
        <Skeleton className="h-10 md:h-16 md:w-60 rounded-md" />
      </div>
      <div className="my-6">
        <Skeleton className="h-5 w-full md:h-5 md:w-full rounded-lg" />
      </div>
      <div className="p-4 flex flex-col items-center md:grid md:grid-cols-3 gap-4">
        {Array.from({ length: totalDrawings }).map((_, i) => (
          <Card key={i} className="w-full md:max-w-[280px]">
            <CardContent className="space-y-3">
              <div className="flex justify-center mt-4">
                <Skeleton className="h-[200px] w-[200px]" />
              </div>
              <Separator orientation="horizontal" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-5 w-full rounded-lg" />
              </div>
              <div className="flex items-center gap-1">
                <Skeleton className="h-5 w-full rounded-lg" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
