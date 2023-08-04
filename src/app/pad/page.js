import Signout from "@/components/builtIn/Signout";

export default function Pad() {
  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <h1 className="font-extrabold text-5xl">Start drawing now!</h1>
      <Signout />
    </div>
  );
}
