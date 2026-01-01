import React from "react";
import { useInView } from "react-intersection-observer";
import { twMerge as cn } from "tailwind-merge";

function LazyRow({ children }: { children: React.ReactNode }) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "200px" });
  return <tbody ref={ref}>{inView && children}</tbody>;
}

export default function Table({
  headers,
  children,
  className = "",
}: {
  headers: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <table className={cn("w-full text-xs", className)}>
      <thead>
        <tr className="bg-black sticky top-0 bg-background z-10">{headers}</tr>
      </thead>
      <LazyRow>{children}</LazyRow>
    </table>
  );
}
