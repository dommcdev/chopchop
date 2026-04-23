export default function ResponsiveGrid({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
      {children}
    </div>
  );
}
