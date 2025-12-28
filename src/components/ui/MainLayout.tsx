import { JSX } from "react";

const MainLayout = ({ children }: { children: JSX.Element }) => {
  return <div className="w-full h-[calc(100vh-65px)]">{children}</div>;
};

export default MainLayout;
