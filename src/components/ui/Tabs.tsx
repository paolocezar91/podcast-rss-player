import React, { createContext, useContext, useState } from "react";
import { twMerge as cn } from "tailwind-merge";

// Type definitions
interface TabsContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

interface TabsRootProps {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

// Context
const TabsContext = createContext<TabsContextType | undefined>(undefined);

// Hook for using tabs context
const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within Tabs.Root");
  }
  return context;
};

// Root component
const TabsRoot = ({
  defaultValue,
  children,
  className = "",
}: TabsRootProps) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div
        className={cn(
          "flex w-full h-full w-min-52 bg-white rounded-lg border border-gray-200",
          className
        )}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
};

// List component
const TabsList = ({ children, className = "", ariaLabel }: TabsListProps) => {
  return (
    <div
      className={cn(
        "max-w-34 bg-gray-50 border-r border-gray-200 h-full",
        className
      )}
      role="tablist"
      aria-label={ariaLabel}
    >
      <div className="space-y-2">{children}</div>
    </div>
  );
};

// Trigger component
const TabsTrigger = ({ value, children, className = "" }: TabsTriggerProps) => {
  const { activeTab, setActiveTab } = useTabs();

  return (
    <button
      role="tab"
      aria-selected={activeTab === value}
      aria-controls={`tab-content-${value}`}
      onClick={() => setActiveTab(value)}
      className={cn(
        "text-left rounded-lg transition-colors duration-200",
        activeTab === value
          ? "bg-blue-500 text-white shadow-md"
          : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 opacity-70",
        className
      )}
    >
      {children}
    </button>
  );
};

// Content component (virtualized - only renders when active)
const TabsContent = ({ value, children, className = "" }: TabsContentProps) => {
  const { activeTab } = useTabs();

  // Virtualization: only render if this is the active tab
  if (activeTab !== value) {
    return null;
  }

  return (
    <div
      role="tabpanel"
      id={`tab-content-${value}`}
      aria-labelledby={`tab-trigger-${value}`}
      className={cn("w-full h-full", className)}
    >
      <div className="h-full">{children}</div>
    </div>
  );
};

// Compound component
export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
};
