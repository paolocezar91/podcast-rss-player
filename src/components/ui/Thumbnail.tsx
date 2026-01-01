import { twMerge as cn } from "tailwind-merge";

export default function Thumbnail({
  image,
  imageIndex = 0,
  alt,
  className = "w-24 h-24",
}: {
  image: string[];
  imageIndex?: number;
  alt: string;
  className?: string;
}) {
  return (
    <img
      src={image[imageIndex]}
      alt={alt}
      className={cn("rounded-lg shadow-lg", className)}
    />
  );
}
