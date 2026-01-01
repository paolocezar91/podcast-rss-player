import React, { createContext, useContext, useState } from "react";

interface CollapsibleContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const CollapsibleContext = createContext<CollapsibleContextValue | null>(null);

export const useCollapsible = () => {
  const ctx = useContext(CollapsibleContext);
  if (!ctx) {
    throw new Error("Collapsible components must be used within Collapsible");
  }
  return ctx;
};

interface CollapsibleProps {
  defaultOpen?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const Collapsible: React.FC<CollapsibleProps> = ({
  defaultOpen = false,
  children,
  className,
}) => {
  const [open, setOpen] = useState<boolean>(defaultOpen);

  return (
    <CollapsibleContext.Provider value={{ open, setOpen }}>
      <div className={className}>{children}</div>
    </CollapsibleContext.Provider>
  );
};

export default Collapsible;
