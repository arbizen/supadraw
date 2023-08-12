import { Loader2Icon } from "lucide-react";
import { Button } from "../ui/button";

export default function SubmitButton({ isLogin, isLoading }) {
  if (isLogin) {
    return (
      <Button disabled={isLoading} type="submit" className="w-full flex gap-2">
        {isLoading ? (
          <>
            <Loader2Icon size={18} className="animate-spin" /> Logging...
          </>
        ) : (
          "Login"
        )}
      </Button>
    );
  }
  return (
    <Button disabled={isLoading} type="submit" className="w-full flex gap-2">
      {isLoading ? (
        <>
          <Loader2Icon size={18} className="animate-spin" /> Registering...
        </>
      ) : (
        "Register"
      )}
    </Button>
  );
}
