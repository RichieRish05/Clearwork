import { Hero } from "@/app/(main)/(home)/sections/hero";
import { Wedge } from "@/app/(main)/(home)/sections/wedge";
import { Workflow } from "@/app/(main)/(home)/sections/workflow";
import { Pricing } from "@/app/(main)/(home)/sections/pricing";
import { Navbar1 } from "@/components/ui/navbar-1";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col flex-1 items-center">
      <Navbar1 user={user} />
      <main className="relative w-full flex flex-1 flex-col">
        <Hero />
        <Wedge />
        <Workflow />
        <Pricing />
      </main>
    </div>
  );
}
