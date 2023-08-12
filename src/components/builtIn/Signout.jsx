"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Signout({ className }) {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [isLoading, setIsloading] = useState(false);
  const signout = async () => {
    setIsloading(true);
    await supabase.auth.signOut();
    router.push("/login");
  };
  return (
    <div className="py-6">
      <Button
        disabled={isLoading}
        onClick={signout}
        className={cn("flex gap-2", className)}
      >
        {isLoading ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Singing out...
          </>
        ) : (
          "Signout"
        )}
      </Button>
    </div>
  );
}
