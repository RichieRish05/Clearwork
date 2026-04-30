import { Blog } from "@/app/(main)/(home)/sections/blog";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Guide } from "@/app/(main)/(home)/sections/guide";
import { Hero } from "@/app/(main)/(home)/sections/hero";
import { Navbar1 } from "@/components/ui/navbar-1";
import { Pricing } from "@/app/(main)/(home)/sections/pricing";

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
        <Pricing />
        <Blog />
        <Guide />
      </main>
    </div>
  );
}
