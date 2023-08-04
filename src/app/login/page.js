import { Login } from "@/components/builtIn/Login";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const supabase = createServerActionClient({ cookies });
  return (
    <div>
      <Login />
    </div>
  );
}
