import Image from "next/image";

import { GridPattern } from "@/components/ui/grid-pattern";
import { Navbar1 } from "@/components/ui/navbar-1";

export default function Home() {
  return (
    <div className="relative flex flex-col flex-1 items-center bg-white font-sans">
      <GridPattern
        width={56}
        height={56}
        className="mask-[radial-gradient(ellipse_at_center,black_60%,transparent_95%)]"
      />
      <Navbar1 />
      <main className="relative flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">

      </main>
    </div>
  );
}
