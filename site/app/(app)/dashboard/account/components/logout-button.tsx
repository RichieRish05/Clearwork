import { Button } from "@/components/ui/button";

import { logout } from "@/app/(main)/auth/logout/actions";

export function LogoutButton() {
  return (
    <form action={logout} className="mt-6 sm:mt-8">
      <Button type="submit" variant="outline" className="h-9 rounded-full px-5">
        Log out
      </Button>
    </form>
  );
}
