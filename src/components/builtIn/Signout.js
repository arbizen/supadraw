"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function Signout() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [isLoading, setIsloading] = useState(false);
  const signout = async () => {
    setIsloading(true);
    await supabase.auth.signOut();
    router.refresh();
  };
  return (
    <div className="py-6">
      <Button onClick={signout} className="flex gap-2">
        {isLoading && <Loader2 size={18} className="animate-spin" />}
        Signout
      </Button>
    </div>
  );
}
