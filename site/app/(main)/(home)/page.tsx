import { GridPattern } from "@/components/ui/grid-pattern";
import { Hero } from "@/components/ui/hero";
import { Navbar1 } from "@/components/ui/navbar-1";

export default function Home() {
  return (
    <div className="relative flex flex-col flex-1 items-center bg-white font-sans overflow-hidden">
      <GridPattern
        width={56}
        height={56}
        className="stroke-gray-300/40 fill-transparent mask-[radial-gradient(ellipse_at_center,black_30%,transparent_95%)]"
      />
      <Navbar1 />
      <main className="relative w-full flex flex-1 flex-col">
        <Hero />
      </main>
    </div>
  );
}
