import Sidebar from "@/components/builtIn/Sidebar";

export default function PadLayout({ children }) {
  return (
    <div className="flex h-screen">
      <aside className="md:w-[264px] border-r">
        <Sidebar />
      </aside>
      <div className="flex-1 flex flex-col">
        <div className="min-h-[48px] border-b p-4 font-bold">Drawings</div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
