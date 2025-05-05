import {
  FaDumbbell,
  FaShapes,
  FaNoteSticky,
  FaGear,
  FaPowerOff,
} from "react-icons/fa6";
import { MdDashboard, MdMenu } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import WorkoutImg from "../assets/biceps.png";
import BlackWorkoutImg from "../assets/biceps-1.png";
import { LuUserCog } from "react-icons/lu";
import { FaUser } from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  useLogoutMutation,
  useGetProfileQuery,
} from "../features/users/usersApi";
import LoadingPage from "./LoadingPage";

const mainMenuItems = [
  {
    text: "Dashboard",
    route: "/dashboard",
    icon: MdDashboard,
  },
  {
    text: "Workouts",
    route: "workouts",
    image: WorkoutImg,
  },
  {
    text: "Sets",
    route: "sets",
    icon: FaShapes,
  },
  {
    text: "Logs",
    route: "logs",
    icon: FaNoteSticky,
  },
  {
    text: "Settings",
    route: "settings",
    icon: FaGear,
  },
];

const DashboardNavbar = () => {
  const { data, error, isLoading } = useGetProfileQuery();
  const user = data?.user;

  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const [showDropDown, setShowDropDown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
      navigate("/");
    }
  };

  if (isLoading) return <LoadingPage />;
  if (error) {
    console.error("Profile fetch error:", error);
    return <div>Error loading profile.</div>;
  }

  return (
    <header className="w-full">
      <nav className="max-w-full w-full flex items-center justify-between">
        <div className="flex dashboard-menu-div bg-gray-200 px-2 py-1">
          <FaDumbbell className="md:size-7 size-6 text-red-secondary rotate-90" />
          <h1 className="font-secondary text-2xl font-medium">HomeFit</h1>
        </div>

        {/* full screen menu items */}
        <div className="hidden md:flex text-white dashboard-menu-div px-2">
          <ul className="flex flex-row gap-2 font-medium ">
            {mainMenuItems.map(({ text, route, icon: Icon, image }) => (
              <NavLink
                end
                key={text}
                to={route}
                className={({ isActive }) =>
                  `dashboard-menu-item ${
                    isActive ? " bg-red-secondary" : "text-white bg-black"
                  }`
                }
              >
                {Icon ? (
                  <Icon />
                ) : image ? (
                  <img
                    src={WorkoutImg}
                    alt={`${text} icon`}
                    className="size-4"
                  />
                ) : null}{" "}
                {text}
              </NavLink>
            ))}
          </ul>
        </div>

        {/* Mobile Hamburger Menu Items */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-white z-50 flex flex-col items-start p-6 gap-6 shadow-lg">
            <button
              className="self-end mb-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              <IoClose className="text-2xl" />
            </button>

            {mainMenuItems.map(({ text, route, icon: Icon, image }) => (
              <NavLink
                key={text}
                to={route}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-lg text-black"
              >
                {Icon ? (
                  <Icon />
                ) : image ? (
                  <img
                    src={BlackWorkoutImg}
                    alt={`${text} icon`}
                    className="size-5"
                  />
                ) : null}
                {text}
              </NavLink>
            ))}
          </div>
        )}

        <div className="flex flex-row gap-2">
          <button
            className="md:hidden px-2 dashboard-menu-div "
            onClick={() => setMobileMenuOpen(true)}
          >
            <MdMenu className="text-2xl" />
          </button>

          <div
            className="flex dashboard-menu-div h-10 px-2"
            onClick={() => setShowDropDown(!showDropDown)}
          >
            <FaUser className="text-2xl" />
          </div>

          {showDropDown && (
            <div className="absolute right-4 top-14 w-28 p-3 bg-gray-200 shadow-xl rounded-sm z-40">
              <ul className="flex flex-col justify-center  gap-1">
                <NavLink
                  to="/dashboard/settings"
                  onClick={() => setShowDropDown(!showDropDown)}
                  className="flex flex-row items-center gap-2 capitalize hover:cursor-pointer hover:text-red-secondary"
                >
                  <LuUserCog className="inline text-xl" />{" "}
                  {user?.first_name || "John"}
                </NavLink>
                <hr className="w-full text-black" />
                <li className="flex flex-row items-center gap-2 hover:cursor-pointer hover:text-red-secondary">
                  <button onClick={handleLogout}>
                    {" "}
                    <FaPowerOff className="inline text-base" /> Logout{" "}
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default DashboardNavbar;
