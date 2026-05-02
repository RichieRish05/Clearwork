import Image from "next/image";
import { confirmReset } from "./actions";

type SearchParams = Promise<{
  code?: string;
}>;

export default async function ConfirmPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const code = params.code ?? "";

  const hasCode = Boolean(code);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-16">
      <div className="relative z-10 w-full max-w-md">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/Logo.png"
            alt="Logo"
            width={44}
            height={44}
            className="mb-6"
          />
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-neutral-500">
            Office of Admissions
          </span>
          <h1 className="mt-4 font-serif text-[clamp(2.25rem,6vw,3.25rem)] leading-[1.02] tracking-tight text-neutral-950">
            Confirm{" "}
            <span className="italic font-normal" style={{ color: "#8c1515" }}>
              reset
            </span>
            .
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-700">
            {hasCode
              ? "Click the button below to continue setting a new password."
              : "This link is missing required information. Request a new reset email."}
          </p>
        </div>

        {hasCode ? (
          <form
            action={confirmReset}
            className="mt-10 rounded-3xl border border-black bg-white p-7 shadow-[0_4px_0_0_rgba(0,0,0,1)]"
          >
            <input type="hidden" name="code" value={code} />
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full border border-black bg-black px-5 py-3 text-sm font-medium text-white shadow-[0_4px_0_0_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5"
            >
              Continue
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
}
