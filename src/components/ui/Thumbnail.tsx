import { twMerge as cn } from "tailwind-merge";

export default function Thumbnail({
  image,
  alt,
  className = "w-24 h-24",
}: {
  image?: string;
  alt: string;
  className?: string;
}) {
  return (
    <img
      src={image ?? "https://placehold.co/48"}
      alt={alt}
      className={cn("rounded-lg shadow-lg", className)}
    />
  );
}
