import {
  FaDumbbell,
  FaShapes,
  FaNoteSticky,
  FaBell,
  FaGear,
  FaPowerOff,
} from "react-icons/fa6";
import { MdDashboard, MdMenu } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";
import ActiveWorkoutImg from "../assets/biceps.png";
import DefaultWorkoutImg from "../assets/biceps-1.png";
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
    image: DefaultWorkoutImg,
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
  const [logout] = useLogoutMutation(); // Call the hook in the component body

  const [showNotifications, setShowNotifications] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout().unwrap(); // Trigger the query and wait for the result
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
        <div className="flex dashboard-menu-div px-2">
          {/* wrap with link to dashboard home */}
          <FaDumbbell className="md:size-8 size-5 text-red-secondary rotate-90" />
          <h1 className="font-secondary sm:text-3xl text-xl font-medium">
            HomeFit
          </h1>
        </div>

        {/* full screen menu items */}
        <div className="hidden md:flex dashboard-menu-div px-2">
          <ul className="flex flex-row gap-2 font-medium ">
            {mainMenuItems.map(({ text, route, icon: Icon, image }) => (
              <NavLink
                end
                key={text}
                to={route}
                className={({ isActive }) =>
                  `dashboard-menu-item ${
                    isActive
                      ? "text-white bg-red-secondary"
                      : "text-black bg-gray-200"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {Icon ? (
                      <Icon />
                    ) : image ? (
                      <img
                        src={isActive ? ActiveWorkoutImg : image}
                        alt={`${text} icon`}
                        className="size-4"
                      />
                    ) : null}{" "}
                    {text}
                  </>
                )}
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
                  <img src={image} alt={`${text} icon`} className="size-5" />
                ) : null}
                {text}
              </NavLink>
            ))}

            <li
              className={"flex gap-2 text-black list-none"}
              onClick={() => {
                setMobileMenuOpen(false);
                setShowNotifications(!showNotifications);
              }}
            >
              <FaBell className="text-xl" /> Notifications
            </li>
          </div>
        )}

        <div className="flex flex-row gap-2">
          <div className="flex dashboard-menu-div px-2">
            <ul className="flex flex-row gap-2">
              <li
                className={`hidden md:flex justify-center items-center gap-1 rounded-md p-2 w-9 ${
                  showNotifications
                    ? "text-white bg-black"
                    : "text-black bg-gray-200"
                }`}
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <FaBell className="text-xl" />
              </li>
              <NavLink to="/" className="dashboard-menu-item w-9 bg-gray-200">
                <AiFillHome className="text-2xl" />
              </NavLink>
            </ul>
          </div>

          <button
            className="md:hidden px-3 dashboard-menu-div "
            onClick={() => setMobileMenuOpen(true)}
          >
            <MdMenu className="text-2xl" />
          </button>

          <div
            className="flex dashboard-menu-div px-3"
            onClick={() => setShowDropDown(!showDropDown)}
          >
            <FaUser className="text-2xl" />
          </div>
          {showDropDown && (
            <div className="absolute right-5 top-18 w-28 p-3 bg-white shadow-xl rounded-lg z-40">
              <ul className="flex flex-col justify-center  gap-1">
                {/* <li className="flex flex-row items-center gap-2 capitalize">
                  <LuUserCog className="inline text-xl" />{" "}
                  {user?.first_name || "John"}
                </li> */}
                <NavLink
                  to="/dashboard/settings"
                  onClick={() => setShowDropDown(!showDropDown)}
                  className="flex flex-row items-center gap-2 capitalize"
                >
                  <LuUserCog className="inline text-xl" />{" "}
                  {user?.first_name || "John"}
                </NavLink>
                <hr className="w-full text-gray-200" />
                <li className="flex flex-row items-center gap-2 hover:cursor-pointer">
                  <button onClick={handleLogout}>
                    {" "}
                    <FaPowerOff className="inline" /> Logout{" "}
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
