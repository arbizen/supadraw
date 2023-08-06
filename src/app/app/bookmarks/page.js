import SharedDrawing from "@/components/builtIn/SharedDrawing";
export default async function BookmarksPage() {
  const wait = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });
  return (
    <div className="p-4">
      <div className="flex flex-col items-center md:grid md:grid-cols-3 gap-4">
        <SharedDrawing />
        <SharedDrawing />
        <SharedDrawing />
        <SharedDrawing />
        <SharedDrawing />
        <SharedDrawing />
      </div>
    </div>
  );
}
