import DrawingPad from "@/components/builtIn/DrawingPad";

export default function DrawingPadPage({ params }) {
  return <DrawingPad pageId={params.id} />;
}
