import { logout } from "@/app/(main)/auth/logout/actions";

export function LogoutButton() {
  return (
    <section className="overflow-hidden rounded-xl border border-neutral-200/80 bg-white">
      <div className="flex items-center justify-between gap-4 px-5 py-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs text-neutral-500">Sign out</p>
          <p className="mt-0.5 text-sm font-medium text-neutral-900">
            Sign out of this device
          </p>
        </div>
        <form action={logout} className="shrink-0">
          <button
            type="submit"
            className="text-sm font-medium text-red-600 hover:text-red-700"
          >
            Sign out
          </button>
        </form>
      </div>
    </section>
  );
}
