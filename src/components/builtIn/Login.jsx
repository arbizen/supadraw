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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import SubmitButton from "./SubmitButton";

const schema = z.object({
  email: z
    .string()
    .nonempty("Please type your valid email.")
    .email({ message: "Please type a valid email." }),
  password: z.string().nonempty("Please type your password."),
});

export function Login() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [isLoading, setIsloading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [info, setInfo] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleSignup = async ({ email, password }) => {
    setIsloading(true);
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) {
      setErrorMessage(error?.message);
      setIsloading(false);
      return;
    }
    setInfo("Please check your email to confirm.");
    setIsloading(false);
    console.log(data, error);
  };

  const handleLogin = async ({ email, password }) => {
    setIsloading(true);
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log(data, error?.message);
    if (error && error.status === 400) {
      setErrorMessage(error?.message);
      setIsloading(false);
      return;
    }
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

  const onSubmit = async (value) => {
    if (isLogin) {
      handleLogin(value);
    } else {
      handleSignup(value);
    }
  };

  const clearMessages = () => {
    setErrorMessage("");
    setInfo("");
  };

  return (
    <div className="space-y-4 py-6">
      <div>
        <CardTitle className="text-2xl">
          {isLogin ? "Login" : "Register"} to draw
        </CardTitle>
        <CardDescription>
          Enter your email below to {isLogin ? "login" : "register"}
        </CardDescription>
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
        {info && <p className="text-sm text-green-500">{info}</p>}
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="m@example.com"
            {...register("email")}
          />
        </div>
        {errors?.email?.message && (
          <p className="text-sm text-red-500">{errors?.email?.message}</p>
        )}
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            {...register("password")}
          />
        </div>
        {errors?.password?.message && (
          <p className="text-sm text-red-500">{errors?.password?.message}</p>
        )}
        <SubmitButton isLoading={isLoading} isLogin={isLogin} />
      </form>
      <div className="py-2">
        <Card className="p-4 flex gap-2 items-center">
          <Info size={15} className="text-card-foreground" />
          <div className="text-sm text-card-foreground">
            {isLogin ? (
              <p>
                Don't have an account?{" "}
                <span
                  onClick={() => {
                    setIsLogin(false);
                    clearMessages();
                  }}
                  className="underline cursor-pointer"
                >
                  Click here to register.
                </span>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <span
                  onClick={() => {
                    setIsLogin(true);
                    clearMessages();
                  }}
                  className="underline cursor-pointer"
                >
                  Click here to login.
                </span>
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
