import Drawing from "./Drawing";

export default function Dratfs({ data }) {
  return (
    <div className="p-4 flex flex-col items-start md:grid md:grid-cols-3 gap-4">
      {data.length === 0 && (
        <p className="text-muted-foreground text-sm">Start a new drawing!</p>
      )}
      {data.map((drawing) => (
        <Drawing key={drawing.id} data={drawing} />
      ))}
    </div>
  );
}
