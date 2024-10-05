import { ReactChildrenProps } from "@/interfaces";
import AppBar from "./AppBar";
import SideBar from "./SideBar";

interface Props extends ReactChildrenProps {
  className?: string;
}

const AppLayout = ({ children, className }: Props) => {
  return (
    <div className="bg-[#141414] dark:text-[#F0F0F0] flex min-h-screen gap-5 overflow-hidden">
      <SideBar />

      <div className="flex-1 lg:pr-20 px-5">
        <AppBar />

        <section className={`mt-2 ${className}`}>{children}</section>
      </div>
    </div>
  );
};

export default AppLayout;
