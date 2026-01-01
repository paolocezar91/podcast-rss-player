import React from "react";
import { useCollapsible } from "./Collapsible";
import { twMerge as cn } from "tailwind-merge";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

const CollapsibleContent: React.FC<Props> = ({ children, className = "" }) => {
  const { open } = useCollapsible();

  return <div className={cn(className, !open && "hidden")}>{children}</div>;
};

export default CollapsibleContent;
