import Drawing from "./Drawing";

export default function Published({ data }) {
  return (
    <div className="p-4 flex flex-col items-center md:grid md:grid-cols-3 gap-4">
      {data.length === 0 && (
        <p className="text-muted-foreground text-sm w-full">
          Publish a drawing!
        </p>
      )}
      {data.map((drawing) => (
        <Drawing key={drawing.id} data={drawing} />
      ))}
    </div>
  );
}
