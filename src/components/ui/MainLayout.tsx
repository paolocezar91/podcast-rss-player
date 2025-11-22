import { JSX } from "react";

const MainLayout = ({ children }: { children: JSX.Element }) => {
  return <div className="w-full h-screen">{children}</div>;
};

export default MainLayout;
