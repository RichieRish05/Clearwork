export function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <label className="block mt-4 first:mt-0">
      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-neutral-600">
        {label}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
        className="mt-2 w-full rounded-xl border border-black bg-white px-4 py-3 text-sm text-neutral-950 placeholder:text-neutral-400 shadow-[inset_0_2px_0_rgba(0,0,0,0.04)] focus:outline-none focus:ring-2 focus:ring-neutral-950/10"
      />
    </label>
  );
}
