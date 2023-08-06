import Drawing from "./Drawing";

export default function Published() {
  return (
    <div className="p-4 flex flex-col items-center md:grid md:grid-cols-3 gap-4">
      <Drawing data={{ name: "Fairy sketch", isPublished: true }} />
      <Drawing data={{ name: "Fairy sketch", isPublished: true }} />
      <Drawing data={{ name: "Fairy sketch", isPublished: true }} />
      <Drawing data={{ name: "Fairy sketch", isPublished: true }} />
      <Drawing data={{ name: "Fairy sketch", isPublished: true }} />
    </div>
  );
}
