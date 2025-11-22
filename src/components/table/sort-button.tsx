import React from "react";
import { SortingDir } from "./sorting";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

export default function SortButton<T>({
  children,
  attr,
  disabled,
  sorting,
  onClick,
}: {
  children: React.ReactNode;
  attr: string;
  sorting: SortingDir<T>[];
  disabled?: boolean;
  onClick: () => void;
}) {
  const sortEntry = sorting.find((s) => s.key === attr);
  let icon: React.ReactNode;
  if (!sortEntry) {
    icon = <ArrowUpDown size={16} />;
  }
  if (sortEntry?.dir === "+") {
    icon = <ArrowUp size={16} />;
  }
  if (sortEntry?.dir === "-") {
    icon = <ArrowDown size={16} />;
  }

  return (
    <button
      disabled={disabled}
      className={`
          flex 
          items-start
          px-1
          py-1
          cursor-pointer
          rounded
          transition-colors
          ${
            sortEntry
              ? "bg-white hover:bg-white/80 text-black"
              : "bg-black hover:bg-white/20 text-white"
          }
        `}
      onClick={onClick}
    >
      <span className="mr-1">{children}</span>
      {icon}
    </button>
  );
}
