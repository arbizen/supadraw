import Sidebar from "@/components/builtIn/Sidebar";
import { Button } from "@/components/ui/button";
import { Moon } from "lucide-react";

export default function PadLayout({ children }) {
  return (
    <div className="flex h-screen">
      <aside className="hidden md:block md:w-[264px] border-r">
        <Sidebar />
      </aside>
      <div className="flex-1 flex flex-col">
        <div className="min-h-[48px] border-b p-4 flex items-center">
          <p className="font-bold">Drawings</p>
          <div className="flex-1 flex justify-end items-center">
            <Button size="sm" variant="outline">
              <Moon size={20} />
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-y-scroll">{children}</div>
      </div>
    </div>
  );
}
