import { Outlet, Link } from "react-router-dom";
import { FaDumbbell } from "react-icons/fa6";
import SidePanel from "./components/SidePanel";

const AuthLayout = () => {
  return (
    <div className="h-dvh flex bg-paper">
      <div className="h-full lg:w-1/2 w-full flex flex-col">
        <div className="flex items-center px-4 sm:px-6 lg:px-8 pt-4 sm:pt-5">
          <Link
            to="/"
            className="inline-flex items-center gap-1 group"
            aria-label="HomeFit home"
          >
            <FaDumbbell className="size-7 sm:size-8 text-brand rotate-90 group-hover:rotate-45 transition-transform duration-300" />
            <span className="font-secondary text-3xl sm:text-4xl tracking-tight">
              HomeFit
            </span>
          </Link>
        </div>

        <Outlet />
      </div>

      <SidePanel />
    </div>
  );
};

export default AuthLayout;
