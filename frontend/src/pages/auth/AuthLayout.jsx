import { Outlet, Link, useLocation } from "react-router-dom";
import { FaDumbbell } from "react-icons/fa6";
import SidePanel from "./components/SidePanel";

const AuthLayout = () => {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/auth" || location.pathname === "/auth/register";

  return (
    <div className="h-dvh flex">
      <div className="h-full lg:w-1/2 w-full flex flex-col">
        <div className="flex items-center lg:p-3 p-1">
          {isAuthPage ? (
            <Link
              to="/"
              className="flex justify-center items-center lg:mb-8 mb-5"
            >
              <FaDumbbell className="sm:size-8 size-7 text-red-secondary rotate-90" />
              <p className="sm:text-4xl text-3xl font-secondary">Homefit</p>
            </Link>
          ) : (
            <>
              <FaDumbbell className="sm:size-8 size-7 text-red-secondary rotate-90" />
              <p className="sm:text-4xl text-3xl font-secondary">Homefit</p>
            </>
          )}
        </div>

        <Outlet />
      </div>

      <SidePanel />
    </div>
  );
};

export default AuthLayout;
