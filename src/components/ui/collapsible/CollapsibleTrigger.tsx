import { ChevronRight } from "lucide-react";
import React from "react";
import { useCollapsible } from "./Collapsible";
import { twMerge as cn } from "tailwind-merge";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const CollapsibleTrigger = React.forwardRef<HTMLButtonElement, Props>(
  ({ children, ...props }, ref) => {
    const { open, setOpen } = useCollapsible();

    return (
      <button
        ref={ref}
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        {...props}
        className="flex gap-1 items-center flex justify-center"
      >
        <span>{children}</span>
        <ChevronRight
          className={cn("w-4 h-4 transition-all", open ? "rotate-90" : "")}
        />
      </button>
    );
  }
);

CollapsibleTrigger.displayName = "CollapsibleTrigger";

export default CollapsibleTrigger;
