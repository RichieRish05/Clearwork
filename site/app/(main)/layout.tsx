import { GridPattern } from "@/components/ui/grid-pattern";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-1 flex-col bg-white font-sans overflow-hidden">
      <GridPattern
        width={56}
        height={56}
        className="stroke-gray-300/40 fill-transparent mask-[radial-gradient(ellipse_at_center,black_40%,transparent_95%)]"
      />
      {children}
    </div>
  );
}
