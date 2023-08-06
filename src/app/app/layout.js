import AppHeader from "@/components/builtIn/AppHeader";
import Sidebar from "@/components/builtIn/Sidebar";

export default function PadLayout({ children }) {
  return (
    <div className="flex h-screen">
      <aside className="hidden md:block md:w-[264px] border-r">
        <Sidebar />
      </aside>
      <div className="flex-1 flex flex-col">
        <AppHeader />
        <div className="flex-1 overflow-y-scroll">{children}</div>
      </div>
    </div>
  );
}
