import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <h1 className="mt-6 scroll-m-20 text-4xl font-extrabold leading-7 tracking-tight">
        Draw like an artist.
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Feature-riched drawing pad, stunning colors, blazing fast brushes.
        Sketch your dream and share with millions.
      </p>
      <div className="py-6">
        <Button>Start drawing</Button>
      </div>
    </>
  );
}
