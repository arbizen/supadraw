import Header from "@/components/builtIn/Header";

export default function LoginLayout({ children }) {
  return (
    <div className="h-screen md:bg-[url(https://play.tailwindcss.com/img/grid.svg)] bg-center">
      <div className="max-w-2xl h-full mx-auto py-12 bg-[url(https://play.tailwindcss.com/img/grid.svg) md:bg-white shadow-md px-12">
        <Header />
        {children}
      </div>
    </div>
  );
}