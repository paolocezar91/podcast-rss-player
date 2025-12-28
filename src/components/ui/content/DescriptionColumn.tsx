import { useDebounce } from "@/hooks/use-debounces";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

// Description Column Component
export default function DescriptionColumn({
  children,
}: {
  children: React.ReactElement;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const debouncedCollapsed = useDebounce(collapsed);

  return (
    <>
      <div
        className={`
          h-full gap-2 bg-gray-100 transition-[width] ease-in-out
          ${collapsed ? "w-0 opacity-0" : "w-1/4 p-2 opacity-100 flex flex-col"}
        `}
      >
        {!debouncedCollapsed && children}
      </div>
      <CollapseToggle
        isCollapsed={collapsed}
        onToggle={() => setCollapsed((prev) => !prev)}
      />
    </>
  );
}

// Collapse Toggle Button Component
export const CollapseToggle = ({
  isCollapsed,
  onToggle,
}: {
  isCollapsed: boolean;
  onToggle: () => void;
}) => {
  return (
    <button
      onClick={onToggle}
      className="absolute transform z-10 bottom-8 -left-4
                 bg-gray-200 hover:bg-gray-300 p-2 rounded-full shadow-md 
                 transition-colors duration-200"
      aria-label={isCollapsed ? "Expand description" : "Collapse description"}
    >
      {isCollapsed ? (
        <ChevronRight className="w-4 h-4 text-gray-700" />
      ) : (
        <ChevronLeft className="w-4 h-4 text-gray-700" />
      )}
    </button>
  );
};
