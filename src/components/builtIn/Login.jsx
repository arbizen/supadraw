"use client";

import { Icons } from "@/components/builtIn/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Info, Loader2Icon } from "lucide-react";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [isLoading, setIsloading] = useState(false);

  const handleSignup = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  const handleLogin = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.push("/app/drawings");
  };

  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  const handleGithubSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-6">
      <div>
        <CardTitle className="text-2xl">Login to draw</CardTitle>
        <CardDescription>Enter your email below to login</CardDescription>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <Button onClick={handleGithubSignIn} variant="outline">
          <Icons.gitHub className="mr-2 h-4 w-4" />
          Github
        </Button>
        <Button onClick={handleGoogleSignIn} variant="outline">
          <Icons.google className="mr-2 h-4 w-4" />
          Google
        </Button>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          type="email"
          name="email"
          placeholder="m@example.com"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          onChange={(e) => setPass(e.target.value)}
          id="password"
          name="password"
          type="password"
        />
      </div>
      <Button
        onClick={() => {
          setIsloading(true);
        }}
        className="w-full flex gap-2"
      >
        {isLoading && <Loader2Icon size={18} className="animate-spin" />}
        Login
      </Button>
      <div className="py-2">
        <Card className="p-4 flex gap-2 items-center">
          <Info size={15} className="text-card-foreground" />
          <p className="text-sm text-card-foreground">
            An account will be created if you haven't yet.
          </p>
        </Card>
      </div>
    </form>
  );
}
