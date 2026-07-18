export function Flag({ label }: { label: string }) {
  return (
    <span className="inline-block w-full sm:w-auto text-center px-6 py-4 bg-muted border border-border rounded-md">
      {label}
    </span>
  );
}
