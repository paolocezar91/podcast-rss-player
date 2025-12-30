export default function Skeleton({
  className = "h-2.5 w-48",
}: {
  className: string;
}) {
  return (
    <div role="status" className="max-w-full animate-pulse">
      <div className={`bg-gray-300/50 rounded-full mb-4 ${className}`}></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
