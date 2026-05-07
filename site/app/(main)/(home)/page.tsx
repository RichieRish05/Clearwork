import { Blog } from "@/app/(main)/(home)/sections/blog";
import { Guide } from "@/app/(main)/(home)/sections/guide";
import { Hero } from "@/app/(main)/(home)/sections/hero";
import { Navbar1 } from "@/components/ui/navbar-1";
import { Pricing } from "@/app/(main)/(home)/sections/pricing";
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
        <Pricing />
        <Blog />
        <Guide />
      </main>
    </div>
  );
}
